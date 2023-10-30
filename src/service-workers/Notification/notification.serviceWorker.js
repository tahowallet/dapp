self.addEventListener("install", (event) => {
  console.log("### Notification service worker installed")
  event.waitUntil(async () => {
    await event.installScript("notification.service.ts", "classic")
  })
})

self.addEventListener("activate", async (event) => {
  console.log("### Notification service worker activated", event)
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
