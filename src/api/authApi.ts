import axios from "axios"
import type {
  AuthData,
  AuthResponse,
  Token,
  UserRegistration,
} from "../types/user.ts"

const BASE_URL = "https://easydev.club/api/v1"

export const registerUser = async (
  userData: UserRegistration
): Promise<Token> => {
  const response = await axios.post(
    `${BASE_URL}/auth/signup`,
    userData
  )
  return response.data
}

export const loginUser = async (
  authData: AuthData
): Promise<AuthResponse> => {
  const response = await axios.post(
    `${BASE_URL}/auth/signin`,
    authData
  )
  return response.data
}
