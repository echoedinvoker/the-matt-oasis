import { useNavigate, useSearchParams } from "react-router-dom"
import Button from "../../ui/Button"

function BookingButton({ id }) {
  const navigate = useNavigate()
  const [searchParam] = useSearchParams()

  return <Button 
    $variation='secondary' 
    onClick={() =>
      navigate(`/cabins/${id ? id : Number(searchParam.get(id))}`)}
  >
    Booking
  </Button>
}

export default BookingButton
