import styled from 'styled-components';
import { FlexColumn, BoxBackground, BoxBorder, ButtonBorder, SubmitBackground, SubmitColor } from '../../styles/themes';

export default function NicknameModal() {
  return (
    <Wrapper>
      <span>닉네임을 입력해주세요.</span>
      <NicknameInput type="text" />
      <SubmitButton>확인</SubmitButton>
    </Wrapper>
  );
}

const Wrapper = styled(FlexColumn)`
  width: 300px;
  height: 128px;
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
  text-align: center;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  ${SubmitBackground}
  ${SubmitColor}
  ${ButtonBorder}

  border: 1px solid blue;
  opacity: 0.4;

  &:hover {
    opacity: 1;
  }
`;
