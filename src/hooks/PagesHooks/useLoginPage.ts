import { useForm } from 'react-hook-form'
import { useAuth } from '../useAuth'

type LoginFormProps = {
  username: string
  password: string
}

const useLoginPage = () => {
  const { login, loginError, loginIsPending } = useAuth()

  const { control, handleSubmit } = useForm<LoginFormProps>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormProps) => {
    login(data)
  }

  return {
    loginError,
    loginIsPending,
    handleSubmit: handleSubmit(onSubmit),
    control,
  }
}

export default useLoginPage
