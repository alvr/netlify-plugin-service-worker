# Netlify Service Worker Plugin

![npm](https://badgen.net/npm/v/netlify-plugin-service-worker)

## Usage

### Install

Because the plugin is not available in the Netlify plugin repository, to use this plugin is necessary to execute one of these commands and commit the `package.json`:

```bash
npm install netlify-plugin-service-worker
```

or

```bash
yarn add netlify-plugin-service-worker
```

### Add the plugin to `netlify.toml`

After executing one of the commands above, now you need to add the plugin to the `netlify.toml` configuration file:

```toml
[[plugins]]
  package = "netlify-plugin-service-worker"
```

Note: The `[[plugins]]` line is required for each plugin, even if you have other plugins in your `netlify.toml` file already.

### Configuration

The destination of the service worker file will be the publish directory specified in the Netlify project dashboard. So if your publish dir is `public` and the value of `sw` is `sw.js`, then the output file will be located at `public/sw.js`.

The default configuration is:

```toml
[[plugins]]
  package = "netlify-plugin-service-worker"

  [plugins.inputs]
  sw = "sw.js"
  patterns = ["**/*.{js,css,html}"]
  fallback = "/404.html"
  ignores = ["**/index.xml", "**/index.json", "**/sitemap.xml"]
  mode = "production"
  caching = [
      { urlPattern = '"/\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/"', handler = "CacheFirst" },
      { urlPattern = '"/\.(?:json|xml)$/"', handler = "NetworkOnly" }
  ]
```

### Register service worker

Now we need to register the service worker in HTML at the bottom of the body tag. Replace `sw.js` with the value used in the configuration.

```html
<script>
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => {
          console.error("Could not register service worker", err);
        });
    });
  }
</script>
```
