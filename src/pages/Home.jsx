import { useEffect, useState } from "react"
import CabinSlick from "../features/cabins/CabinSlick"
import ActivitiesSlider from "../ui/ActivitiesSlider"
import { useCabins } from "../features/cabins/useCabins"
import Spinner from "../ui/Spinner"
import { styled } from "styled-components"
import Description from "../ui/Description"

// const Description = styled.p`
//   font-family: 'Georgia', serif;
//   font-size: 18px; /* 或其他合適的大小 */
//   line-height: 1.5; /* 調整行高 */
//   font-style: italic;
//   color: var(--color-grey-500);
// `

function Home() {
  const { cabins, isLoading } = useCabins()
  const [cabinId, setCabinId] = useState(0)
  // const [displayedText, setDisplayedText] = useState('')
  // const [index, setIndex] = useState(0)

  if (isLoading) <Spinner />

  const description = cabinId > 0 && cabins?.find(cabin => cabin.id === cabinId).description

  // useEffect(() => {
  //   setDisplayedText(''); // 重置顯示的文字
  //   setIndex(0); // 重置索引
  // }, [description]);

  // useEffect(() => {
  //   if (index < description.length) {
  //     const timer = setTimeout(() => {
  //       setDisplayedText(prevText => prevText + description[index])
  //       setIndex(prevIndex => prevIndex + 1)
  //     }, 100)

  //     return () => clearTimeout(timer)
  //   }

  // }, [index, description])

  return (
    <>
      <CabinSlick onChange={setCabinId} />
      <ActivitiesSlider />
      <Description text={description} />
    </>
  )
}

export default Home
