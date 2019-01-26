let restaurantsCacheName = 'restaurants-reviews-v4';

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
                //Copyright to https://developers.google.com/web/fundamentals/primers/service-workers/
                return fetch(event.request)
                    .then(response=>{
                      // Check if we received a valid response
                      if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                      }
          
                      // IMPORTANT: Clone the response. A response is a stream
                      // and because we want the browser to consume the response
                      // as well as the cache consuming the response, we need
                      // to clone it so we have two streams.
                      var responseToCache = response.clone();
          
                      caches.open(restaurantsCacheName)
                        .then(cache=> {
                          cache.put(event.request, responseToCache);
                        });
          
                      return response;
                    }
                  );
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