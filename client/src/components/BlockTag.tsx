import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { FlexRow } from '../styles/themes';

export default function BlockTag({ contentTag }: { contentTag: ReactNode }) {
  return (
    <BlockWrapper>
      <Icons>
        <IconWrapper>
          <HolderOutlined />
        </IconWrapper>
        <IconWrapper>
          <PlusOutlined />
        </IconWrapper>
      </Icons>
      {contentTag}
    </BlockWrapper>
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
