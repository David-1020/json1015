const CACHE_NAME = 'json1015-cache-v1';

self.addEventListener('install', (event) => {
    console.log('Service Worker 安裝');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/json1015/',
                '/json1015/index.html',
                '/json1015/manifest.json',
                '/json1015/latest.json',
                '/json1015/styles.css',
                '/json1015/app.js',
            ]);
        })
    );
    self.skipWaiting(); // 強制立即啟用
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker 啟用');
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('刪除舊快取:', key);
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    return self.clients.claim(); // 立即控制所有客戶端
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
