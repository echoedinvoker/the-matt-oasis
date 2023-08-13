import Slider from "react-slick"
import { useCabins } from "./useCabins"
import Spinner from "../../ui/Spinner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBookingsByDates } from "../bookings/useBookingsByDates";

const ImageWrapper = styled.div`
  /* overflow: hidden; */
`

const Image = styled.img`
  position: relative;
  width: 90%;
  margin: 2.4rem auto;
  border-radius: 10px;
  box-shadow: 0 2px 2px var(--color-grey-300);
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
const Box = styled.div`
  max-width: 88rem;
  margin: 2.4rem auto;
`
// const Dot = styled.div`
//   position: absolute;
//   width: 10rem; /* 圓形的大小 */
//   height: 10rem;
//   color: red;
//   border: 0.8rem solid red;
//   border-radius: 50%; /* 圓形 */
//   position: absolute;
//   top: 18rem;
//   right: 30%;
//   z-index: 1111;
//   opacity: 50%;
//   text-align: center;
//   line-height: 8rem;
//   font-size: 3.4rem;
//   font-weight: bold;
//   transform: rotate(-30deg);
// `


function CabinSlick({onChange}) {
  const { cabins, isLoading } = useCabins()
  const navigate = useNavigate()
  const { bookings, isLoading: isLoading2 } = useBookingsByDates()
  if (isLoading || isLoading2) return <Spinner />
  const bookingNames = bookings.map(booking => booking.cabins.name)
  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    onInit: () => {
      onChange(cabins[0].id)
    },
    afterChange: (e) => {
      onChange(cabins[e].id)
    }
  };
  return (
    <Box>
    {/* <Dot>-17%</Dot> */}
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
    </Box>
  )
}

export default CabinSlick

