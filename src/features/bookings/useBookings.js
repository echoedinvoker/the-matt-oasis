import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { useUser } from "../authentication/useUser";

export function useBookings() {
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()
  const { user: { user_metadata: { guestId }} } = useUser()

  // Filter
  const filterValue = searchParams.get('status')
  const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue }

  // Sorter
  const sortByRaw = searchParams.get('sortBy') || "startDate-desc"
  const [field, direction] = sortByRaw.split('-')
  const sortBy = { field, direction }

  // Page
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  const { data: { data: bookings, count } = {}, isLoading, error } = useQuery({
    queryKey: ['booking', filter, sortBy, page, guestId],
    queryFn: () => getBookings({ filter, sortBy, page, guestId })
  })

  const pageCount = Math.ceil(count / PAGE_SIZE) 

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['booking', filter, sortBy, page + 1, guestId],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
    })

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['booking', filter, sortBy, page - 1, guestId],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
    })

  return { bookings, isLoading, error, count }
}
