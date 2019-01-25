let restaurantsCacheName = 'restaurants-reviews-v3';

self.addEventListener('install', event=>{
    event.waitUntil(
        caches.open(restaurantsCacheName )
            .then(cache=>{
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/restaurant.html',
                    '/css/styles.css',
                    '/data/restaurants.json',
                    '/img/1.jpg',
                    '/img/2.jpg',
                    '/img/3.jpg',
                    '/img/4.jpg',
                    '/img/5.jpg',
                    '/img/6.jpg',
                    '/img/7.jpg',
                    '/img/8.jpg',
                    '/img/9.jpg',
                    '/img/10.jpg',
                    '/js/main.js',
                    '/js/dbhelper.js',
                    '/js/restaurant_info.js'
                ]);
            })
    )

});

self.addEventListener('fetch', event=> {
    event.respondWith(
        caches.match(event.request)
            .then(response=> {
                if(response){
                    return response;
                }
                return fetch(event.request);
            })
    )
});

self.addEventListener('activate', event=> {
    event.waitUntil(
        caches.keys()
            .then(cacheNames=>{
                return Promise.all(
                    cacheNames.filter(cacheName=> {
                        return cacheName.startsWith('restaurants-reviews-v') && cacheName != restaurantsCacheName;
                    }).map(function (cacheName) {
                        return caches.delete(cacheName);
                    })
                );
            })
    )

});