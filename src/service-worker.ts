import { join as pathJoin } from "path";

const CACHE_NAME = "v1";
const CACHE_LIST = (process.env.CACHE_LIST as string).split(",");

const sw: any = self;

const cacheListWithHost = CACHE_LIST.map((resource) =>
  pathJoin(location.host, resource)
);

sw.oninstall = (event: any) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      return cache.addAll(CACHE_LIST);
    })()
  );
};

sw.onfetch = (event: any) => {
  if (!cacheListWithHost.some((item) => event.request.url.endsWith(item)))
    return;
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      if (!cachedResponse)
        throw Error(`Not found in cache: ${event.request.url}`);
      return cachedResponse;
    })()
  );
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const response = await fetch(event.request);
      return cache.put(event.request, response);
    })()
  );
};
