import { Navigate } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'

const LandingPage = () => {
  usePageTitle('Suggestio')
  return <Navigate to="/login" />
}

export default LandingPage
