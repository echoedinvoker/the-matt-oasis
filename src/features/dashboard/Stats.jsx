import Spinner from "../../ui/Spinner"
import Stat from "./Stat"
import { useRecentBookings } from "./useRecentBookings"
import { useRecentStays } from "./useRecentStays"
import { HiOutlineBriefcase, HiOutlineBanknotes, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2"
import { formatCurrency } from '../../utils/helpers'
import { useCabins } from "../cabins/useCabins"

function Stats() {
  const { isLoading: isLoading1, bookings } = useRecentBookings()
  const { isLoading: isLoading2, confirmedStays, numDays } = useRecentStays()
  const { isLoading: isLoading3, cabins } = useCabins()

  const numBookings = bookings?.length
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0)
  const checkins = confirmedStays?.length
  const numStayNights = confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0)
  const totalNights = numDays * cabins?.length
  const occupancy = numStayNights / totalNights

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />

  return <>
    <Stat title="Bookings" color="blue" icon={
      <HiOutlineBriefcase />
    } value={numBookings} />

    <Stat title="Sales" color="green" icon={
      <HiOutlineBanknotes />
    } value={formatCurrency(sales)} />
    
    <Stat title="Check ins" color="indigo" icon={
      <HiOutlineCalendarDays />
    } value={checkins} />

    <Stat title="Occupancy rate" color="yellow" icon={
      <HiOutlineChartBar />
    } value={`${Math.round(occupancy * 100)}%`} />
  </>
}

export default Stats
