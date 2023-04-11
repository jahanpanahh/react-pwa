let cacheData = "appV1";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/manifest.json",
        "/index.js",
        "/index.html",
        "/",
        "/users",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  //console.log("url", event.request.url);
  if (!navigator.onLine) {
    if (event.request.url === "http://localhost:3000/manifest.json") {
      event.waitUntil(
        this.registration.showNotification("Internet", {
          body: "Internet not working",
        })
      );
    }

    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        let requestURL = event.request.clone();
        fetch(requestURL);
      })
    );
  }
});

self.addEventListener('push', function (e) {
  var body;

  if (e.data) {
      body = e.data.text();
  } else {
      body = "Standard Message";
  }

  var options = {
      body: body,
      icon: "logo512.png",
      vibrate: [100, 50, 100],
      data: {
          dateOfArrival: Date.now()
      },
      actions: [
          {
              action: "explore", title: "Go interact with this!",
              icon: "logo192.png"
          },
          {
              action: "close", title: "Ignore",
              icon: "logo192.png"
          },
      ]
  };
  e.waitUntil(
      self.registration.showNotification("Weapon Detected!!!", options)
  );
});

self.addEventListener('notificationclick', function (e) {
  var notification = e.notification;
  var action = e.action;

  if (action === 'close') {
      notification.close();
  } else {
      // Some actions
      clients.openWindow('http://www.zeroeyes.com');
      notification.close();
  }
});