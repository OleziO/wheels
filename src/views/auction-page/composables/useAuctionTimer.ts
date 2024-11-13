import dayjs from 'dayjs'

export function useAuctionTimer (lastBidTime: globalThis.ComputedRef<string>, auctionDurationMinutes: number) {
  const remainingTime = ref('')

  const updateRemainingTime = () => {
    if (!lastBidTime.value) {
      remainingTime.value = 'Зробіть початкову ставку'
      return
    }

    const lastBid = dayjs(lastBidTime.value)
    const auctionEndTime = lastBid.add(auctionDurationMinutes, 'minutes')
    const timeLeft = auctionEndTime.diff(dayjs(), 'seconds')

    if (timeLeft > 0) {
      const minutesLeft = Math.floor(timeLeft / 60)
      const secondsLeft = timeLeft % 60

      remainingTime.value = `До кінця аукціону: ${minutesLeft ? `${minutesLeft} хв` : ''} ${secondsLeft < 10 ? '0' : ''}${secondsLeft} с`
    } else {
      remainingTime.value = 'Аукціон завершено'
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
