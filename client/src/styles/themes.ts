import styled, { css } from 'styled-components';

export const Flex = styled.div`
  display: flex;
`;

export const FlexRow = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
`;

export const RowGap = styled(FlexRow)`
  width: fit-content;
  gap: 0.5rem;
`;

export const ColumnGap = styled(FlexColumn)`
  width: 100%;
  height: fit-content;
  gap: 0.5rem;
`;

export const WeakColor = css`
  color: #91918e;
`;

export const DefaultColor = css`
  color: #5f5e5b;
`;

export const SubmitColor = css`
  color: white;
`;

export const SmallFontSize = css`
  font-size: 12px;
`;

export const DefaultFontSize = css`
  font-size: 14px;
`;

export const BoxBackground = css`
  background-color: #f3f4f6;
`;

export const SubmitBackground = css`
  background-color: blue;
`;

export const BoxBorder = css`
  border: 1px solid #f3f4f6;
  border-radius: 16px;
`;

export const ButtonBorder = css`
  border-radius: 4px;
`;

export const SideMenu = styled(RowGap)`
  ${DefaultFontSize}
  ${DefaultColor}

  box-sizing: border-box;
  width: 100%;
  height: 30px;
  padding: 0 8px;
  justify-content: flex-start;
  border-radius: 4px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
