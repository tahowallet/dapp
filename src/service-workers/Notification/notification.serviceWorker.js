import { NotificationService } from "./notification.service.js"

self.addEventListener("install", (event) => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  // event.waitUntil(self.clients.claim())
  NotificationService.log("activated")

  const config = JSON.parse(new URL(location).searchParams.get("config"))

  const { vapidKey } = config

  const options = {
    userVisibleOnly: true,
    // https://datatracker.ietf.org/doc/html/rfc8292,
    // Temporary used random vapidKey in BASE64 format
    applicationServerKey: vapidKey,
  }

  self.registration.pushManager.subscribe(options).then(
    (pushSubscription) => {
      console.log(pushSubscription.endpoint)
      // The push subscription details needed by the application
      // server are now available, and can be sent to it using,
      // for example, an XMLHttpRequest.
    },
    (error) => {
      // During development it often helps to log errors to the
      // console. In a production environment it might make sense to
      // also report information about errors back to the
      // application server.
      console.error(error)
    }
  )
})

self.addEventListener("push", (event) => {
  const { title, dir, badge, image, body, silent, requireInteraction } =
    event.data?.json() ?? {}

  const options = {
    dir,
    badge,
    image,
    body,
    silent,
    requireInteraction,
  }

  NotificationService.push(title, options)
})

self.addEventListener("message", (event) => {
  const { data = "push" } = event

  switch (data.type) {
    case "push":
      const { title, options } = data
      NotificationService.push(title, options)
    case "unregister":
      self.registration
        .unregister()
        .then(function () {
          NotificationService.release()
          return self.clients.matchAll()
        })
        .then(function (clients) {
          clients.forEach((client) => {
            client.navigate(client.url)
          })
        })
    default:
      return
  }
})
