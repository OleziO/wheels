import dayjs from 'dayjs'

export type TAuctionStatus = 'not-started' | 'pending' | 'ended'

export interface IRemainingTime {
  remainingTime: string
  status: TAuctionStatus
}

export function useAuctionTimer (lastBidTime: globalThis.ComputedRef<string>, auctionDurationMinutes: number) {
  const remainingTime = ref<IRemainingTime>({
    remainingTime: '',
    status: 'not-started'
  })

  const updateRemainingTime = () => {
    if (!lastBidTime.value) {
      remainingTime.value.remainingTime = 'Зробіть свою ставку'
      remainingTime.value.status = 'not-started'
      return
    }

    const lastBid = dayjs(lastBidTime.value)
    const auctionEndTime = lastBid.add(auctionDurationMinutes, 'minutes')
    const timeLeft = auctionEndTime.diff(dayjs(), 'seconds')

    if (timeLeft > 0) {
      const minutesLeft = Math.floor(timeLeft / 60)
      const secondsLeft = timeLeft % 60

      remainingTime.value.remainingTime = `До кінця аукціону: ${minutesLeft ? `${minutesLeft} хв` : ''} ${secondsLeft < 10 ? '0' : ''}${secondsLeft} с`
      remainingTime.value.status = 'pending'
    } else {
      remainingTime.value.remainingTime = 'Аукціон завершено'
      remainingTime.value.status = 'ended'
    }
  }

  onMounted(() => {
    updateRemainingTime()

    const intervalId = setInterval(updateRemainingTime, 1000)

    onUnmounted(() => {
      clearInterval(intervalId)
    })
  })

  watch(() => lastBidTime.value, () => {
    updateRemainingTime()
  })

  return remainingTime
}
