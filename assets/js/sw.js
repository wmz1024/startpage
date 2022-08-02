var cacheStorageKey = 'wlog';
const workboxVersion="5.1.3";importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js")
var cacheList = [
    "/index.html",
    "/setting.html",
    "/about.html",
    '/assets/css/main.css',
    '/assets/js/sw.js',
    '/assets/js/setting.js',
    '/assets/js/main.js',
    'offline.html'
]
self.addEventListener('install', function (e) {
    console.log('sw-install');
    self.skipWaiting();
})
self.addEventListener('activate', function (e) {
    console.log('sw-activate');
    caches.open(cacheStorageKey).then(function (cache) {
        cache.addAll(cacheList)
    })
    var cacheDeletePromises = caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(name => {
            if (name !== cacheStorageKey) {
                // if delete cache,we should post a message to client which can trigger a callback function
                console.log('caches.delete', caches.delete);
                var deletePromise = caches.delete(name);
                send_message_to_all_clients({ onUpdate: true })
                return deletePromise;
            } else {
                return Promise.resolve();
            }
        }));
    });
    e.waitUntil(
        Promise.all([cacheDeletePromises]
        ).then(() => {
            return self.clients.claim()
        })
    )
})
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            if (response != null) {
                console.log(`fetch:${e.request.url} from cache`);
                return response
            } else {
                console.log(`fetch:${e.request.url} from http`);
                return fetch(e.request.url)
            }
        })
    )
})