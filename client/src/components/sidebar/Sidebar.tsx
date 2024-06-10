import { AppstoreOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { ColumnGap, DefaultFontSize, SideMenu, WeakColor } from '../../styles/themes';
import UserStatus from './UserStatus';
import Teamspace from './Teamspace';
import { TeamspaceDescription, UserDescription } from '../../constants';

export interface SidebarProps {
  teamspace: TeamspaceDescription;
  users: UserDescription[];
}

export default function Sidebar({ teamspace, users }: SidebarProps) {
  return (
    <Wrapper>
      <SideMenu>
        <HomeButton />
        <span>홈</span>
      </SideMenu>
      <SideMenu>
        <SettingButton />
        <span>설정</span>
      </SideMenu>
      <Teamspace {...teamspace} />
      <SideMenu>
        <TemplateButton />
        <span>템플릿</span>
      </SideMenu>
      <SideMenu>현재 접속한 유저</SideMenu>
      {users.map((user) => (
        <UserStatus {...user} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled(ColumnGap)`
  ${DefaultFontSize}

  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 16px 8px;
  width: 240px;
  height: 100vh;
  background-color: #f7f7f5;
  justify-content: flex-start;
`;

const HomeButton = styled(HomeOutlined)`
  ${WeakColor}
`;

const SettingButton = styled(SettingOutlined)`
  ${WeakColor}
`;

const TemplateButton = styled(AppstoreOutlined)`
  ${WeakColor}
`;
