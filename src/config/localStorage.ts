import { UserDetails } from "../layouts/profile/profileSlice"

export const LOCAL_STORAGE_KEYS = {
  user: "user",
  loading: "UserLoading",
  admin: "isAdmin",
}

export function storeUser(user: UserDetails) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(user))
}

export function getUser() {
  try {
    let tempData = localStorage.getItem("user")
    if (tempData) {
      tempData = JSON.parse(tempData)
      return (tempData as unknown) as UserDetails
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

export function isAdmin(admin?: boolean) {
  if (admin !== undefined) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.admin, JSON.stringify({ [LOCAL_STORAGE_KEYS.admin]: admin }))
    return admin
  } else {
    const temp = localStorage.getItem(LOCAL_STORAGE_KEYS.admin)
    try {
      const loadingState = JSON.parse(temp || "{}")
      if (loadingState[LOCAL_STORAGE_KEYS.admin]) return true
      else return false
    } catch (e) {
      return false
    }
  }
}

export const LOCAL_STORAGE = { storeUser, getUser, isLoading, isAdmin }
