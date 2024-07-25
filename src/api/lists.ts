import api, { extractErrorMessages } from './_config'

export async function getCurrentUserLists({
                                            pageParam,
                                          }: {
  pageParam: number
}): Promise<{
  data: models.list.IPaginatedListsResponse
  currentPage: number
  nextPage: number | null
}> {
  try {
    const { data }: { data: models.list.IPaginatedListsResponse } =
      await api.get('me/lists', {
        withCredentials: true,
        params: {
          pageNumber: pageParam,
          pageSize: 6,
          sortBy: 'createdAt',
          isDescending: 'true',
        },
      })
    return {
      data: data,
      currentPage: pageParam,
      nextPage: data.pageNumber < data.totalPages ? pageParam + 1 : null,
    }
  } catch (error: any) {
    //For server responses with just string
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    }
    //Network error
    if (error.message) {
      throw new Error('Error getting your lists. Please try again later')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function getFollowingLists({
                                          pageParam,
                                        }: {
  pageParam: number
}): Promise<{
  data: models.list.IPaginatedListsResponse
  currentPage: number
  nextPage: number | null
}> {
  try {
    const { data }: { data: models.list.IPaginatedListsResponse } =
      await api.get('me/following/lists', {
        withCredentials: true,
        params: {
          pageNumber: pageParam,
          pageSize: 6,
          sortBy: 'createdAt',
          isDescending: 'true',
        },
      })
    return {
      data: data,
      currentPage: pageParam,
      nextPage: data.pageNumber < data.totalPages ? pageParam + 1 : null,
    }
  } catch (error: any) {
    //For server responses with just string
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    }
    //Network error
    if (error.message) {
      throw new Error('Error getting following lists. Please try again later')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function createList(
  newListRequest: models.list.IListCreateRequest,
) {
  try {
    const { data }: { data: models.list.IGeneralListResponseProps } =
      await api.post('me/lists', newListRequest, {
        withCredentials: true,
      })
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
      throw new Error('Error creating list. Please try again later.')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function getListDetails(listId: number) {
  try {
    const { data }: { data: models.list.IGeneralListResponseProps } =
      await api.get(`lists/${listId}`, {
        withCredentials: true,
      })
    return data
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    } else if (error.message) {
      throw new Error('Error fetching list details. Please try again later')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function getListItems(
  {
    pageParam,
  }: {
    pageParam: number
  },
  listId: number,
): Promise<{
  data: models.item.IPaginatedItemsResponse
  currentPage: number
  nextPage: number | null
}> {
  try {
    const { data }: { data: models.item.IPaginatedItemsResponse } =
      await api.get(`lists/${listId}/items`, {
        withCredentials: true,
        params: {
          pageNumber: pageParam,
          pageSize: 20,
          sortBy: 'createdAt',
          isDescending: 'true',
        },
      })
    return {
      data: data,
      currentPage: pageParam,
      nextPage: data.pageNumber < data.totalPages ? pageParam + 1 : null,
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    } else if (error.message) {
      throw new Error('Error fetching list items. Please try again later')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function getPublicListItems(
  listId: number,
  WithItems: boolean = true,
) {
  try {
    const { data }: { data: models.item.IItemPublicResponseProps[] } =
      await api.get(`lists/${listId}/items`, {
        withCredentials: true,
        params: {
          WithItems: WithItems,
        },
      })
    return data
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    } else if (error.message) {
      throw new Error('Error fetching list items. Please try again later')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function editList(
  listId: number,
  editListRequest: models.list.IListUpdateRequest,
) {
  try {
    const { data }: { data: models.list.IGeneralListResponseProps } =
      await api.put(`lists/${listId}`, editListRequest, {
        withCredentials: true,
      })
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
      throw new Error('Error editing list. Please try again later.')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function deleteList(listId: number) {
  try {
    const { data } = await api.delete(`lists/${listId}`, {
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
      throw new Error('Error deleting list. Please try again later.')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function searchLists(
  {
    pageParam,
  }: {
    pageParam: number
  },
  query: string,
): Promise<{
  data: models.list.IPaginatedListsResponse
  currentPage: number
  nextPage: number | null
}> {
  try {
    const { data }: { data: models.list.IPaginatedListsResponse } =
      await api.get('lists/search', {
        params: {
          query: query,
          pageNumber: pageParam,
          pageSize: 6,
          sortBy: 'title',
        },
        withCredentials: true,
      })
    return {
      data: data,
      currentPage: pageParam,
      nextPage: data.pageNumber < data.totalPages ? pageParam + 1 : null,
    }
  } catch (error: any) {
    //For server responses with just string
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    }
    //Network error
    if (error.message) {
      throw new Error('Error searching. Please try again later')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}
