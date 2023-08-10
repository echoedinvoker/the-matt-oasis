import styled, { css } from 'styled-components';

const aligns = {
  end: css`
    justify-content: flex-end;
  `,
  center: css`
    justify-content: center;
  `,
}

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  ${(props) => aligns[props.$align]}
`;

ButtonGroup.defaultProps = {
  $align: "end",
};

export default ButtonGroup;
