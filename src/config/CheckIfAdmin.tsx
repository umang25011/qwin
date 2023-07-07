import React, { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { LOCAL_STORAGE } from "./localStorage"

export default function CheckIfAdmin() {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("admin")

  const userRole = LOCAL_STORAGE.getUserRole()
  console.log("User Role: ", userRole)

  useEffect(() => {}, [])
  return <React.Fragment></React.Fragment>
}
