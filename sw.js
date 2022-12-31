const currentCache = "2311";
self.addEventListener("install", e => {
	self.skipWaiting();
	e.waitUntil(caches.open(currentCache).then(cache => cache.addAll([
		"./",
		"assets/js/m1.js",
		"assets/js/main.js",
		"assets/js/setting.js",
		"about.html",
		"setting.html",
		"https://unpkg.com/mdui@1.0.2/dist/js/mdui.min.js",
		"https://unpkg.com/mdui@1.0.2/dist/css/mdui.min.css",
		"https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css",
    "assets/css/main.css"
	])));
});
self.addEventListener("fetch", e => {
	if (
		!e.request.url.endsWith(".jpg") &&
		!e.request.url.endsWith(".mp4") &&
		!e.request.url.endsWith(".png") &&
		!e.request.url.endsWith(".webm") &&
		!e.request.url.endsWith(".webp")&&!e.request.url.endsWith(".jfif")
	) {
		e.respondWith(caches.match(e.request).then(response => {
			return response || fetch(e.request).catch(() => { });
		}).then(data => {
			return data || new Response(null, {
				status: 502,
				statusText: "Bad Gateway"
			});
		}));
	}
});
self.addEventListener("activate", e => {
	e.waitUntil(caches.keys().then(cacheNames => {
		return Promise.all(cacheNames.map(cacheName => {
			if (cacheName != currentCache) {
				return caches.delete(cacheName);
			}
		}));
	}));
});

const handle = async (req) => {
  return fetch(req.url).then(function (res) {
      if (!res) { throw 'error' } //1
      return caches.open(currentCache).then(function (cache) {
          cache.delete(req);
          cache.put(req, res.clone());
          return res;
      });
  }).catch(function (err) {
      return caches.match(req).then(function (resp) {
          return resp || caches.match(new Request('/')) //2
      })
  })
}

const RUNTIME = 'w1024'
const HOSTNAME_WHITELIST = [
  self.location.hostname,
  'fonts.gstatic.com',
  'fonts.googleapis.com',
  'unpkg.com'
]

// The Util Function to hack URLs of intercepted requests
const getFixedUrl = (req) => {
  var now = Date.now()
  var url = new URL(req.url)

  // 1. fixed http URL
  // Just keep syncing with location.protocol
  // fetch(httpURL) belongs to active mixed content.
  // And fetch(httpRequest) is not supported yet.
  url.protocol = self.location.protocol

  // 2. add query for caching-busting.
  // Github Pages served with Cache-Control: max-age=600
  // max-age on mutable content is error-prone, with SW life of bugs can even extend.
  // Until cache mode of Fetch API landed, we have to workaround cache-busting with query string.
  // Cache-Control-Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=453190
  if (url.hostname === self.location.hostname) {
    url.search += (url.search ? '&' : '?') + 'cache-bust=' + now
  }
  return url.href
}

/**
 *  @Lifecycle Activate
 *  New one activated when old isnt being used.
 *
 *  waitUntil(): activating ====> activated
 */
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

/**
 *  @Functional Fetch
 *  All network requests are being intercepted here.
 *
 *  void respondWith(Promise<Response> r)
 */
self.addEventListener('fetch', event => {
  // Skip some of cross-origin requests, like those for Google Analytics.
  if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {
    // Stale-while-revalidate
    // similar to HTTP's stale-while-revalidate: https://www.mnot.net/blog/2007/12/12/stale
    // Upgrade from Jake's to Surma's: https://gist.github.com/surma/eb441223daaedf880801ad80006389f1
    const cached = caches.match(event.request)
    const fixedUrl = getFixedUrl(event.request)
    const fetched = fetch(fixedUrl, { cache: 'no-store' })
    const fetchedCopy = fetched.then(resp => resp.clone())

    // Call respondWith() with whatever we get first.
    // If the fetch fails (e.g disconnected), wait for the cache.
    // If there’s nothing in cache, wait for the fetch.
    // If neither yields a response, return offline pages.
    event.respondWith(
      Promise.race([fetched.catch(_ => cached), cached])
        .then(resp => resp || fetched)
        .catch(_ => { /* eat any errors */ })
    )

    // Update the cache with the version we fetched (only for ok status)
    event.waitUntil(
      Promise.all([fetchedCopy, caches.open(RUNTIME)])
        .then(([response, cache]) => response.ok && cache.put(event.request, response))
        .catch(_ => { /* eat any errors */ })
    )
  }
})

const handle2 = async (req) => {
  return fetch(req.url).then(function (res) {
      if (!res) { throw 'error' } //1
      return caches.open(RUNTIME).then(function (cache) {
          cache.delete(req);
          cache.put(req, res.clone());
          return res;
      });
  }).catch(function (err) {
      return caches.match(req).then(function (resp) {
          return resp || caches.match(new Request('/')) //2
      })
  })
}
