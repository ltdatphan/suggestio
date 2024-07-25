export const decode = (data: any) => {
  if (typeof data === 'string') {
    return decodeURIComponent(data)
  } else if (typeof data === 'object' && data !== null) {
    for (const key in data) {
      data[key] = decode(data[key])
    }
  }
  return data
}
