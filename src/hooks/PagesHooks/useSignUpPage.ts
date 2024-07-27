import { useForm } from 'react-hook-form'
import { useAuth } from '../useAuth'

type SignUpFormProps = {
  username: string
  password: string
  confirmPassword: string
  email: string
  firstName: string
  lastName: string
}

const useSignUpPage = () => {
  const { register, registerError, registerIsPending } = useAuth()

  const { control, handleSubmit } = useForm<SignUpFormProps>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
    },
  })

  const onSubmit = async (data: SignUpFormProps) => {
    register(data)
  }

  return {
    registerError,
    registerIsPending,
    handleSubmit: handleSubmit(onSubmit),
    control,
  }
}

export default useSignUpPage
