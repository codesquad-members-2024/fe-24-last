import styled from 'styled-components';
import {
  BoxBackground,
  BoxBorder,
  ButtonBorder,
  FlexColumn,
  FlexRow,
  SubmitBackground,
  themes,
} from '../../styles/themes';
import { useRef } from 'react';

export interface TeamspaceCreateModalProps {
  handleCancelClick: () => void;
  handleSubmitClick: (title: string) => void;
}

const {
  Color: { SubmitColor },
} = themes;

export default function TeamspaceCreateModal({ handleCancelClick, handleSubmitClick }: TeamspaceCreateModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const getInputText = () => {
    const inputNode = inputRef.current;
    return inputNode ? inputNode.value : '';
  };

  const handleCreateClick = () => handleSubmitClick(getInputText() || '');

  return (
    <Wrapper>
      <span>팀 스페이스 생성</span>
      <NicknameInput ref={inputRef} type="text" placeholder="팀 스페이스 이름" />
      <ButtonWrapper>
        <CancelClick onClick={handleCancelClick}>취소</CancelClick>
        <SubmitButton onClick={handleCreateClick}>확인</SubmitButton>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(FlexColumn)`
  position: absolute;
  width: 300px;
  height: 174px;
  background-color: white;
  border: 1px solid #e2e5e8;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const NicknameInput = styled.input`
  ${BoxBackground}
  ${BoxBorder}

  width: 200px;
  height: 30px;
  padding: 0 1rem;

  &:focus {
    outline: none;
  }
`;

const ButtonWrapper = styled(FlexRow)`
  gap: 1em;
`;

const CancelClick = styled.button`
  ${ButtonBorder}

  border: 1px solid gray;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  ${SubmitBackground}
  ${ButtonBorder}

  border: 1px solid blue;
  color: ${SubmitColor};
  opacity: 0.4;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;
