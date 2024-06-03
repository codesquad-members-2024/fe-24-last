import { ReactNode } from 'react';
import styled from 'styled-components';

interface EditableBlockProps {
  className?: string;
  handleKeyUp?: () => void;
  children: ReactNode;
}

export default function EditableBlock({ className, handleKeyUp = () => {}, children }: EditableBlockProps) {
  return (
    <StyledEditableBlock onKeyUp={handleKeyUp} contentEditable="true">
      <StyledText>{children}</StyledText>
    </StyledEditableBlock>
  );
}

const StyledEditableBlock = styled.div`
  max-width: 100%;
  width: 100%;
  padding: 3px 2px;
`;

const StyledText = styled.span`
  font-weight: 400;
`;
