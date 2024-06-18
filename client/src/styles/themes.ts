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

const Color = {
  DefaultColor: '#5f5e5b',
  SecondColor: '#EFEFEF',
  WeakColor: '#91918e',
  SubmitColor: '#fff',
  BoxBackground: '#f3f4f6',
  SubmitBackground: 'blue',
  ShadowColor: 'rgba(0, 0, 0, 0.377)',
  ErrorColor: 'red',
  BackgroudColor: 'white',
};

const FontSize = {
  Default: '14px',
  Small: '12px',
};

export const BoxBorder = css`
  border: 1px solid ${Color.BoxBackground};
  border-radius: 16px;
`;

export const ButtonBorder = css`
  border-radius: 4px;
`;

export const BoxBackground = css`
  background-color: ${Color.BoxBackground};
`;

export const SubmitBackground = css`
  background-color: blue;
`;

export const SideMenu = styled(RowGap)`
  ${FontSize.Default}
  ${Color.DefaultColor}

  box-sizing: border-box;
  width: 100%;
  height: 30px;
  padding: 0 8px;
  justify-content: flex-start;
  border-radius: 4px;
  &:hover {
    background-color: ${Color.SecondColor};
  }
`;

export const PopupLine = styled(FlexRow)`
  border-radius: 7px;
  padding: 0 5px;
  align-items: center;
  height: 30px;

  & .optionTitle {
    margin-left: 15px;
  }
  & .optionShortCutKey {
    color: ${Color.WeakColor};
  }
`;
export const PopupLineWrapper = styled.div`
  padding: 3px 5px;
  overflow: hidden;
`;

export const PopupWrapper = styled(FlexColumn)`
  box-sizing: border-box;
  border: 2px solid ${Color.SecondColor};
  overflow: hidden;
  border-radius: 10px;
  min-width: 250px;
  max-width: 300px;

  box-shadow: -8px 11px 39px -8px ${Color.ShadowColor};
  -webkit-box-shadow: -8px 11px 39px -8px ${Color.ShadowColor};
  -moz-box-shadow: -8px 11px 39px -8px ${Color.ShadowColor};

  ${PopupLine}:hover {
    background-color: ${Color.SecondColor};

    .deleteTitle {
      color: ${Color.ErrorColor};
    }
  }
`;

export const themes = {
  Color,
  FontSize,
};

export default themes;
