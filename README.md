# parcel-plugin-real-env

It is a really simple plugin.

Install it:
```
yarn add -D @samokat/parcel-plugin-real-env
```

Modify your html files:

```html
<!-- index.html -->

<!-- ... -->
<script src="#/path-to-any-dir/file-name.env.js"></script>
<!-- ... -->
```

After building you will get something like this (no more hashes 😎):

```html
<!-- index.html -->

<!-- ... -->
<script src="/path-to-any-dir/file-name.env.js"></script>
<!-- ... -->
```

That's all. 

## Why?

Our apps must follow 12 factors, and we inject file with current environment at start application's docker container. This file absent in build-time, the plugin provides way to ignore `*.env.js` files.

## And what?

Common `*.env.js` look like this:

```js
window._env_ = {
  API_URL: "https://some-service-api.samokat.io",
}
```

We don't recommend use this **global** variable directly, because  in development-mode, we have no `*.env.js` files and noone can create this variable. We wrote a simple wrapper for resolve this issue — [abstract-env](https://github.com/samokat-oss/abstract-env), just try it.

Please, pay attention. Your code must loaded strictly **after** `*.env.js` file.

You can use synchronous loading:
```html
<!-- index.html -->

<!-- ... -->
<script src="#/path-to-any-dir/file-name.env.js"></script>
<script src="./app.js"></script>
<!-- ... -->
```

Or, asynchronous loading:
```html
<!-- index.html -->

<!-- ... -->
<script defer src="#/path-to-any-dir/file-name.env.js"></script>
<script defer src="./app.js"></script>
<!-- ... -->
```

Be carefully, if you add **async** attribute, scripts can be executed in other order. Use **defer** and everything will be OK.

## Limitations

This is a really specific library. It transforms only **script** tags in `.html` files, which **src** ends `.env.js.` and starts with hash (`#`). If you want more flexible solution, try [parcel-plugin-html-root-syntax](https://github.com/Joe-Withey/parcel-plugin-html-root-syntax).

## Special thanks

Source code of this plugin based on [parcel-plugin-html-root-syntax](https://github.com/Joe-Withey/parcel-plugin-html-root-syntax). We just adapted code for our narrow specificity. Thanks, folks!
