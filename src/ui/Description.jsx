import { useEffect, useState } from "react";
import { styled } from "styled-components"

const StyledDescription = styled.p`
  font-family: 'Georgia', serif;
  font-size: 18px; 
  line-height: 1.5;
  font-style: italic;
  color: var(--color-grey-500);
`

function Description({ text }) {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)


  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prevText => prevText + text[index])
        setIndex(prevIndex => prevIndex + 1)
      }, 50)

      return () => clearTimeout(timer)
    }

  }, [index, text])

  return <StyledDescription>
    {displayedText}
  </StyledDescription>
}

export default Description
