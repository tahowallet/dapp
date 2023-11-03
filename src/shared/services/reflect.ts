import { Reflect } from "@rocicorp/reflect/client"
import { mutators } from "../../../reflect/mutators"

const reflectInstance = new Reflect({
  userID: "user-id",
  roomID: "my-room",
  server: "http://localhost:8080",
  mutators,
})

export default reflectInstance
