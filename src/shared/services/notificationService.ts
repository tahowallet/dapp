type NotificationPermission = "default" | "denied" | "granted" | null;

class NotificationService{
  private _isNotificationSupported:boolean
  private _permission:NotificationPermission
  private _context:ServiceWorkerRegistration
  private static _instance:NotificationService

  constructor(context: ServiceWorkerRegistration) {
    console.log('### NotificationService')
    this._context = context;
    this._isNotificationSupported = "Notification" in window
    this._permission = this._isNotificationSupported ? window.Notification?.permission : null
    if(! NotificationService._instance){
      NotificationService._instance = this;
    }
    this.pushNotification({title: "Service worker registered"})
    return NotificationService._instance
  }

  static get instance() {
    return this._instance ? this._instance : null;
  }

  private log(log: string){
    console.log(`%c${log}`, 'color: red');
  }

  private get context() {
    return this._context
  }

  public set permission(permission: NotificationPermission){
    this._permission = permission;
  }

  public get permission() {
    return this._permission;
  }
  
  public pushNotification({title, options}: {title: string, options?: NotificationOptions}){

    if(this._permission === "granted"){
      this.context.pushManager.subscribe({userVisibleOnly: true})
      this.context.showNotification(title, options);
      console.log(this.context);
    } else if (this._permission !== "denied") {
      this.requestPermission()
    }
  }

  public async requestPermission(){
    if (this._isNotificationSupported) {
      Notification.requestPermission().then((permission: NotificationPermission) => {
        this._permission = permission;
        this.pushNotification({title: "Welcome in Subscape, Nomad!", options: {body: `Your notificaition status: ${permission}}`}})
      })
    } else {
      this.log("This browser does not support desktop notification")
    }
  }
}

export default NotificationService
