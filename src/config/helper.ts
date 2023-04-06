import { timeStamp } from "console"

export const TIME_QR_CODE_REFRESHES = 5000

// TODO : store entire state in LocalStorage


export const FIREBASE_COLLECTIONS = {
  users: "users",
  usersSubEvent: "user_events",
  events: "events",
  eventsSubAttendees: "attendees",
  eventsPrivate: "events-private",
  eventsPrivateRandomStringDocument: "random-string",
  eventsPrivateVerifiedAttendees: "attendees",
  unverified: "unverified",
  verified: "verified",
  privateUnverifiedAttendees: "private-unveried-attendees",
  eventsAttended: "events_attended",
}

export function generateRandomCharacters(): string {
  const length = 10
  let result = ""
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|\\:;"<>,.?/~`'
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

/**generte hash of passed string */
export async function hashString(s: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(s)
  const hashBuffer = await crypto.subtle.digest("SHA-1", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}

export async function getVerificationString(s1: string, s2: string): Promise<string> {
  const timestamp = new Date()
  // const interval = Math.floor(timestamp / TIME_QR_CODE_REFRESHES)
  // const concatenated = s1 + s2 + interval.toString()
  // return hashString(concatenated)
  // TODO: return date string directly, so we can verify time in users
  return timestamp.toISOString()
}

export async function encryptJson(jsonObj: object, key: CryptoKey): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(16))
  const jsonStr = JSON.stringify(jsonObj)
  const encodedData = new TextEncoder().encode(jsonStr)
  const algorithm = { name: "AES-CBC", iv }
  const encryptedData = await crypto.subtle.encrypt(algorithm, key, encodedData)
  const encryptedHex = Array.from(new Uint8Array(encryptedData))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
  const ivHex = Array.from(iv)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
  return ivHex + encryptedHex
}

export async function decryptJson(encryptedJson: string, key: CryptoKey): Promise<object> {
  const ivHex = encryptedJson.substring(0, 32)
  const encryptedHex = encryptedJson.substring(32)

  if (!ivHex || !encryptedHex) {
    throw new Error("Invalid input string")
  }

  const iv = new Uint8Array(ivHex.match(/.{2}/g)!.map((hex) => parseInt(hex, 16)))
  const encryptedData = new Uint8Array(encryptedHex.match(/.{2}/g)!.map((hex) => parseInt(hex, 16)))
  const algorithm = { name: "AES-CBC", iv }
  const decryptedData = await crypto.subtle.decrypt(algorithm, key, encryptedData)
  const decodedData = new TextDecoder().decode(decryptedData)
  return JSON.parse(decodedData)
}

export const TOAST_MESSAGE = {
  registeredInEventSuccess: "Event Registration Successful",
  loginSuccess: "Logged In Successfully",
  verificationSuccess: "Event Verification Successful",
}

export const DATE_FORMAT_OPTION: Intl.DateTimeFormatOptions = {
  dateStyle: "full",
  timeStyle: "short",
}

// interface DateTimeFormatOptions {
//   calendar?: string | undefined;
//   dayPeriod?: "narrow" | "short" | "long" | undefined;
//   numberingSystem?: string | undefined;

//   dateStyle?: "full" | "long" | "medium" | "short" | undefined;
//   timeStyle?: "full" | "long" | "medium" | "short" | undefined;
//   hourCycle?: "h11" | "h12" | "h23" | "h24" | undefined;
