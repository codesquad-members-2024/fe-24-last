import styled from 'styled-components';
import themes, { PopupWrapper, PopupLineWrapper, PopupLine, Position } from '@/styles/themes';
import { CommentOutlined, StarFilled, DeleteOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import SubPopup from './SubPopup';

const { BackgroudColor } = themes.Color;
interface EditPopupContent {
  icon: React.ReactNode;
  optionShortCutKey: React.ReactNode | string;
  optionTitle: string;
  className?: string;
}
const editPopupContents: { [key: string]: EditPopupContent } = {
  comment: { icon: <CommentOutlined />, optionShortCutKey: 'Ctrl+Shift+M', optionTitle: '댓글' },
  ai: { icon: <StarFilled />, optionShortCutKey: 'Ctrl+J', optionTitle: 'AI에게 요청' },
  delete: { icon: <DeleteOutlined />, optionShortCutKey: 'Del', optionTitle: '삭제', className: 'deleteTitle' },
  change: { icon: <RetweetOutlined />, optionShortCutKey: <RightOutlined />, optionTitle: '전환' },
};

export default function EditPopup() {
  const [isShowSubPopup, setIsShowSubPopup] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (key: string) => {
    if (key !== 'change') {
      setIsShowSubPopup(false);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsShowSubPopup(true);
    }, 300);
  };

  return (
    <>
      <EditPopupWrapper>
        {Object.keys(editPopupContents).map((key) => {
          const { icon, optionShortCutKey, optionTitle, className } = editPopupContents[key];
          return (
            <PopupLineWrapper key={`edit-popup-${key}`}>
              <PopupLine onMouseEnter={() => handleMouseEnter(key)}>
                <div className={className || ''}>
                  {icon}
                  <span className="optionTitle">{optionTitle}</span>
                </div>
                <div className="optionShortCutKey">{optionShortCutKey}</div>
              </PopupLine>
            </PopupLineWrapper>
          );
        })}
      </EditPopupWrapper>
      <Position>{isShowSubPopup && <SubPopup $left={250} usedType={'paragraph'} />}</Position>
    </>
  );
}

const EditPopupWrapper = styled(PopupWrapper)`
  position: absolute;
  background-color: ${BackgroudColor};
  z-index: 1;
`;
