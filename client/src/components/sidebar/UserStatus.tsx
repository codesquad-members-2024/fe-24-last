import styled from 'styled-components';
import { SideMenu } from '../../styles/themes';
import { UserDescription } from '../../constants';

export default function UserStatus({ nickname, isActive }: UserDescription) {
  return (
    <SideMenu>
      <StatusIndicator isActive={isActive} />
      <span>{nickname}</span>
    </SideMenu>
  );
}

const StatusIndicator = styled.div<{ isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? '#66BF3C' : '#A0A3BD')};
`;
