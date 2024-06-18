import styled from 'styled-components';
import { BoxBackground, BoxBorder, ButtonBorder, FlexColumn, SubmitBackground, themes } from '../../styles/themes';
import { useRef } from 'react';
import { postRegistration } from '../../api/mainAPI';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';

const {
  Color: { SubmitColor },
} = themes;

export default function RegistrationModal() {
  const inputRef = useRef<HTMLInputElement>(null);
  const getInputText = () => {
    const inputNode = inputRef.current;
    return inputNode ? inputNode.value : '';
  };
  const navigate = useNavigate();

  const { mutate: fetchRegistration } = useMutation({
    mutationFn: postRegistration,
    onSuccess: () => navigate('/login'),
    onError: ({ message: errorMessage }) => message.warning(errorMessage),
  });

  const handleSubmitClick = () => fetchRegistration(getInputText() || '');

  return (
    <Wrapper>
      <span>회원가입</span>
      <NicknameInput ref={inputRef} type="text" placeholder="닉네임" />
      <SubmitButton onClick={handleSubmitClick}>확인</SubmitButton>
    </Wrapper>
  );
}

const Wrapper = styled(FlexColumn)`
  width: 300px;
  height: 174px;
  border: 1px solid #e2e5e8;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;

const ErrorText = styled.span`
  color: red;
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

const SubmitButton = styled.button`
  ${SubmitBackground}
  ${ButtonBorder}

  border: 1px solid blue;
  color: ${SubmitColor};
  opacity: 0.4;

  &:hover {
    opacity: 1;
  }
`;
