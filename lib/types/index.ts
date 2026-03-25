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

// ─── TcellPass Types ──────────────────────────────────────────────
export interface UserDailyTaskDto {
  id: string
  title: string
  description: string
  xpReward: number
  category: string
  isPremiumOnly: boolean
  status: 'Pending' | 'Completed' | 'Expired'
  completedAt: string | null
}

export interface UserTcellPassDto {
  userId: string
  totalXp: number
  currentLevel: number
  xpToNextLevel: number
  currentStreakDays: number
  longestStreak: number
  tier: 'Free' | 'Premium'
  premiumExpiresAt: string | null
  todayTasks: UserDailyTaskDto[]
}

export interface LevelRewardDto {
  level: number
  tier: 'Free' | 'Premium'
  rewardType: string
  rewardDescription: string
  rewardQuantity: number | null
  isClaimedByCurrentUser: boolean
}

export interface CompleteTaskResultDto {
  taskId: string
  xpAwarded: number
  newTotalXp: number
  newLevel: number
  leveledUp: boolean
  streakUpdated: boolean
  currentStreakDays: number
  streakBonusAwarded: boolean
  streakBonusXp: number
}

export interface ClaimRewardResultDto {
  level: number
  rewardDescription: string
  message: string
}

export interface ActivatePremiumResultDto {
  expiresAt: string
  message: string
}

export interface LeaderboardEntryDto {
  rank: number
  userId: string
  displayName: string
  totalXp: number
  currentLevel: number
  tier: string
}
