

export const register = () => {
  if ('serviceWorker' in navigator) {
    console.log("### Service Worker is available")
    navigator.serviceWorker
      .register("./service-workers/notification.serviceWorker.js")
      .then((serviceWorkerRegistration) => {
        console.log("### Service Worker is registered")
        serviceWorkerRegistration.pushManager.subscribe().then(
          (pushSubscription) => {
            // console.log(pushSubscription?.subscriptionId);
            console.log('###', pushSubscription?.endpoint);
            // The push subscription details needed by the application
            // server are now available, and can be sent to it using,
            // for example, an XMLHttpRequest.
          },
          (error) => {
            // During development it often helps to log errors to the
            // console. In a production environment it might make sense to
            // also report information about errors back to the
            // application server.
            console.error('### error', error);
          },
        )
        // Notification.requestPermission().then((permission: string) => {
        //   console.log('###permission', permission)
        //   if (permission === "granted") {
        //     new Notification("Example notification", {body: "test"})
        //   }
        // })
        // console.log('###', new Notification({title: "yesy", body: 'Tets'}))
      })
      .catch((e: Error) => {
        console.log("### Service Worker is not registered", e)
      })
  }
}

export const unregister = () => {}
