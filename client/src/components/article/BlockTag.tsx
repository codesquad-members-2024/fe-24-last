import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FlexRow } from '../../styles/themes';
import AddPopup from '../popup/AddPopup';
import EditPopup from '../popup/EditPopup';

export default function BlockTag({ contentTag }: { contentTag: ReactNode }) {
  const [isShowSubPopup, setIsShowSubPopup] = useState({ edit: false, plus: false });
  const showEditPopup = () => setIsShowSubPopup((prev) => ({ ...prev, edit: !prev.edit }));
  const showPlusPopup = () => setIsShowSubPopup((prev) => ({ ...prev, plus: !prev.plus }));
  const popupRef = useRef<HTMLDivElement | null>(null);

  const popupType: { [key: string]: () => void } = {
    edit: () => {
      showEditPopup();
    },
    plus: () => {
      showPlusPopup();
    },
  };

  type PopupTypeKey = keyof typeof popupType;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLElement;
    const type = target.getAttribute('data-attr-type');
    if (!type || !(type in popupType)) return;
    popupType[type as PopupTypeKey]();
  };

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      const popupCurrent = popupRef.current;
      if (!popupCurrent || (popupCurrent && popupCurrent.contains(target as Node))) return;
      setIsShowSubPopup({ edit: false, plus: false });
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <BlockWrapper>
        <Icons>
          <IconWrapper data-attr-type="edit" onClick={handleClick}>
            <HolderOutlined />
          </IconWrapper>
          <IconWrapper data-attr-type="plus" onClick={handleClick}>
            <PlusOutlined />
          </IconWrapper>
        </Icons>
        {contentTag}
      </BlockWrapper>
      {isShowSubPopup.plus && (
        <div ref={popupRef}>
          <AddPopup />
        </div>
      )}
      {isShowSubPopup.edit && (
        <div ref={popupRef}>
          <EditPopup />
        </div>
      )}
    </>
  );
}

const BlockWrapper = styled(FlexRow)`
  justify-content: flex-start;
`;

const Icons = styled(FlexRow)`
  margin-right: 10px;
  cursor: pointer;
  position: relative;
  transition: all;
  position: relative;
`;

const IconWrapper = styled.div`
  opacity: 0;
  transition: opacity 0.3s;
  ${Icons}:hover & {
    opacity: 1;
  }
`;
