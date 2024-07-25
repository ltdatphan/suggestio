import api, { extractErrorMessages } from './_config'

export async function loginUser(loginRequestDto: models.auth.ILoginRequest) {
  try {
    const { username, password } = loginRequestDto
    const { data }: { data: models.auth.ILoginResponse } = await api.post(
      'account/login',
      {
        username: username,
        password: password,
      },
      { withCredentials: true },
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
      throw new Error('Error logging in. Please try again later.')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function refreshToken() {
  try {
    await api.post('account/refresh-token', null, {
      withCredentials: true,
    })
  } catch (error: any) {
    //For server responses with just string
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    }

    //Network error
    if (error.message) {
      throw new Error('Error getting new token Please try again later.')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}

export async function logoutUser() {
  try {
    return await api.post('account/revoke-token', null, {
      withCredentials: true,
    })
  } catch (error: any) {
    //For server responses with just string
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    }

    //Network error
    if (error.message) {
      throw new Error('Error logging out. Please try again later.')
    }
    // Fallback to a generic error message
    throw new Error('An unknown error occurred')
  }
}
