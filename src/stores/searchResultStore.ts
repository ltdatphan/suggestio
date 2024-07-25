import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SearchResultStoreType = {
  query: string
  searchResult: models.user.IUserSearchResultProps[] | null
  setQuery: (newQuery: string) => void
  setSearchResult: (
    newSearchResult: models.user.IUserSearchResultProps[],
  ) => void
  clear: () => void
}

export const useSearchResultStore = create<SearchResultStoreType>()(
  persist(
    (set) => ({
      query: '',
      searchResult: null,
      setQuery: (newQuery) => set(() => ({ query: newQuery })),
      setSearchResult: (newSearchResult) =>
        set(() => ({ searchResult: newSearchResult })),
      clear: () => set(() => ({ searchResult: null, query: '' })),
    }),
    {
      name: 'search-result-storage',
    },
  ),
)
