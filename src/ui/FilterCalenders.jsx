import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const labelTypes = {
  default: css``,
  danger: css`
    color: var(--color-grey-100);
  `,
}

const Label = styled.label`
  font-weight: 500;
  ${(props) => labelTypes[props.type]}
`;

const Input = styled.input`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
    props.type === "white"
      ? "var(--color-grey-100)"
      : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  &::-webkit-calendar-picker-indicator {
  filter: invert(1);
`;

const BoxTypes = {
  default: css`
    background-color: var(--color-grey-0);
  `,
  danger: css`
    background-color: var(--color-red-700);
  `,
}

const Box = styled.div`
  /* Box */
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.2rem;
  /* flex: 0 1 96rem; */
  text-align: center;
  ${(props) => BoxTypes[props.type]}
`;
const Grid = styled.div`
  max-width: 52rem;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1.4fr;
  gap: 0.8rem;
`

function FilterCalender({ type = 'default' }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const startParam = searchParams.get('start')
  const endParam = searchParams.get('end')

  const today = new Date().toISOString().split('T')[0]
  const today2 = new Date()
  today2.setDate(today2.getDate() + 1)
  const tomorrow = today2.toISOString().split('T')[0]

  const start = startParam || today
  const end = endParam || tomorrow

  useEffect(function() {
    if (!startParam) {
      searchParams.set('start', today)
      setSearchParams(searchParams)
    }
  }, [startParam, searchParams])
  useEffect(function() {
    if (!endParam) {
      searchParams.set('end', tomorrow)
      setSearchParams(searchParams)
    }
  }, [endParam, searchParams])

  function handleStart(e) {
    searchParams.set('start', e.target.value)
    setSearchParams(searchParams)
  }
  function handleEnd(e) {
    searchParams.set('end', e.target.value)
    setSearchParams(searchParams)
  }

  return (
    <Box type={type}>
      <Grid>
        <Label type={type}>Start date</Label>
        <Input type="date" name="start" value={start} onChange={handleStart} />
        <Label type={type}>End date</Label>
        <Input type="date" name="end" value={end} onChange={handleEnd} />
      </Grid>
    </Box>
  )
}

export default FilterCalender
