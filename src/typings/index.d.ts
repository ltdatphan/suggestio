namespace models {
  namespace auth {
    interface ILoginRequest {
      username: string
      password: string
    }

    interface ILoginResponse {
      id: string
      username: string
      email: string
      firstName: string
      profileImgUrl: string | null
    }

    interface IRegisterRequest {
      username: string
      email: string
      password: string
      firstName: string
      lastName: string
    }
  }

  namespace list {
    type ListType = 'places' | 'tv' | 'books' | 'fitness' | 'products' | 'other'

    interface IBasicListResponseProps {
      id: number
      title: string
      isPublic: boolean
      coverImgUrl: string
      itemCount: number
      createdAt: Date
      updatedAt: Date
    }

    interface IBasicPublicListResponseProps {
      id: number
      title: string
      coverImgUrl: string
      ownerUsername: string
      ownerProfileImgUrl: string | null
      itemCount: number
      createdAt: Date
      updatedAt: Date
    }

    interface IListResponseProps {
      id: number
      title: string
      subtitle: string | null
      ownerId: string
      isPublic: boolean
      listType: string
      itemCount: number
      coverImgUrl: string | null
      createdAt: Date
      updatedAt: Date
    }

    interface IPublicListResponseProps extends models.list.IListResponseProps {
      ownerUsername: string
      ownerProfileImgUrl: string | null
    }

    interface IGeneralListResponseProps {
      id: number
      title: string
      subtitle: string | null
      ownerId: string
      isPublic: boolean
      listType: string
      itemCount: number
      coverImgUrl: string | null
      createdAt: Date
      updatedAt: Date
      ownerUsername?: string | null
      ownerProfileImgUrl?: string | null
    }

    // type IGeneralListResponseProps = models.list.IListResponseProps & models.list.IListResponseProps

    interface IListResponseWithItemsProps
      extends models.list.IListResponseProps {
      listItems: models.item.IItemProps[]
    }

    interface IPaginatedListsResponse {
      lists: models.list.IGeneralListResponseProps[]
      pageNumber: number
      pageSize: number
      totalItems: number
      totalPages: number
    }

    // interface IFollowingListResponseProps {
    //   id: number
    //   title: string
    //   subtitle: string | null
    //   ownerId: string
    //   listType: ListType
    //   coverImgUrl: string | null
    //   createdAt: Date
    //   updatedAt: Date
    //   ownerUsername: string
    //   ownerFullName: string
    //   ownerProfileImgUrl: string | null
    // }

    interface IListCreateRequest {
      title: string
      subtitle: string
      isPublic: boolean
      listType: ListType
      coverImgUrl?: string
    }

    interface IListUpdateRequest {
      title: string
      subtitle: string
      isPublic: boolean
      listType: ListType
      coverImgUrl: string | null
    }
  }

  namespace item {
    interface IItemProps {
      id: number
      itemName: string
      listId?: number
      subtitle: string | null
      category: string | null
      itemImgUrl: string | null
      itemUrl: string | null
      rating: number | null
      notes: string | null
      createdAt?: Date
      updatedAt?: Date
    }

    interface IItemResponseProps {
      id: number
      itemName: string
      listId: number
      subtitle: string | null
      category: string
      itemImgUrl: string | null
      itemUrl: string | null
      rating: number | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }

    interface IItemPublicResponseProps {
      id: number
      itemName: string
      subtitle: string | null
      category: string
      itemImgUrl: string | null
      itemUrl: string | null
      rating: number | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }

    interface IGeneralItemResponseProps {
      id: number
      itemName?: string | null
      listId: number
      subtitle: string | null
      category: string
      itemImgUrl: string | null
      itemUrl: string | null
      rating: number | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }

    interface IPaginatedItemsResponse {
      items: models.list.IGeneralItemResponseProps[]
      pageNumber: number
      pageSize: number
      totalItems: number
      totalPages: number
    }

    interface IItemCreateRequest {
      itemName: string
      subtitle?: string
      category?: string
      itemImgUrl: string | null
      itemUrl: string | null
      rating: number | null
      notes: string
    }

    interface IItemUpdateRequest {
      itemName: string
      subtitle?: string
      category?: string
      itemImgUrl: string | null
      itemUrl: string | null
      rating: number | null
      notes: string
    }
  }

  namespace user {
    interface IUserSearchResultProps {
      id: string
      username: string
      firstName: string
      lastName: string
      profileImgUrl: string
    }

    interface IPaginatedUserResponse {
      users: models.list.IUserSearchResultProps[]
      pageNumber: number
      pageSize: number
      totalItems: number
      totalPages: number
    }

    interface IUserProfileResponseProps {
      id: string
      username: string
      firstName: string
      lastName: string
      profileImgUrl: string | null
      isFollowingCurrentUser: bool | null
      isFollowedByCurrentUser: bool | null
      followersCount: number
      followingsCount: number
      listCount: number
    }
  }

  namespace form {
    interface IListCreateFormProps {
      title: string
      subtitle: string
      listType: models.list.ListType | ''
      visibility: 'public' | 'private' | ''
    }

    interface IListEditFormProps {
      title: string
      subtitle: string
      listType: models.list.ListType | ''
      visibility: 'public' | 'private' | ''
    }

    interface IItemCreateFormProps {
      itemName: string
      subtitle: string
      category: string
      itemImgUrl: string
      itemUrl: string
      rating: number
      notes: string
    }

    interface IItemEditFormProps {
      itemName: string
      subtitle: string
      category: string
      itemImgUrl: string
      itemUrl: string
      rating: number
      notes: string
    }

    // type ItemCreateUpdateFormPropsType =
    //   | IItemCreateFormProps
    //   | IItemEditFormProps
  }
}
