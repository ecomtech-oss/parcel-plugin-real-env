const fs = require('fs');
const cheerio = require('cheerio');

const TAG = 'script';
const ATTRIBUTE = 'src';

function replaceRootSyntaxWithAbsolutePath(bundle) {
  if (bundle.type === 'html') {
    const filePath = bundle.name;
    const content = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(content);

    let shouldUpdate = false;

    $(TAG).each((_, element) => {
      const $element = $(element);
      const prop = $element.attr(ATTRIBUTE);

      if (prop && prop.startsWith('#') && prop.endsWith('.env.js')) {
        $element.attr(ATTRIBUTE, prop.replace(/^#/, ''));
        shouldUpdate = true;
      }
    });

    if (shouldUpdate) {
      fs.writeFileSync(filePath, $.html());
    }
  }
}

const forEachBundle = (bundle, callback) => {
  callback(bundle);

  if (bundle.childBundles && bundle.childBundles.size) {
    for (const childBundle of bundle.childBundles) {
      callback(childBundle);
    }
  }
};

module.exports = function(bundler) {
  bundler.on('bundled', bundle => {
    forEachBundle(bundle, replaceRootSyntaxWithAbsolutePath);
  });
};
