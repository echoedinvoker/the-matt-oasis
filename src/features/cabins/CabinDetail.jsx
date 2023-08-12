import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function CabinDetail() {
  // const { booking = {}, isLoading } = useBooking()
  const { booking, isLoading } = useBooking()
  // const { id, status } = booking

  const moveBack = useMoveBack();
  const navigate = useNavigate()
  const { checkout, isCheckingOut } = useCheckout()
  const { deleteBooking, isDeleting } = useDeleteBooking()

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />
  if (!booking) return <Empty resource='booking' />

  const { id, status } = booking

  return (
    <>
      <Modal>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{id}</Heading>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />

        <ButtonGroup>

          {status === 'unconfirmed' &&
            <Button onClick={() => navigate(`/checkin/${id}`)}>
              Check in
            </Button>
          }

          {status === 'checked-in' &&
            <Button onClick={() => checkout(id)} disabled={isCheckingOut}>
              Check out
            </Button>
          }
          {status === 'checked-out' &&
            <Modal.Open opens="delete">
              <Button $variation='danger'>Delete</Button>
            </Modal.Open>
          }
          <Button $variation="secondary" onClick={moveBack}>Back</Button>
        </ButtonGroup>
        <Modal.Window name="delete">
          <ConfirmDelete resourceName="booking" onConfirm={() => deleteBooking(id, { onSuccess: () => navigate(-1) })} disabled={isDeleting} />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default CabinDetail;
