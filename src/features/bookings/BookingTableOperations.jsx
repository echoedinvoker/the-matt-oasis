import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { useUser } from "../authentication/useUser";
import Spinner from "../../ui/Spinner";

function BookingTableOperations() {
  const { user, isLoading } = useUser()

  if (isLoading) return <Spinner />

  const { user_metadata: { role } } = user
  const isGuest = role === 'guest'

  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={isGuest
          ? [
            { value: "all", label: "All" },
            { value: "checked-in", label: "Checked in" },
            { value: "unconfirmed", label: "Unconfirmed" },
          ]
          : [
            { value: "all", label: "All" },
            { value: "checked-out", label: "Checked out" },
            { value: "checked-in", label: "Checked in" },
            { value: "unconfirmed", label: "Unconfirmed" },
          ]
        }
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
