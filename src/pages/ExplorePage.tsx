import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Search from '../components/Form/FormComponents/Search'
import SearchListBox from '../components/Form/FormComponents/SearchListBox'
import { sanitize } from '../helper/sanitize'
import usePageTitle from '../hooks/usePageTitle'

type SearchInput = {
  query: string
  searchType: 'lists' | 'users'
}

const ExplorePage = () => {
  usePageTitle('Explore')
  const navigate = useNavigate()

  const { control, handleSubmit, resetField, watch } = useForm<SearchInput>({
    defaultValues: {
      query: '',
      searchType: 'lists',
    },
  })

  const onSubmit = async (data: SearchInput) => {
    const sanitizedQuery = sanitize(data.query)
    if (sanitizedQuery.length == 0) resetField('query')
    else {
      if (data.searchType == 'lists')
        navigate(`/lists/search?query=${sanitizedQuery}`)
      else if (data.searchType == 'users')
        navigate(`/users/search?query=${sanitizedQuery}`)
    }
  }

  return (
    <div className="mt-2.5 w-full px-2 md:mx-auto md:max-w-[36rem]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full">
          <Controller
            name="searchType"
            control={control}
            rules={{ required: 'Please enter search query' }}
            render={({
                       field: { name, onChange, value },
                       fieldState: { error },
                     }) => (
              <SearchListBox
                name={name}
                onChange={onChange}
                value={value}
                error={error}
              />
            )}
          />
          <Controller
            name="query"
            control={control}
            rules={{
              required: 'Please enter search query',
            }}
            render={({
                       field: { name, onChange, value },
                       fieldState: { error },
                     }) => (
              <Search
                label="Search input"
                name={name}
                onChange={onChange}
                value={value}
                error={error}
                target={watch('searchType')}
              />
            )}
          />
        </div>
      </form>
    </div>
  )
}

export default ExplorePage
