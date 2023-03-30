import React, { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { LOCAL_STORAGE } from "./localStorage"

export default function CheckIfAdmin() {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("admin")

  if (code === "true") {
    LOCAL_STORAGE.isAdmin(true)
  } else if (code === "false") {
    LOCAL_STORAGE.isAdmin(false)
  } else {
  }

  useEffect(() => {}, [])
  return <React.Fragment></React.Fragment>
}
