# Page Performance Monitor

Monitor the performance of page load/render.  For now you will need to implement your own backend. I am still working on a backend for this this.

## Local Usage

Checkout and installation:

1. `git checkout git@github.com:byrichardpowell/page-performance-monitor.git`
2. cd `page-performance-monitor`
3. `npm install`

Developing:

1. `npm run watch`
2. Open a browser at `http://localhost:4000/watch/index.html`
3. Edit the files in the src folder.

## Production usage

Building:

1. `npm run build`
2. The built JS can be found at `build/bundle.js`
3. You can load the file in browser by running `npm run build && npm run watch` then opening a browser to `http://localhost:4000/build/index.html`

You should then include the JavaScript inside the `<head>`, along with some configuration:

````
<script>
  PagePerf = {
    endpoint: '[1]'
  };
</script>
<script src="[2]"></script>
````

* [1]: The endpoint for your own custom monitoring solution.
* [2]: The location of `build/bundle.js` on your server.

## Will this affect performance?

`npm run build` creates a JavaScript file that is less than 3KB.  Having said that, performance will be affected in a tiny way because the JavaScript is not loaded asynchronously.  I should be able to support asynchronous loading in future, but for now you should do your own tests (or submit a PR adding asynchronous loading).

## What Performance does this monitor?

I’ve tried to reduce the number of stats to those that I deem useful, specifically:

* unloadEnd
* redirectEnd
* requestStart
* responseEnd
* domLoading
* domInteractive
* domContentLoadedEnd
* domComplete
* loadEnd

Performance is reported with a sessionId so you should be able to track the same session to multiple page loads.

To store this data you will need to implement your own backend. This would be an API endpoint which accepts post requests and parses the data in the following format.

encoded:

````
http://yourendpoint.com/?sessionId=55967c62-0b6a-4aaf-adb6-c8cf1bd7b34e&events={%22unit%22:%22ms%22,%22tag%22:%22load%22,%22x%22:1472464023528,%22y%22:{%22unloadEnd%22:16,%22redirectEnd%22:0,%22requestStart%22:9,%22responseEnd%22:16,%22domLoading%22:23,%22domInteractive%22:242,%22domContentLoadedEnd%22:243,%22domComplete%22:270,%22loadEnd%22:274}}
````

decoded:

````
http://yourendpoint.com/?sessionId=55967c62-0b6a-4aaf-adb6-c8cf1bd7b34e&events={"unit":"ms","tag":"load","x":1472464023528,"y":{"unloadEnd":16,"redirectEnd":0,"requestStart":9,"responseEnd":16,"domLoading":23,"domInteractive":242,"domContentLoadedEnd":243,"domComplete":270,"loadEnd":274}}
````

## Inspiration

This code has learnt a lot from: http://githubengineering.com/browser-monitoring-for-github-com/

## TODO:

* Report standard meta data such as the URL, the browser, the OS etc.
* Allow custom meta data to be reported
* Provide a generic API for generic performance reporting (mostly done)
* Add plugins for reporting other common performance concerns (e.g: AJAX, React, Angular, Ember, Backbone)
* Support Asynchronous loading.
* Implement the backend for this.
