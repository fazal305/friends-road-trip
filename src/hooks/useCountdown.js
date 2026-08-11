import { useEffect, useState } from 'react'

const MS_IN_SECOND = 1000
const MS_IN_MINUTE = MS_IN_SECOND * 60
const MS_IN_HOUR = MS_IN_MINUTE * 60
const MS_IN_DAY = MS_IN_HOUR * 24

function diffToParts(targetDate) {
  const target = new Date(targetDate).getTime()
  const now = Date.now()
  const diff = target - now

  if (Number.isNaN(target) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: !Number.isNaN(target) }
  }

  return {
    days: Math.floor(diff / MS_IN_DAY),
    hours: Math.floor((diff % MS_IN_DAY) / MS_IN_HOUR),
    minutes: Math.floor((diff % MS_IN_HOUR) / MS_IN_MINUTE),
    seconds: Math.floor((diff % MS_IN_MINUTE) / MS_IN_SECOND),
    isPast: false,
  }
}

/** Live countdown to a target ISO date string, ticking every second. */
export function useCountdown(targetDate) {
  const [parts, setParts] = useState(() => diffToParts(targetDate))

  useEffect(() => {
    setParts(diffToParts(targetDate))
    const interval = setInterval(() => {
      setParts(diffToParts(targetDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return parts
}
