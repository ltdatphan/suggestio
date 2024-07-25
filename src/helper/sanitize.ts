import DOMPurify from 'dompurify'

export const sanitize = (obj: any): any => {
  if (typeof obj === 'string') {
    return DOMPurify.sanitize(obj, {
      ALLOWED_TAGS: ['#text'],
    })
  }

  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      // If obj is an array, sanitize each element recursively
      return obj.map((item) => sanitize(item))
    } else {
      // If obj is an object, sanitize its string properties
      const sanitizedObj: any = {}

      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          sanitizedObj[key] = DOMPurify.sanitize(obj[key], {
            ALLOWED_TAGS: ['#text'],
          })
        } else if (typeof obj[key] === 'object') {
          sanitizedObj[key] = sanitize(obj[key])
        } else {
          sanitizedObj[key] = obj[key]
        }
      }

      return sanitizedObj
    }
  } else {
    // If obj is not an object or null, return it as-is
    return obj
  }
}
