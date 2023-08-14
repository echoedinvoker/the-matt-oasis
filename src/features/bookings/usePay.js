import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi} from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function usePay() {
  const queryClient = useQueryClient()
  const { mutate: pay, isLoading: isPaying } = useMutation({
    mutationFn: (id) => updateBookingApi(id, { 'isPaid': true }),
    onSuccess: () => {
      toast.success(`Booking has been successfully paid for`)
      queryClient.invalidateQueries({ active: true })
    },
    onError: (err) => {
      console.log(err.message)
      toast.error('Payment failed')
    }
  })

  return { pay, isPaying }
}
