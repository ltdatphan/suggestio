import { Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'
import SubmitButton from '../components/Button/SubmitButton'
import Input from '../components/Form/FormComponents/Input'
import useSignUpPage from '../hooks/PagesHooks/useSignUpPage'
import usePageTitle from '../hooks/usePageTitle'
import Logo from '/suggestio.svg'

const SignUpPage = () => {
  usePageTitle('Sign up')
  const { registerError, registerIsPending, handleSubmit, control } =
    useSignUpPage()

  return (
    <section className="flex h-screen w-full justify-center bg-primary-white px-10 pt-10">
      <div className="w-full max-w-80">
        <img src={Logo} alt="Suggestio Logo" className="mb-6 h-12 w-auto" />
        <h1 className="text-4xl">Create an account</h1>
        <h2 className="mb-6 font-extralight">Please enter your info</h2>
        <form onSubmit={handleSubmit}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'First name is required' }}
            render={({
              field: { name, onChange, value },
              fieldState: { error },
            }) => (
              <Input
                label="First Name"
                type="text"
                name={name}
                onChange={onChange}
                value={value}
                error={error}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Last name is required' }}
            render={({
              field: { name, onChange, value },
              fieldState: { error },
            }) => (
              <Input
                label="Last Name"
                type="text"
                name={name}
                onChange={onChange}
                value={value}
                error={error}
              />
            )}
          />
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Username is required' }}
            render={({
              field: { name, onChange, value },
              fieldState: { error },
            }) => (
              <Input
                label="Username"
                type="text"
                name={name}
                onChange={onChange}
                value={value}
                error={error}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({
              field: { name, onChange, value },
              fieldState: { error },
            }) => (
              <Input
                label="Email"
                type="email"
                name={name}
                onChange={onChange}
                value={value}
                error={error}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({
              field: { name, onChange, value },
              fieldState: { error },
            }) => (
              <Input
                label="Password"
                type="password"
                name={name}
                onChange={onChange}
                value={value}
                error={error}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Confirm password is required',
              validate: (value, formValues) =>
                value === formValues.password || 'Passwords do not match',
            }}
            render={({
              field: { name, onChange, value },
              fieldState: { error },
            }) => (
              <Input
                label="Confirm Password"
                type="password"
                name={name}
                onChange={onChange}
                value={value}
                error={error}
              />
            )}
          />

          <div className="mb-6 flex w-full justify-end">
            <Link
              to="/"
              className="text-sm font-medium text-gray-400 hover:text-gray-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          {registerError?.message && (
            <div className="mb-4 text-sm text-red-500">
              {registerError?.message}
            </div>
          )}
          <SubmitButton isLoading={registerIsPending}>Sign up →</SubmitButton>
        </form>
        <div className="mt-4 flex w-full justify-center">
          <span className="text-sm font-medium text-gray-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-custom-orange-500 hover:text-custom-orange-400 hover:underline"
            >
              Log in
            </Link>
          </span>
        </div>
      </div>
    </section>
  )
}

export default SignUpPage
