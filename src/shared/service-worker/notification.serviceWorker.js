self.addEventListener("install", (e) => {
  console.log("### Notification service worker installed")
  new Notification("Example notification")
})

self.addEventListener("activate", (e) => {
  console.log("### Notification service worker activated")
  new Notification("Example notification")
})
