export interface ApiResponse<T> {
  data: T
  isSuccess: boolean
  message: string | null
  statusCode: number
}

export interface UserDto {
  id: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  balance: number
}

export interface PlanDto {
  id: string
  title: string
  description?: string
  startDate: string
  endDate: string
  status: string
  totalTasks: number
  completedTasks: number
  createdAt: string
}

export interface PlanDetailDto {
  id: string
  title: string
  description?: string
  startDate: string
  endDate: string
  status: string
  tasks: PlanTaskDto[]
  createdAt: string
}

export interface PlanTaskDto {
  id: string
  title: string
  description?: string
  scheduledAt: string
  estimatedMinutes: number
  status: string
  isAiSuggested: boolean
  isAccepted: boolean
  recurrence: string
  aiRationale?: string
}

export interface WeeklyStatDto {
  weekStart: string
  totalTasks: number
  completedTasks: number
  skippedTasks: number
  completionRate: number
}

export interface StatisticsDto {
  weeklyStats: WeeklyStatDto[]
  aiSuggestions: string[]
}

export interface NotificationDto {
  id: string
  planTaskId: string
  taskTitle: string
  scheduledAt: string
  status: string
  notificationTitle: string
  notificationBody: string
}
