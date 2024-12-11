async function formatDate(dateResponse) {
  const originalDate = dateResponse
  const date = new Date(originalDate)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Meses começam em 0
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`
  return formattedDate
}

module.exports = formatDate;