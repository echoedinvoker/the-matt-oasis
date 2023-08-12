import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Label = styled.label`
  font-weight: 500;
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

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.2rem;
  /* flex: 0 1 96rem; */
  text-align: center;
`;
const Grid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1.4fr;
  gap: 0.8rem;
`

function FilterCalender() {
  const [searchParams, setSearchParams] = useSearchParams()

  const start = searchParams.get('start') || new Date().toISOString().split('T')[0]
  const end = searchParams.get('end') || new Date().toISOString().split('T')[0]

  function handleStart(e) {
    searchParams.set('start', e.target.value)
    setSearchParams(searchParams)
  }
  function handleEnd(e) {
    searchParams.set('end', e.target.value)
    setSearchParams(searchParams)
  }

  return (
    <Box>
      <Grid>
        <Label>Start date</Label>
        <Input type="date" name="start" value={start} onChange={handleStart} />
        <Label>End date</Label>
        <Input type="date" name="end" value={end} onChange={handleEnd} />
      </Grid>
    </Box>
  )
}

export default FilterCalender
