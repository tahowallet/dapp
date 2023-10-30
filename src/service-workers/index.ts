export const registerServiceWorker = async () => {
   if(!('serviceWorker' in navigator)){
    throw new Error("No support for service worker!")
  }

  await navigator.serviceWorker.register("service-workers/Notification/notification.serviceWorker.js", {scope: "./service-workers/Notification/"});
}
