import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId, lastPage = false }) {
  const { isCheckingOut, checkout } = useCheckout()

  const navigate = useNavigate()

  function handleClick() {
    checkout(bookingId, {
      onSettled: () => {
        if (lastPage)  navigate(-1)
      }
    })

  }

  return (
    <Button 
      $variation="primary" 
      $size="small" 
      onClick={handleClick}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
