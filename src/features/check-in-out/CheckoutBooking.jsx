import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import CheckoutButton from "./CheckoutButton";
import Modal from "../../ui/Modal";
import ConfirmCheckout from "./ConfirmCheckout";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckoutBooking() {
  const { booking, isLoading } = useBooking()
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />

  const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights, } = booking;



  return (
    <Modal>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal.Open opens="check-out">
          <Button $variation="primary">
            Check out
          </Button>
        </Modal.Open>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
      <Modal.Window name="check-out">
        <ConfirmCheckout bookingId={bookingId} />
      </Modal.Window>
    </Modal>
  );
}

export default CheckoutBooking;
