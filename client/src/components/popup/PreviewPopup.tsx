import styled from 'styled-components';
import { FlexColumn, PopupWrapper } from '@/styles/themes';
import CustomPopupImage from './CustomPopupImage';
import themes from '@/styles/themes';
import pragraphImg from '@/assets/images/preview_pragraph.png';
import header1Img from '@/assets/images/preview_header1.png';
import header2Img from '@/assets/images/preview_header2.png';
import header3Img from '@/assets/images/preview_header3.png';
import unOrderListImg from '@/assets/images/preview_unorder_list.png';
import orderListImg from '@/assets/images/preview_order_list.png';
import codeImg from '@/assets/images/preview_code.png';
import quoteImg from '@/assets/images/preview_quote.png';

const { BackgroudColor, PreviewBgColor } = themes.Color;

type PreviewType = keyof typeof previewPopupContents;
interface StyledPopupProps {
  $left: number;
}
export interface PreviewPopupProps extends StyledPopupProps {
  $top: number;
  previewType: PreviewType;
}
interface PopupContent {
  img: string;
  description: string;
}

export const previewPopupContents: { [key: string]: PopupContent } = {
  paragraph: { img: pragraphImg, description: '일반 텍스트를 사용해 쓰기를 시작하세요.' },
  Header1: { img: header1Img, description: '섹션 제목(대)' },
  Header2: { img: header2Img, description: '섹션 제목(중)' },
  Header3: { img: header3Img, description: '섹션 제목(소)' },
  unOrderList: { img: unOrderListImg, description: '간단한 글머리 기호 목록을 생성하세요.' },
  orderList: { img: orderListImg, description: '번호가 매겨진 목록을 생성하세요.' },
  code: { img: codeImg, description: '코드 스니펫을 작성하세요.' },
  quote: { img: quoteImg, description: '인용문을 작성하세요.' },
};

export default function PreviewPopup({ $left, $top, previewType }: PreviewPopupProps) {
  const popupContent = previewPopupContents[previewType];
  const { img, description } = popupContent;

  return (
    <PreviewPopupWrapper $left={$left} $top={$top}>
      {img && description && (
        <>
          <PopupImgWrapper>
            <CustomPopupImage width={130} height={130} src={img}></CustomPopupImage>
          </PopupImgWrapper>
          <PopupItemWrapper>
            <span className="description">{description}</span>
          </PopupItemWrapper>
        </>
      )}
    </PreviewPopupWrapper>
  );
}

const PreviewPopupWrapper = styled(PopupWrapper)<{ $left: number; $top: number }>`
  background-color: ${PreviewBgColor};
  min-width: 150px;
  max-width: 150px;
  padding: 10px;
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  z-index: 4;
`;

export const PopupImgWrapper = styled(FlexColumn)`
  justify-content: center;
  align-items: center;
`;

const PopupItemWrapper = styled(PopupImgWrapper)`
  align-items: start;
  & .description {
    color: ${BackgroudColor};
    width: 130px;
    word-wrap: break-word;
  }
`;
