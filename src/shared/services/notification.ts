class NotificationService {
  constructor() {
    Notification.requestPermission().then((permission: string) => {
      if (permission === "granted") {
        new Notification("Example notification")
      }
    })
  }
}

export default new NotificationService()
