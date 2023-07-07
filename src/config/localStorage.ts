import { UserDetails } from "../layouts/profile/profileSlice"
import { USER_ROLES } from "./helper"

export const LOCAL_STORAGE_KEYS = {
  user: "user",
  loading: "UserLoading",
  userRole: "UserRole",
}

export function storeUser(user: UserDetails) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(user))
}

export function getUser() {
  try {
    let tempData = localStorage.getItem("user")
    if (tempData) {
      tempData = JSON.parse(tempData)
      return tempData as unknown as UserDetails
    }
    return null
  } catch (error) {
    return null
  }
}

/**
 * To maintain loading state in local storage, so loading can work in login flow with redirect
 * @param loading set loading in local storage
 * @returns loading value stored in local storage
 */
export function isLoading(loading?: boolean) {
  if (loading !== undefined) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.loading, JSON.stringify({ [LOCAL_STORAGE_KEYS.loading]: loading }))
    return loading
  } else {
    const temp = localStorage.getItem(LOCAL_STORAGE_KEYS.loading)
    try {
      const loadingState = JSON.parse(temp || "{}")
      if (loadingState[LOCAL_STORAGE_KEYS.loading]) return true
      else return false
    } catch (e) {
      return false
    }
  }
}

export function getUserRole(userRole?: string): string {
  if (userRole !== undefined) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.userRole, JSON.stringify({ [LOCAL_STORAGE_KEYS.userRole]: userRole }))
    return userRole
  } else {
    const temp = localStorage.getItem(LOCAL_STORAGE_KEYS.userRole)
    try {
      const userRole = JSON.parse(temp || "{}")
      if (userRole[LOCAL_STORAGE_KEYS.userRole]) return userRole[LOCAL_STORAGE_KEYS.userRole]
      else return ""
    } catch (e) {
      return ""
    }
  }
}

export function checkIfUserRoleStored(): boolean {
  try {
    const temp = localStorage.getItem(LOCAL_STORAGE_KEYS.userRole)
    if (!temp) return false

    const parsedTemp = JSON.parse(temp || "")
    if (!parsedTemp || !parsedTemp[LOCAL_STORAGE_KEYS.userRole]) return false
    else return true
  } catch (error) {
    return false
  }
}

export const LOCAL_STORAGE = { storeUser, getUser, isLoading, getUserRole }
