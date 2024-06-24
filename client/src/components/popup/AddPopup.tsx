import styled from 'styled-components';
import themes, { FlexColumn, FlexRow, PopupLine, PopupLineWrapper, PopupWrapper } from '../../styles/themes';
import pragraphImg from '../../assets/images/sub_pragraph.png';
import header1Img from '../../assets/images/sub_header1.png';
import header2Img from '../../assets/images/sub_header2.png';
import header3Img from '../../assets/images/sub_header3.png';
import unOrderListImg from '../../assets/images/sub_unorder_list.png';
import orderListImg from '../../assets/images/sub_order_list.png';
import codeImg from '../../assets/images/sub_code.png';
import quoteImg from '../../assets/images/sub_quote.png';
import CustomPopupImage from './CustomPopupImage';
import PreviewPopup from './PreviewPopup';
import { useState } from 'react';

const { WeakColor, BackgroudColor } = themes.Color;

interface SubPopupProps {
  $left: number;
}
export interface PopupContent {
  img: string;
  optionTitle: string;
  description: string;
}
export type PopupContentItem = { [key: string]: PopupContent };
export const subPopupContents: { [key: string]: PopupContent } = {
  paragraph: { img: pragraphImg, optionTitle: '텍스트', description: '일반 텍스트를 사용해 쓰기를 시작하세요.' },
  Header1: { img: header1Img, optionTitle: '제목1', description: '섹션 제목(대)' },
  Header2: { img: header2Img, optionTitle: '제목2', description: '섹션 제목(중)' },
  Header3: { img: header3Img, optionTitle: '제목3', description: '섹션 제목(소)' },
  unOrderList: {
    img: unOrderListImg,
    optionTitle: '글머리 기호 목록',
    description: '간단한 글머리 기호 목록을 생성하세요.',
  },
  orderList: { img: orderListImg, optionTitle: '번호 매기기 목록', description: '번호가 매겨진 목록을 생성하세요.' },
  code: { img: codeImg, optionTitle: '코드', description: '코드 스니펫을 작성하세요.' },
  quote: { img: quoteImg, optionTitle: '인용', description: '인용문을 작성하세요.' },
};

export default function AddPopup({ $left = 40 }) {
  const [isShowPreviewPopup, setIsShowPreviewPopup] = useState<boolean>(false);
  const [previewType, setPreviewType] = useState<string>('');
  const [previewTop, setPreviewTop] = useState<number>(0);

  const handlePreview = (key: string, { clientY }: React.MouseEvent) => {
    setPreviewType(key);
    setIsShowPreviewPopup(true);
    setPreviewTop(clientY - 55);
  };

  const handleMouseLeave = () => {
    setPreviewType('');
    setIsShowPreviewPopup(false);
  };

  return (
    <>
      <SubPopupWrapper $left={$left}>
        <Scroll>
          <PopupHeadLineWrapper>
            <span>기본 블록</span>
          </PopupHeadLineWrapper>

          {Object.keys(subPopupContents).map((key) => {
            const { img, optionTitle, description } = subPopupContents[key];
            return (
              <PopupLineWrapper key={key}>
                <AddPopupLine onMouseEnter={(e) => handlePreview(key, e)} onMouseLeave={handleMouseLeave}>
                  <FlexRow>
                    <PopupImgWrapper>
                      <CustomPopupImage width={46} height={46} src={img} />
                    </PopupImgWrapper>
                    <PopupItemWrapper>
                      <ItemWrapper>
                        <Item className="optionTitle">{optionTitle}</Item>
                        <Item className="description">{description}</Item>
                      </ItemWrapper>
                    </PopupItemWrapper>
                  </FlexRow>
                </AddPopupLine>
              </PopupLineWrapper>
            );
          })}
        </Scroll>
      </SubPopupWrapper>
      {isShowPreviewPopup && previewType && <PreviewPopup $left={365} $top={previewTop} previewType={previewType} />}
    </>
  );
}
const PopupHeadLineWrapper = styled.div`
  margin: 10px;
  font-size: 13px;
  color: ${WeakColor};
`;

const Scroll = styled.div`
  height: 300px;
  overflow: auto;
`;

const AddPopupLine = styled(PopupLine)`
  height: 55px;
`;

const ItemWrapper = styled(FlexColumn)`
  justify-content: center;
  height: 100%;
`;

const Item = styled(FlexColumn)`
  justify-content: center;
  height: 100%;
`;

export const PopupImgWrapper = styled(FlexColumn)`
  justify-content: center;
  align-items: center;
`;

const PopupItemWrapper = styled(PopupImgWrapper)`
  align-items: start;

  & .optionTitle {
    margin-left: 15px;
  }

  & .description {
    color: ${WeakColor};
    margin-left: 15px;
    width: 230px;
    font-size: 12px;
  }
`;

const SubPopupWrapper = styled(PopupWrapper)<SubPopupProps>`
  min-width: 350px;
  max-width: 350px;
  position: absolute;
  top: 45px;
  left: ${({ $left }) => $left}px;
  background-color: ${BackgroudColor};
  z-index: 2;
`;
