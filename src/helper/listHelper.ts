const allowedListTypes: models.list.ListType[] = [
  'places',
  'tv',
  'books',
  'fitness',
  'products',
  'other',
]

// Type guard function to check if a value is a valid listType
export function isValidListType(value: any): value is models.list.ListType {
  return allowedListTypes.includes(value)
}
