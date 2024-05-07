const getDateString = (date: string) => {
  const obj = new Date(date)

  return `${obj.getDate() > 9 ? obj.getDate() : '0' + obj.getDate()}.${obj.getMonth() > 9 ? obj.getMonth() : '0' + obj.getMonth()}.${obj.getFullYear()}`
}

export {getDateString}