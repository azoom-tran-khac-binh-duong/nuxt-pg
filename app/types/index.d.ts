import type { User } from "~~/db/schema";

declare module 'h3' {
  interface H3EventContext {
    user: User
  }
}
