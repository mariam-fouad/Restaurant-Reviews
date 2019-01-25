let restaurantsCacheName = 'restaurants-v1';

self.addEventListener('install', event=>{
    event.waitUntil(
        aches.open(staticCacheName)
            .then(cache=>{
                return cache.addAll([
                    './',
                    './index.html',
                    './restaurant.html',
                    './css/styles.css',
                    './data/restaurants.json',
                    './js/dbhelper.js',
                    './js/main.js',
                    './js/restaurant_info.js',
                    './js/sw_register.js',
                    './img/1.jpg',
                    './img/2.jpg',
                    './img/3.jpg',
                    './img/4.jpg',
                    './img/5.jpg',
                    './img/6.jpg',
                    './img/7.jpg',
                    './img/8.jpg',
                    './img/9.jpg',
                    './img/10.jpg'
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