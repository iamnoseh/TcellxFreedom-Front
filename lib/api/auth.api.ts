import { apiClient } from './client'
import type { ApiResponse, UserDto } from '@/lib/types'

export interface LoginRequest {
  phoneNumber: string
}

export interface LoginResponse {
  message: string
}

export interface VerifyRequest {
  phoneNumber: string
  otpCode: string
}

export interface VerifyResponseData {
  token: string
  user: UserDto
}

export async function loginApi(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  const res = await apiClient.post<ApiResponse<LoginResponse>>('/api/auth/login', data)
  return res.data
}

export async function verifyOtpApi(data: VerifyRequest): Promise<VerifyResponseData> {
  const res = await apiClient.post<VerifyResponseData>('/api/auth/verify', data)
  return res.data
}
