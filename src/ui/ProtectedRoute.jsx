import { useUser } from "../features/authentication/useUser"
import styled from "styled-components";
import Spinner from "./Spinner"
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";


const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`


function ProtectedRoute({ children }) {
  // 1. Load the authenticated user
  const { isLoading, user, isAuthenticated } = useUser()
  const navigate = useNavigate()
  const location = useLocation()

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(() => {
    console.log('test1', isLoading, user, isAuthenticated)
    if (!isLoading && !isAuthenticated ) {
      navigate("/login")
    }
  }, [user, isLoading, navigate])

  useEffect(() => {
    console.log('test2', isLoading, user, isAuthenticated)
    if (location.pathname === '/login' && !isLoading && isAuthenticated) {
      navigate("/dashboard")
    }
  }, [user, isLoading, location, navigate])

  // 3. While loading, show a spinner
  if (isLoading) return <FullPage>
    <Spinner />
  </FullPage>


  // 4. If there IS a user, render the app

  return children
}

export default ProtectedRoute
