import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useParams, useSearchParams } from "react-router-dom";

export function useBookingsByDates() {
  const [searchParams] = useSearchParams()
  const { id: cabinId } = useParams()
  const startDate = searchParams.get('start')
  const endDate = searchParams.get('end')
  
  const { data: { data: bookings, count } = {}, isLoading, error } = useQuery({
    queryKey: ['booking', startDate, endDate, cabinId],
    queryFn: () => getBookings({ startDate, endDate, cabinId })
  })

  return { bookings, isLoading, error, count }
}
