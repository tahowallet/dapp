import NotificationService from "../services/notificationService"

export const registerServiceWorker = async () => {
  if(!('serviceWorker' in navigator)){
    throw new Error("No support for service worker!")
  }

  const registeredSW = await navigator.serviceWorker.register("./service-workers/notification.serviceWorker.js");
  new NotificationService(registeredSW)
}
