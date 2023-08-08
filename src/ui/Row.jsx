import { css, styled } from "styled-components";

const type = {
  horizontal: css`
    justify-content: space-between;
    align-items: center;
  `,
  vertical: css`
    flex-direction: column;
    gap: 1.6rem
  `
} 

const Row = styled.div`
  display: flex;
  ${props => type[props.type]}
`

Row.defaultProps = {
  type: 'vertical'
}

export default Row

