import styled from 'styled-components';
import { CheckOutlined } from '@ant-design/icons';
import { FlexColumn, FlexRow, PopupLine, PopupLineWrapper, PopupWrapper } from '../../styles/themes';
import { themes } from '../../styles/themes';

const { BackgroudColor, WeakColor } = themes.Color;

export default function SubPopup() {
  return (
    <SubPopupWrapper>
      <PopupLineWrapper>
        <PopupLine>
          <FlexRow>
            <StyledImg src="https://www.notion.so/images/blocks/text/ko-KR.png" />
            <Item className="optionTitle">텍스트</Item>
          </FlexRow>
          <CheckOutlined />
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <FlexRow>
            <StyledImg src="https://www.notion.so/images/blocks/header.57a7576a.png" />
            <Item className="optionTitle">제목1</Item>
          </FlexRow>
          <CheckOutlined />
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <FlexRow>
            <StyledImg src="https://www.notion.so/images/blocks/subheader.9aab4769.png" />
            <Item className="optionTitle">제목2</Item>
          </FlexRow>
          <CheckOutlined />
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <FlexRow>
            <StyledImg src="https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png" />
            <Item className="optionTitle">제목3</Item>
          </FlexRow>
          <CheckOutlined />
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <FlexRow>
            <StyledImg src="https://www.notion.so/images/blocks/bulleted-list.0e87e917.png" />
            <Item className="optionTitle">글머리 기호 목록</Item>
          </FlexRow>
          <CheckOutlined />
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <FlexRow>
            <StyledImg src="	https://www.notion.so/images/blocks/numbered-list.0406affe.png" />
            <Item className="optionTitle">번호 매기기 목록</Item>
          </FlexRow>
          <CheckOutlined />
        </PopupLine>
      </PopupLineWrapper>
    </SubPopupWrapper>
  );
}

const Item = styled(FlexColumn)`
  justify-content: center;
  height: 100%;
`;
const SubPopupWrapper = styled(PopupWrapper)`
  width: 250px;
`;
const StyledImg = styled.img`
  display: block;
  object-fit: cover;
  border-radius: 4px;
  background: ${BackgroudColor};
  width: 23px;
  height: 23px;
  border: 1px solid ${WeakColor};
`;
