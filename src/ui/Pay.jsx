import { usePay } from "../features/bookings/usePay"
import Button from "./Button"
import styled from "styled-components"

const StyledPay = styled(Button)`
  letter-spacing: 2px;
  text-transform: uppercase;
`
StyledPay.defaultProps = { 
  $variation: 'primary',
  children: 'pay'
}

function Pay({ id, size }) {
  const { pay, isPaying } = usePay()
  console.log('pay'+id)

  return <StyledPay $size={size} onClick={() => pay(id)} disabled={isPaying} />
}

export default Pay
