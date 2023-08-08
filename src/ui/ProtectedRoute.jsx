import { useUser } from "../features/authentication/useUser"
import styled from "styled-components";
import Spinner from "./Spinner"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`


function ProtectedRoute({ children }) {
  // 1. Load the authenticated user
  const { isLoading, user } = useUser()
  const navigate = useNavigate()

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(() => {
    if (!user || (user.role !=='authenticated' && !isLoading)) {
      navigate("/login")
    }

  }, [user, isLoading, navigate])

  // 3. While loading, show a spinner
  if (isLoading) return <FullPage>
    <Spinner />
  </FullPage>


  // 4. If there IS a user, render the app

  return children
}

export default ProtectedRoute
