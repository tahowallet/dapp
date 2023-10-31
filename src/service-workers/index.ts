export const registerServiceWorker = async () => {
   if(!('serviceWorker' in navigator)){
    throw new Error("No support for service worker!")
  }

  if("Notification" in window){
    Notification.requestPermission().then(()=>{
      if(Notification.permission === "granted"){
        console.log("Granted permission for push notification")
      }else{
        console.log("Rejected permission for push notification")
      }
    })
  } else {
    throw new Error("No support for push notification.")
  }

  try{
    const config = encodeURIComponent(
      JSON.stringify({
        vapidKey: process.env.VAPID_KEY,
      })
    );

    navigator.serviceWorker.register(`service-workers/Notification/notification.serviceWorker.js?config=${config}`, {type: "module", scope: "/"}).then((registration) => {
      console.log(`A service worker is active`, registration);
    });
  } catch(error){
    throw new Error("Service Worker Registration Failed: " + error)
  }
}
