import Filter from "../../ui/Filter";
import FilterCalender from "../../ui/FilterCalenders";
import SortBy from "../../ui/SortBy";
import Spinner from "../../ui/Spinner";
import TableOperations from "../../ui/TableOperations";
import { useUser } from "../authentication/useUser";

function CabinTableOperations() {
  const { isLoading, user } = useUser()

  if (isLoading) return <Spinner />

  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No discount' },
          { value: 'with-discount', label: 'With discount' },
        ]}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name (A-Z)' },
          { value: 'name-desc', label: 'Sort by name (Z-A)' },
          { value: 'regularPrice-asc', label: 'Sort by price (low first)' },
          { value: 'regularPrice-desc', label: 'Sort by price (high first)' },
          { value: 'maxCapacity-asc', label: 'Sort by capacity (low first)' },
          { value: 'maxCapacity-desc', label: 'Sort by capacity (high first)' },
        ]}
      />
      {user.user_metadata?.role === 'guest' &&
        <FilterCalender />
      }
    </TableOperations>
  )
}

export default CabinTableOperations
