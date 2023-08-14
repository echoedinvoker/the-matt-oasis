import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useUser } from "../authentication/useUser";

export function useCurrentUserBookings() {
  const { user: { user_metadata: { guestId }} } = useUser()

  const { data: { data: bookings } = {}, isLoading, error } = useQuery({
    queryKey: ['booking', guestId],
    queryFn: () => getBookings({ guestId })
  })

  return { bookings, isLoading, error }
}
