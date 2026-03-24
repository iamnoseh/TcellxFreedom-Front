'use client'

import { useAuthStore } from '@/lib/store/auth.store'
import { usePlans, usePlan } from '@/lib/hooks/usePlans'
import { GreetingCard } from '@/components/home/GreetingCard'
import { QuickActions } from '@/components/home/QuickActions'
import { UpcomingTasksList } from '@/components/home/UpcomingTasksList'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { isToday } from '@/lib/utils/date'
import type { PlanDto } from '@/lib/types'

function TodayPlanSection({ todayPlan }: { todayPlan: PlanDto }) {
  const { data: planDetail } = usePlan(todayPlan.id)
  return <UpcomingTasksList plans={[todayPlan]} planDetails={planDetail ? [planDetail] : []} />
}

export default function HomePage() {
  const user = useAuthStore((s) => s.user)
  const { data: plans = [], isLoading } = usePlans()

  if (isLoading) return <FullPageSpinner />

  const todayPlans = plans.filter((p) => isToday(p.startDate))

  return (
    <div className="px-4 pt-6 space-y-5">
      <GreetingCard user={user} plans={todayPlans} />

      <div>
        <h2 className="text-base font-semibold text-gray-300 mb-3">Амалҳои зуд</h2>
        <QuickActions />
      </div>

      <div>
        <h2 className="text-base font-semibold text-gray-300 mb-3">Вазифаҳои наздик</h2>
        {todayPlans.length > 0 ? (
          todayPlans.map((plan) => (
            <TodayPlanSection key={plan.id} todayPlan={plan} />
          ))
        ) : (
          <UpcomingTasksList plans={plans.slice(0, 3)} />
        )}
      </div>
    </div>
  )
}
