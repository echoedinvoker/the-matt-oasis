
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getCabin } from "../../services/apiCabins"

export function useCabin() {
  const { id } = useParams()

  const { isLoading, data: cabin, error } = useQuery({
    queryKey: ['cabin', id],
    queryFn: () => getCabin(id),
    onSuccess: () => console.log('success'),
    onError: () => console.log('error')
  })

  return { isLoading, cabin, error }
}
