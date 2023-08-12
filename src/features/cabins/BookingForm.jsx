import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../ui/Modal";
import FilterCalender from "../../ui/FilterCalenders";
import Select from "../../ui/Select";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import Checkbox from "../../ui/Checkbox";
import { useSettings } from "../settings/useSettings";
import { useState } from "react";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { differenceInDays, parseISO } from "date-fns";
import styled from "styled-components";
import Textarea from "../../ui/Textarea";
import { useUser } from "../authentication/useUser";
import { useCreateBooking } from "../bookings/useCreateBooking";
import Heading from "../../ui/Heading";




// Email regex: /\S+@\S+\.\S+/

function BookingForm({ id: cabinId, maxCapacity, discount, regularPrice }) {
  const [numGuests, setNumGuests] = useState(maxCapacity)
  const [hasBreakfast, setHasBreakfast] = useState(false)
  const [remarks, setRemarks] = useState('')
  const options = Array.from({ length: maxCapacity }, (_, i) => ({ label: (i + 1).toString(), value: i + 1 }));
  const { settings, isLoading } = useSettings()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { isCreating, createBooking } = useCreateBooking()

  const { user: { user_metadata: { guestId } } } = useUser()
  const startDate = searchParams.get('start')
  const endDate = searchParams.get('end')
  const numNights = differenceInDays(parseISO(endDate), parseISO(startDate)) || 1

  if (isLoading) return <Spinner />

  const optionalBreakfastPrice = hasBreakfast ? settings.breakfastPrice * numGuests * numNights : 0
  const totalPrice = regularPrice + optionalBreakfastPrice


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
      <FilterCalender />
      <FormRow type='booking' label="Number of Guests">
        <Select 
          options={options} 
          value={numGuests} 
          onChange={(e) => setNumGuests(Number(e.target.value))} 
          disabled={isCreating}
        />
      </FormRow>
      <FormRow type='booking' label="Need breakfast ?">
        <Checkbox 
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
          $type='booking'
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow
        label="Total Price"
      >
        <Heading as='h4'>{totalPrice}</Heading>
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
        <Button disabled={isCreating}>Confirm booking</Button>
      </FormRow>
    </Form>
  );
}

export default BookingForm;
