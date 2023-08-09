import styled from "styled-components";
import CheckoutButton from "./CheckoutButton";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

const StyledConfirmCheckout = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmCheckout({ bookingId, disabled, onCloseModal }) {
  return (
    <StyledConfirmCheckout>
      <Heading as="h3">Confirm checking out</Heading>
      <p>
        Are you sure you want to checkout this booking permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          $variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <CheckoutButton bookingId={bookingId} lastPage />
      </div>
    </StyledConfirmCheckout>
  );
}

export default ConfirmCheckout;
