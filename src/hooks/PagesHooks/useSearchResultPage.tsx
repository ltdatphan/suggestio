import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { sanitize } from '../../helper/sanitize'
import useSearch from '../ApiHooks/useSearch'

type SearchInput = {
  query: string
  searchType: 'lists' | 'users'
}

const useSearchResultPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, _] = useSearchParams()

  const { control, handleSubmit, setValue, watch } = useForm<SearchInput>({
    defaultValues: {
      query: sanitize(searchParams.get('query')) || '',
      searchType: 'lists',
    },
  })

  const targetType =
    location.pathname.substring(1, location.pathname.indexOf('/', 1)) == 'users'
      ? 'users'
      : 'lists'

  const { data, status, error, fetchNextPage, isFetchingNextPage } = useSearch(
    searchParams.get('query') || '',
    targetType
  )

  const onSubmit = async (data: SearchInput) => {
    if (data.query !== '') {
      if (data.searchType == 'lists')
        navigate(`/lists/search?query=${data.query}`)
      else if (data.searchType == 'users')
        navigate(`/users/search?query=${data.query}`)
    }
  }

  useEffect(() => {
    setValue('searchType', targetType)
  }, [targetType])

  return {
    query: searchParams.get('query') || '',
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    control,
    watch,
    handleSubmit: handleSubmit(onSubmit),
  }
}

export default useSearchResultPage
