class NotificationServiceClass {
  static #instance = null
  #title = "Welcome to Subscape, Nomad"
  #options = {
    dir: "ltr",
    icon: "https://raw.githubusercontent.com/tahowallet/taho.xyz/29a091abf919b5cfcf511fd10c41d73490ce4f23/src/shared/favicon.svg",
    body: "We've been waiting for you...",
    silent: false,
    requireInteraction: true,
    vibrate: true,
  }

  constructor() {
    self.addEventListener("notificationclick", this.onClick.bind(this), {
      once: true,
    })
    self.addEventListener("notificationclose", this.onClose.bind(this), {
      once: true,
    })
  }

  static getInstance() {
    return this.#instance ? this.#instance : new NotificationServiceClass()
  }

  getPermission() {
    return self.Notification.permission
  }

  push(title = this.#title, options = this.#options) {
    const permission = this.getPermission()
    if (permission === "granted") {
      self.registration.showNotification(title, { ...this.options, ...options })
    } else if (permission === "denied") {
      this.log("permission denied", true)
    }
  }

  onClick() {
    this.log("notification clicked")
  }

  onClose() {
    this.log("notification closed")
  }

  log(log, failed) {
    console.log(
      `%cSERVICE WORKER: ${log}`,
      `background-color: ${failed ? "#C70039" : "#355E3B"}; padding: 0.5em`
    )
  }

  release() {
    removeEventListener("notificationclick", this.onClick)
    removeEventListener("notificationclose", this.onClose)
  }
}

export const NotificationService = NotificationServiceClass.getInstance()
