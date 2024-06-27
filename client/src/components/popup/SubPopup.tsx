import styled from 'styled-components';
import { CheckOutlined } from '@ant-design/icons';
import { FlexColumn, FlexRow, PopupLine, PopupLineWrapper, PopupWrapper } from '@/styles/themes';
import { themes } from '@/styles/themes';
import { subPopupContents } from './AddPopup';
import PreviewPopup from './PreviewPopup';
import { useState } from 'react';

const { BackgroudColor, WeakColor } = themes.Color;

interface SubPopupProps {
  $left: number;
}

export default function SubPopup({ $left = 10, usedType = 'paragraph' }) {
  const [isShowPreviewPopup, setIsShowPreviewPopup] = useState<boolean>(false);
  const [previewType, setPreviewType] = useState<string>('');
  const [previewTop, setPreviewTop] = useState<number>(0);

  const handlePreview = (key: string, index: number) => {
    setPreviewType(key);
    setIsShowPreviewPopup(true);
    setPreviewTop(index * 36 + 36);
  };

  const handleMouseLeave = () => {
    setPreviewType('');
    setIsShowPreviewPopup(false);
  };

  const getSubPopupContents = () =>
    Object.keys(subPopupContents).map((key, index) => {
      const { img, optionTitle } = subPopupContents[key];
      return (
        <PopupLineWrapper key={`sub-popup-${key}`}>
          <PopupLine onMouseEnter={() => handlePreview(key, index)} onMouseLeave={handleMouseLeave}>
            <FlexRow>
              <StyledImg src={img} />
              <Item className="optionTitle">{optionTitle}</Item>
            </FlexRow>
            {key === usedType && <CheckOutlined />}
          </PopupLine>
        </PopupLineWrapper>
      );
    });

  return (
    <>
      <SubPopupWrapper $left={$left}>{getSubPopupContents()}</SubPopupWrapper>
      {isShowPreviewPopup && previewType && <PreviewPopup $left={500} $top={previewTop} previewType={previewType} />}
    </>
  );
}

const Item = styled(FlexColumn)`
  justify-content: center;
  height: 100%;
`;

const SubPopupWrapper = styled(PopupWrapper)<SubPopupProps>`
  width: 250px;
  position: absolute;
  top: 45px;
  left: ${({ $left }) => $left}px;
  background-color: ${BackgroudColor};
  z-index: 2;
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
