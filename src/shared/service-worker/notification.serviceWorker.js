self.addEventListener("install", async (e) => {
  console.log("### Notification service worker installed")
  self.skipWaiting()
})

self.addEventListener("activate", async (e) => {
  console.log("### Notification service worker activated")
  try {
    const options = {}
    const subscription = await self.registration.pushManager.subscribe(options)
    console.log(JSON.stringify(subscription))
  } catch (err) {
    console.log("Error", err)
  }
})

self.addEventListener("push", (e) => {
  console.log("### Notification service worker pushed")
})
