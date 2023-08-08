import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getBooking } from "../../services/apiBookings"

export function useBooking() {
  const { id } = useParams()

  const { isLoading, data: booking, error } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBooking(id)
  })

  return { isLoading, booking, error }
}
