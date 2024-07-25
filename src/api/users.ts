import api from './_config'

export async function searchUsers(
  {
    pageParam,
  }: {
    pageParam: number
  },
  query: string
): Promise<{
  data: models.user.IPaginatedUserResponse
  currentPage: number
  nextPage: number | null
}> {
  try {
    const { data }: { data: models.user.IPaginatedUserResponse } =
      await api.get('users/search', {
        params: {
          query: query,
          pageNumber: pageParam,
          pageSize: 6,
          sortBy: 'username',
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

export async function getCurrentUserProfile() {
  try {
    // TODO: ADD username sanitization
    const { data }: { data: models.user.IUserProfileResponseProps } =
      await api.get('me/profile', {
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
      throw new Error('Error getting your profile. Please try again later')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function getCurrentUserLists() {
  try {
    // TODO: ADD username sanitization
    const { data }: { data: models.list.IListResponseProps } = await api.get(
      'me/lists',
      {
        withCredentials: true,
      }
    )
    return data
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

export async function getUserProfileByUsername(username: string) {
  try {
    // TODO: ADD username sanitization
    const { data }: { data: models.user.IUserProfileResponseProps } =
      await api.get(`users/${username}/profile`, {
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
      throw new Error(
        'Error getting the specified profile. Please try again later'
      )
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function getUserListsByUsername(
  {
    pageParam,
  }: {
    pageParam: number
  },
  username: string
): Promise<{
  data: models.list.IPaginatedListsResponse
  currentPage: number
  nextPage: number | null
}> {
  try {
    const { data }: { data: models.list.IPaginatedListsResponse } =
      await api.get(`users/${username}/lists`, {
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
      throw new Error(
        'Error getting the specified profile. Please try again later.'
      )
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function followUserById(userId: string) {
  try {
    const { data }: { data: models.user.IUserProfileResponseProps } =
      await api.post(`users/${userId}/follow`, null, {
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
      throw new Error('Error following user. Please try again later')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function unfollowUserById(userId: string) {
  try {
    const { data }: { data: models.user.IUserProfileResponseProps } =
      await api.delete(`users/${userId}/unfollow`, {
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
      throw new Error('Error unfollowing user. Please try again later')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}
