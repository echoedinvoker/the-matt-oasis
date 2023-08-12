import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookingsByDates() {
  const [searchParams] = useSearchParams()
  const startDate = searchParams.get('start')
  const endDate = searchParams.get('end')
  
  const { data: { data: bookings, count } = {}, isLoading, error } = useQuery({
    queryKey: ['booking', startDate, endDate],
    queryFn: () => getBookings({ startDate, endDate })
  })

  return { bookings, isLoading, error, count }
}
