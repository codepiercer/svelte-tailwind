export const formatDate = (date) => {
  // Format date to YYYY-MM-DD
  const [dateOnly] = date.split(`T`)
  let d = new Date(dateOnly + `T00:00:00.000`)
  if (date.endsWith(`Z`)) {
    d = new Date(date)
  }
  const year = d.getFullYear()
  const month = `0${d.getMonth() + 1}`.slice(-2)
  const _date = `0${d.getDate()}`.slice(-2)
  return `${year}-${month}-${_date}`
}

export const formatTime = (date) => {
  // if date is not a date object, convert it to one first
  if (typeof date === `string`) {
    // covert a time only string to a date object: HH:MM -> 1970-01-01THH:MM
    if (date.length >= 5) {
      date = `1970-01-01T${date}`
    }
  }
  // Format date to H:MM AM/PM
  const d = new Date(date)
  const hours = d.getHours()
  const minutes = `0${d.getMinutes()}`.slice(-2)
  const ampm = hours >= 12 ? `PM` : `AM`
  const hours12 = hours % 12 || 12
  return `${hours12}:${minutes} ${ampm}`
}

export const formatDateTime = (date) => {
  // Format date to YYYY-MM-DD, HH:MM AM/PM
  const [d, t] = date.split(`T`)
  return `${formatDate(d)}, ${formatTime(t)}`
}
