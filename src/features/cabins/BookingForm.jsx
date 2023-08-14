import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../ui/Modal";
import FilterCalender from "../../ui/FilterCalenders";
import Select from "../../ui/Select";
import Checkbox from "../../ui/Checkbox";
import { useSettings } from "../settings/useSettings";
import { useState } from "react";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { differenceInDays, parseISO } from "date-fns";
import Textarea from "../../ui/Textarea";
import { useUser } from "../authentication/useUser";
import { useCreateBooking } from "../bookings/useCreateBooking";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { styled } from "styled-components";
import { useBookingsByDates } from "../bookings/useBookingsByDates";


const StyledRow = styled(Row)`
  width: 24rem;
  gap: 0;
  margin-left: 5rem;
`



// Email regex: /\S+@\S+\.\S+/

function BookingForm({ id: cabinId, name, maxCapacity, discount, regularPrice, coef = 1}) {
  const [numGuests, setNumGuests] = useState(maxCapacity)
  const [hasBreakfast, setHasBreakfast] = useState(false)
  const [remarks, setRemarks] = useState('')
  const options = Array.from({ length: maxCapacity }, (_, i) => ({ label: (i + 1).toString(), value: i + 1 }));
  const { settings, isLoading } = useSettings()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { isCreating, createBooking } = useCreateBooking()

  const { user: { user_metadata: { guestId } } } = useUser()
  const { bookings, isLoading: isLoading2 } = useBookingsByDates()
  const startDate = searchParams.get('start')
  const endDate = searchParams.get('end')
  const numNights = differenceInDays(parseISO(endDate), parseISO(startDate)) || 1

  const isBookable = !bookings?.map(booking => booking.cabins).map(booking => booking.name).includes(name)
  console.log(isBookable)

  if (isLoading) return <Spinner />

  const optionalBreakfastPrice = hasBreakfast ? settings.breakfastPrice * numGuests * numNights : 0
  const discountPrice = (discount ? discount : regularPrice)
  const serviceFee = (optionalBreakfastPrice + discountPrice) * 0.15
  const totalPrice = parseFloat(((discountPrice + optionalBreakfastPrice + serviceFee) * coef).toFixed(2))

  function handleSubmit(e) {
    e.preventDefault()

    const newBooking = {
      startDate,
      endDate,
      numNights,
      numGuests,
      cabinPrice: regularPrice,
      extrasPrice: optionalBreakfastPrice,
      totalPrice,
      status: 'unconfirmed',
      isPaid: false,
      observations: remarks,
      cabinId,
      guestId
    }

    createBooking(newBooking, {
      onSuccess: () => navigate('/bookings')
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FilterCalender type={isBookable ? 'default' : 'danger'}/>
      <FormRow type='booking' label="Number of Guests">
        <Select
          id="numGuests"
          options={options}
          value={numGuests}
          onChange={(e) => setNumGuests(Number(e.target.value))}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow type='booking' label="Need breakfast ?">
        <Checkbox
          id="hasBreakfast"
          checked={hasBreakfast}
          onChange={(e) => setHasBreakfast(e.target.checked)}
          disabled={isCreating}
        >
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
        </Checkbox>
      </FormRow>
      <FormRow
        label="Remarks"
      >
        <Textarea
          id="remarks"
          $type='booking'
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow
        label="Total Price"
      >
        <Row type='horizontal'>
          <Heading as='h4'>{formatCurrency(totalPrice)}</Heading>
          <StyledRow>
            <div>cabin: {formatCurrency(discountPrice)}{regularPrice === discountPrice ? '(no discount)' : `(-${Math.round(100 - discountPrice / regularPrice * 100)}%)`}</div>
            <div>extras: {formatCurrency(serviceFee + optionalBreakfastPrice)}</div>
          </StyledRow>
        </Row>
      </FormRow>


      <FormRow>
        <Modal.Close>
          <Button
            $variation="secondary"
            disabled={isCreating}
            type="button"
          >
            Cancel
          </Button>
        </Modal.Close>
        <Button 
          disabled={isCreating || !isBookable}
          $variation={isBookable ? 'primary' : 'danger'}
        >
          Confirm booking
        </Button>
      </FormRow>
    </Form>
  );
}

export default BookingForm;
