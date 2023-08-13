import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useParams, useSearchParams } from "react-router-dom";

export function useBookingsByDates() {
  const [searchParams] = useSearchParams()
  const { id: cabinId } = useParams()

  const today = new Date().toISOString().split('T')[0]
  const today2 = new Date()
  today2.setDate(today2.getDate() + 1)
  const tomorrow = today2.toISOString().split('T')[0]

  const startDate = searchParams.get('start') || today
  const endDate = searchParams.get('end') || tomorrow
  
  const { data: { data: bookings, count } = {}, isLoading, error } = useQuery({
    queryKey: ['booking', startDate, endDate, cabinId],
    queryFn: () => getBookings({ startDate, endDate, cabinId })
  })

  return { bookings, isLoading, error, count }
}
