import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import  { NavigationRoute, Route, registerRoute } from 'workbox-routing';

import { CacheFirst, NetworkFirst } from 'workbox-strategies';
declare const self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();
// This array is populated by workboxBuild.injectManifest() at build time.
precacheAndRoute(self.__WB_MANIFEST);

(self as any).skipWaiting();


//cache images
const imageRoute = new Route(
    ({ request, sameOrigin }) => {
        return sameOrigin && request.destination === 'image';
    },
    new CacheFirst({
        cacheName: 'images',
    }),
)

registerRoute(imageRoute);

//cache api calls

//BACKEND NOT READY YET!!!!!!!!!!

//cache navigations
const navigationRoute = new NavigationRoute(
    
    new NetworkFirst({
        cacheName: 'navigations',
        networkTimeoutSeconds: 3,
    }),
)

registerRoute(navigationRoute);



//background sync