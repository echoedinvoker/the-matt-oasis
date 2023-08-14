import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { useBookingsByDates } from "../bookings/useBookingsByDates";


function CabinTable() {
  const { isLoading, cabins } = useCabins()
  const { isLoading: isLoading2, bookings } = useBookingsByDates()

  const [searchParams] = useSearchParams()

  // 1. Filter
  const filterValue = searchParams.get('discount') || 'all'

  let filteredCabins
  if (filterValue === 'all' || !filterValue) filteredCabins = cabins
  if (filterValue === 'no-discount') filteredCabins = cabins?.filter(cabin => !cabin.discount)
  if (filterValue === 'with-discount') filteredCabins = cabins?.filter(cabin => !!cabin.discount)

  // 2. Dates filter
  const startDate = searchParams.get('start')
  const endDate = searchParams.get('end')
  if (startDate && endDate) {
    const bookedCabins = bookings?.map(booking => booking.cabins.name)
    filteredCabins = filteredCabins?.filter(cabin => !bookedCabins?.includes(cabin.name))
  }

  // 3. Sorter
  const sortBy = searchParams.get('sortBy') || 'name-asc'

  const [field, direction] = sortBy.split('-')
  const modifier = direction === 'asc' ? 1 : -1
  const sortedCabins = filteredCabins?.sort((a, b) => (a[field] - b[field]) * modifier ) 


  if (isLoading || isLoading2) return <Spinner />

  return <Menus>
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 2fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body data={sortedCabins} render={cabin => <CabinRow cabin={cabin} key={cabin.id} />} />
    </Table>


  </Menus>
}

export default CabinTable

