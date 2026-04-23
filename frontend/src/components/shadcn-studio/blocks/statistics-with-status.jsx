import { TrendingUpIcon, TrendingDownIcon, MinusIcon, ShieldAlertIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'

const statusConfig = {
  within: {
    color: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    icon: <TrendingUpIcon />,
    label: 'Em linha'
  },
  observe: {
    color: 'border-amber-200 bg-amber-50 text-amber-700',
    icon: <MinusIcon />,
    label: 'Estavel'
  },
  exceed: { color: 'border-rose-200 bg-rose-50 text-rose-700', icon: <TrendingDownIcon />, label: 'Atencao' },
  unknown: {
    color: 'border-slate-200 bg-slate-50 text-slate-700',
    icon: <ShieldAlertIcon />,
    label: 'Em analise'
  }
}

const StatisticsCard = ({
  status,
  value,
  title,
  className,
  range,
  icon
}) => {
  const resolvedStatus = statusConfig[status] ? status : "unknown";
  return (
    <Card className={cn('flex h-full flex-col gap-3 shadow-sm', className)}>
      <CardHeader className='flex items-center justify-between border-b'>
        <CardTitle className='text-sm text-muted-foreground'>{title}</CardTitle>
        {icon && (
          <div
            className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-primary [&>svg]:size-4'>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className='flex flex-1 flex-col gap-3 pt-1'>
        <p className='text-3xl font-semibold tracking-tight'>{value}</p>

        <Badge variant='outline' className={cn(statusConfig[resolvedStatus].color, 'gap-1.5 self-start')}>
          {statusConfig[resolvedStatus].icon}
          <span>{statusConfig[resolvedStatus].label}</span>
          {range ? <span className='text-current/80'>{range}</span> : null}
        </Badge>
      </CardContent>
    </Card>
  );
}

export default StatisticsCard
