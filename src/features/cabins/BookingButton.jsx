import { useNavigate, useSearchParams } from "react-router-dom"
import Button from "../../ui/Button"

function BookingButton({ id, children }) {
  const navigate = useNavigate()
  const [searchParam] = useSearchParams()

  const startDate = searchParam.get('start')
  const endDate = searchParam.get('end')

  const cabinId = id ? id : Number(searchParam.get(id))
  const queryParams = startDate && endDate ? `?start=${startDate}&end=${endDate}` : ''

  return <Button 
    $variation='secondary' 
    onClick={() => navigate(`/cabins/${cabinId}${queryParams}`)} >
    { children ? children : 'Booking'}
  </Button>
}

export default BookingButton
