import api, { extractErrorMessages } from './_config'

export async function getItem(itemId: number) {
  try {
    const { data }: { data: models.item.IItemResponseProps } = await api.get(
      `items/${itemId}`,
      {
        withCredentials: true,
      },
    )
    return data
  } catch (error: any) {
    //For server responses with just string
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    }
    //Network error
    if (error.message) {
      throw new Error('Error getting your item. Please try again later')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function createItem(
  itemId: number,
  newItemRequest: models.item.IItemCreateRequest,
) {
  try {
    const { data }: { data: models.list.IListResponseProps[] } = await api.post(
      `lists/${itemId}/items`,
      newItemRequest,
      {
        withCredentials: true,
      },
    )
    return data
  } catch (error: any) {
    // Validation error for forms with many error messages
    if (error.response && error.response.data && error.response.status == 400) {
      const errMessage = extractErrorMessages(error.response)
      throw new Error(errMessage)
    }

    //For server responses with just string
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    }

    //Network error
    if (error.message) {
      throw new Error('Error creating item. Please try again later.')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function updateItem(
  itemId: number,
  updateItemRequest: models.item.IItemUpdateRequest,
) {
  try {
    const { data }: { data: models.list.IListResponseProps[] } = await api.put(
      `items/${itemId}`,
      updateItemRequest,
      {
        withCredentials: true,
      },
    )
    return data
  } catch (error: any) {
    // Validation error for forms with many error messages
    if (error.response && error.response.data && error.response.status == 400) {
      const errMessage = extractErrorMessages(error.response)
      throw new Error(errMessage)
    }

    //For server responses with just string
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    }

    //Network error
    if (error.message) {
      throw new Error('Error updating item. Please try again later.')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function deleteItem(itemId: number) {
  try {
    const { data } = await api.delete(`items/${itemId}`, {
      withCredentials: true,
    })

    return data
  } catch (error: any) {
    //For server responses with just string
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    }

    //Network error
    if (error.message) {
      throw new Error('Error deleting item. Please try again later.')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}
