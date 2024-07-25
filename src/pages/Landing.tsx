import { Navigate } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'

const Landing = () => {
  usePageTitle('Suggestio')
  return <Navigate to="/login" />
}

export default Landing
