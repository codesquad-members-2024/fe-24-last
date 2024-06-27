import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FlexRow, Position } from '../../styles/themes';
import AddPopup from '../popup/AddPopup';
import EditPopup from '../popup/EditPopup';

export default function BlockTag({
  contentTagRef,
  plusIconRef,
  contentTag,
}: {
  contentTagRef: MutableRefObject<HTMLDivElement | null>;
  plusIconRef: MutableRefObject<HTMLDivElement | null>;
  contentTag: ReactNode;
}) {
  const eventRef = useRef<KeyboardEvent | null>(null);
  const [isShowSubPopup, setIsShowSubPopup] = useState({ edit: false, plus: false });
  const [isSlash, setIsSlash] = useState<boolean>(false);
  const showEditPopup = () => setIsShowSubPopup((prev) => ({ ...prev, edit: !prev.edit }));
  const showPlusPopup = () => {
    setIsShowSubPopup((prev) => ({ ...prev, plus: !prev.plus }));
    setIsSlash(false);

    if (eventRef.current?.key === '/') {
      setIsSlash(true);
      eventRef.current = null;
      return;
    }

    if (contentTagRef.current) {
      const event = new KeyboardEvent('keyup', {
        key: 'Enter',
        bubbles: true,
        cancelable: true,
      });
      contentTagRef.current.dispatchEvent(event);
    }
  };
  const popupRef = useRef<HTMLDivElement | null>(null);

  const popupType: { [key: string]: () => void } = {
    edit: showEditPopup,
    plus: showPlusPopup,
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

  const handleEventByType = (e: KeyboardEvent) => (eventRef.current = e);

  useEffect(() => {
    const currentContentTag = contentTagRef.current;
    if (currentContentTag) {
      currentContentTag.addEventListener('keyup', handleEventByType);

      return () => {
        currentContentTag.removeEventListener('keyup', handleEventByType);
      };
    }
  }, []);

  return (
    <>
      <BlockWrapper>
        <Icons>
          <IconWrapper data-attr-type="edit" onClick={handleClick}>
            <HolderOutlined />
          </IconWrapper>
          <IconWrapper data-attr-type="plus" onClick={handleClick} ref={plusIconRef}>
            <PlusOutlined />
          </IconWrapper>
        </Icons>
        {contentTag}
      </BlockWrapper>
      {isShowSubPopup.plus && (
        <Position ref={popupRef}>
          <AddPopup isSlash={isSlash} />
        </Position>
      )}
      {isShowSubPopup.edit && (
        <Position ref={popupRef}>
          <EditPopup />
        </Position>
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
`;

const IconWrapper = styled.div`
  opacity: 0;
  transition: opacity 0.3s;
  ${Icons}:hover & {
    opacity: 1;
  }
`;
