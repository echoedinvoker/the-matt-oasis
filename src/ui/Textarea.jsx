import styled, { css } from "styled-components";

const types = {
  default: css`
    width: 100%;
  `,
  booking: css`
    width: 24rem;
`
}
const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  height: 8rem;
  ${(props) => types[props.$type]}
`;

Textarea.defaultProps = {
  $type: "default",
};

export default Textarea;
