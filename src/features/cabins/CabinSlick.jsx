import Slider from "react-slick"
import { useCabins } from "./useCabins"
import Spinner from "../../ui/Spinner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useBookingsByDates } from "../bookings/useBookingsByDates";

const ImageWrapper = styled.div`
  overflow: hidden;
`

const Image = styled.img`
  width: 90%;
  margin: 2.4rem auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px var(--color-grey-300);
  border: 1px solid var(--color-silver-100); /* 細邊框 */
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.$isNotBookable &&
    css`
      filter: grayscale(100%);
      pointer-events: none;
    `}
`

function CabinSlick() {
  const { cabins, isLoading } = useCabins()
  const navigate = useNavigate()
  const { bookings, isLoading: isLoading2 } = useBookingsByDates()
  if (isLoading || isLoading2) return <Spinner />
  const bookingNames = bookings.map(booking => booking.cabins.name)
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };
  return (
    <Slider {...settings}>
      {cabins.map(cabin =>
        <ImageWrapper key={cabin.id}>
          <Image
            src={cabin.image}
            alt={cabin.name}
            role="button"
            onClick={() => navigate(`/cabins/${cabin.id}`)}
            $isNotBookable={bookingNames.includes(cabin.name)}
          />
        </ImageWrapper>
      )}
    </Slider>
  )
}

export default CabinSlick

