import * as S from "../styles/BlockTypePopup";
import { blockTypeBtnsData } from "../model/blockTypeBtnData";

interface BlockTypePopupProps {
  onTypeChange: (newType: string) => void;
}

export default function ElementTypePopup({
  onTypeChange,
}: BlockTypePopupProps) {
  return (
    <S.Wrapper onClick={(e) => e.stopPropagation()}>
      <S.PopupTitle>기본 블록</S.PopupTitle>

      {blockTypeBtnsData.map((typeObj, index) => {
        const { img, name, title, description } = typeObj;
        return (
          <S.ButtonBox
            key={`blockTypeBtn-${index}`}
            onClick={() => onTypeChange(name)}
          >
            <S.ButtonEmoji>
              <img src={img} />
            </S.ButtonEmoji>
            <S.BlockTypeDescription>
              <S.TypeName>{title}</S.TypeName>
              <S.TypeDescription>{description}</S.TypeDescription>
            </S.BlockTypeDescription>
          </S.ButtonBox>
        );
      })}
    </S.Wrapper>
  );
}
