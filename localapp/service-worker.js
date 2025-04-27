const CACHE_NAME = "mercury-pwa-cache-v1";
const urlsToCache = [
  "./index.html",
  "./login.html",
  "./url.py",
  "./manifest.json",
  "./service-worker.js",
  "./js/script.js",
  "./js/login.js",
  "./utils/getQuery.mjs",
  "./utils/url.mjs",
  "./utils/toast.mjs",
  "./styles/styles.css",
  "./styles/material.css",
  "./styles/login.css",
  "./styles/toast.css",
  "./icons/mercury.svg",
  "./icons/logo-192x192.png",
  "./icons/logo-512x512.png",
  "./api/upload.mjs",
  "./api/window.mjs",
  "./api/acceptInvitation.mjs",
  "./api/isAuthenticated.mjs",
  "./api/projectById.mjs",
  "./api/task.mjs",
  "./api/employeeById.mjs",
  "./api/timelogging.mjs",
  "./api/screenshot.mjs",
  "./fonts/Material Symbols.woff",
  "./fonts/Roboto-Regular.ttf",
  "./fonts/Roboto-Bold.ttf",
  "./handlers/handleEmployee.mjs",
  "./handlers/handleLogin.mjs",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
