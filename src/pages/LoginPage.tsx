import { Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'
import SubmitButton from '../components/Button/SubmitButton'
import Input from '../components/Form/FormComponents/Input'
import useLoginPage from '../hooks/PagesHooks/useLoginPage'
import usePageTitle from '../hooks/usePageTitle'
import Logo from '/suggestio.svg'

const LoginPage = () => {
  usePageTitle('Login')
  const { loginError, loginIsPending, handleSubmit, control } = useLoginPage()

  return (
    <section className="flex h-screen w-full justify-center bg-primary-white px-10 pt-10">
      <div className="w-full max-w-80">
        <img src={Logo} alt="Suggestio Logo" className="mb-6 h-12 w-auto" />
        <h1 className="text-4xl">Welcome back!</h1>
        <h2 className="mb-6 font-extralight">Please enter your info</h2>
        <form onSubmit={handleSubmit}>
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

          <div className="mb-6 flex w-full justify-end">
            <Link
              to="/"
              className="text-sm font-medium text-gray-400 hover:text-gray-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          {loginError?.message && (
            <div className="mb-4 text-sm text-red-500">
              {loginError?.message}
            </div>
          )}
          <SubmitButton isLoading={loginIsPending}>Login →</SubmitButton>
        </form>
        <div className="mt-4 flex w-full justify-center">
          <span className="text-sm font-medium text-gray-500">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-custom-orange-500 hover:text-custom-orange-400 hover:underline"
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
