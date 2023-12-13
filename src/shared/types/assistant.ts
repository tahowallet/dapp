export type AssistantType = "welcome" | "challenges" | "default" | "first-realm"

export type Assistant = {
  type: AssistantType
  visible: boolean
}
