import styled from 'styled-components';
import { BoxBackground, BoxBorder, ButtonBorder, FlexColumn, SubmitBackground, themes } from '../../styles/themes';

const {
  Color: { SubmitColor },
} = themes;

export default function RegistrationModal() {
  return (
    <Wrapper>
      <span>회원가입</span>
      <NicknameInput type="text" placeholder="닉네임" />
      <SubmitButton>확인</SubmitButton>
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
