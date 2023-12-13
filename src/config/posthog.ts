import { PostHogConfig } from "posthog-js"

export const { POSTHOG_API_KEY } = process.env

export const POSTHOG_API_OPTIONS: Partial<PostHogConfig> = {
  persistence: "localStorage",
  autocapture: false,
  capture_pageview: false,
  disable_session_recording: true,
  sanitize_properties(properties) {
    return {
      ...properties,
      // The extension has set an expectation that the lib is set to
      // the analytics env.
      $lib: process.env.ANALYTICS_ENV,
    }
  },
}
