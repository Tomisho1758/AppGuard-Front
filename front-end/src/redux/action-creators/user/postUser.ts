import axios from "axios"
import { ActionType } from "../../action-types/userTypes"
import type { Action } from "../../actions/userActions"
import type { Dispatch } from "@reduxjs/toolkit"

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
  //baseURL: "https://appguard-back.onrender.com/",
})

interface UserData {
  userName: string
  email: string
  password: string
  typeIdentification: string
  numberIdentification: string
  rol: string
}

export function createUser(userData: UserData) {
  return async function (dispatch: Dispatch<Action>) {
    try {
      const url = "/user/create"
      const response = await instance.post(url, userData)

      dispatch({
        type: ActionType.POST,
        payload: response.data,
      })
    } catch (error) {
      console.error("Error creating User:", error)
    }
  }
}
