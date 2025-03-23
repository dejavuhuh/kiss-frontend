import type { api, ResponseOf } from '@/api'

type User = ResponseOf<typeof api.authenticationService.getCurrentUser>
let currentUser: User

export function setCurrentUser(user: User) {
  currentUser = user
}

export function getCurrentUser() {
  return currentUser
}
