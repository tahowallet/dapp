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
        vapidKey: process.env.VAPID_PUBLIC_KEY,
      })
    );

    navigator.serviceWorker.register(`service-workers/Notification/notification.serviceWorker.js?config=${config}`, 
      {type: "module", scope: "/"}).then((registration) => {
        console.log(`Service Worker registered`, registration);
      }).catch(function(err) {
        console.log("Service Worker Failed to Register", err);
    });
  } catch(error){
    throw new Error("Service Worker Registration Failed: " + error)
  }
}
