import { createBrowserRouter } from 'react-router-dom';
import NicknameModal from '../components/modal/NicknameModal';
import RegistrationModal from '../components/modal/RegistrationModal';
import TeamspaceModal from '../components/modal/TeamspaceModal';
import styled from 'styled-components';
import { Flex, FlexColumn } from '../styles/themes';
import Sidebar from '../components/sidebar/Sidebar';
import Article from '../components/Article';

const Screen = styled(FlexColumn)`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Screen>
        <NicknameModal />
      </Screen>
    ),
  },
  {
    path: '/registration',
    element: (
      <Screen>
        <RegistrationModal />
      </Screen>
    ),
  },
  {
    path: '/teamspaces',
    element: (
      <Screen>
        <TeamspaceModal />
      </Screen>
    ),
  },
  {
    path: '/teamspace/:teamspaceId/article/:articleId',
    element: (
      <Flex>
        <Sidebar />
        <Article />
      </Flex>
    ),
  },
]);
