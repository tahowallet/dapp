import type { ReflectServerOptions } from "@rocicorp/reflect/server"
import { mutators, ReflectMutators } from "./mutators"

const makeOptions = (): ReflectServerOptions<ReflectMutators> => ({
  mutators,
  logLevel: "debug",
})

export default makeOptions
