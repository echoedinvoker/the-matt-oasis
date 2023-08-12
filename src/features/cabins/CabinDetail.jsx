import styled, { css } from "styled-components";

import BookingDataBox from "./BookingDataBox";
// import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import { useBooking } from "../bookings/useBooking";
import { useDeleteBooking } from "../bookings/useDeleteBooking";
import { useCabin } from "./useCabin";
import { HiBanknotes, HiCog, HiMiniBanknotes, HiMiniInbox, HiUserPlus, HiUsers } from "react-icons/hi2";
import BookingForm from "./BookingForm";

const StyledCabinDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
`
const Image = styled.img`
  max-width: 52rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: 1px solid var(--color-grey-100);
  align-self: flex-start;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const gaps = {
  small: css`
    gap: 0.8rem
  `,
  large: css`
    gap: 3.2rem
  `
}
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => gaps[props.$gap]}
`

Row.defaultProps = {
  $gap: "small",
};

const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem
`;

const Value = styled.div`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
`;

const Description = styled.div`
  margin-top: 2.4rem;
  font-style: italic; 
  font-weight: 300;   
  font-size: 1.2rem;    
  line-height: 1.7;   /* 行高，增加可讀性 */
  margin: 10px
`;

const BookingButton = styled(Button)`
  margin-left: 2rem
`

function CabinDetail() {

  const { cabin, isLoading } = useCabin()

  if (isLoading) return <Spinner />

  const { id, image, name, maxCapacity, regularPrice, discount, description } = cabin[0]

  return <Modal>
    <StyledCabinDetail>
      <Row $gap='large'>
        <Image src={image} alt={`image of ${name}`} />
        <Details>
          <Row>
            <Heading as='h2'>{name}</Heading>
            <Modal.Open opens="booking">
              <BookingButton $size="large">Booking</BookingButton>
            </Modal.Open>
          </Row>
          <Row>
            <Label><HiUsers /><span>Max capacity</span>&ndash;</Label>
            <Value>{maxCapacity}</Value>
          </Row>
          <Row>
            <Label><HiBanknotes /><span>Regular Pirce</span>&ndash;</Label><Value>{regularPrice}</Value>
          </Row>
          <Row>
            <Label><HiMiniBanknotes /><span>Discount</span>&ndash;</Label><Value>{discount}</Value>
          </Row>
          <Row>
            <Description>{description}</Description>
          </Row>
        </Details>
      </Row>
    </StyledCabinDetail>
    <Modal.Window name="booking">
      <BookingForm id={id} maxCapacity={maxCapacity} discount={discount} regularPrice={regularPrice} />
    </Modal.Window>
  </Modal>
  // const moveBack = useMoveBack();
  // const navigate = useNavigate()
  // const { checkout, isCheckingOut } = useCheckout()
  // const { deleteBooking, isDeleting } = useDeleteBooking()

  // const statusToTagName = {
  //   unconfirmed: "blue",
  //   "checked-in": "green",
  //   "checked-out": "silver",
  // };

  // if (isLoading) return <Spinner />
  // if (!booking) return <Empty resource='booking' />

  // const { id, status } = booking

  // return (
  //   <>
  //     <Modal>
  //       <Row type="horizontal">
  //         <HeadingGroup>
  //           <Heading as="h1">Booking #{id}</Heading>
  //           <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
  //         </HeadingGroup>
  //         <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
  //       </Row>

  //       <BookingDataBox booking={booking} />

  //       <ButtonGroup>

  //         {status === 'unconfirmed' &&
  //           <Button onClick={() => navigate(`/checkin/${id}`)}>
  //             Check in
  //           </Button>
  //         }

  //         {status === 'checked-in' &&
  //           <Button onClick={() => checkout(id)} disabled={isCheckingOut}>
  //             Check out
  //           </Button>
  //         }
  //         {status === 'checked-out' &&
  //           <Modal.Open opens="delete">
  //             <Button $variation='danger'>Delete</Button>
  //           </Modal.Open>
  //         }
  //         <Button $variation="secondary" onClick={moveBack}>Back</Button>
  //       </ButtonGroup>
  //       <Modal.Window name="delete">
  //         <ConfirmDelete resourceName="booking" onConfirm={() => deleteBooking(id, { onSuccess: () => navigate(-1) })} disabled={isDeleting} />
  //       </Modal.Window>
  //     </Modal>
  //   </>
  // );
}

export default CabinDetail;
