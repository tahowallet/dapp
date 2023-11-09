import { Reflect } from "@rocicorp/reflect/client"
import { mutators } from "../../../reflect/mutators"

const reflectInstance = new Reflect({
  userID: "user-id",
  roomID: "/",
  server: "http://localhost:8080",
  mutators,
})

export default reflectInstance
