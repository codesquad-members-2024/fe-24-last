import { createBrowserRouter } from 'react-router-dom';
import NicknameModal from '../components/modal/NicknameModal';
import RegistrationModal from '../components/modal/RegistrationModal';
import TeamspaceModal from '../components/modal/TeamspaceModal';
import styled from 'styled-components';
import { Flex, FlexColumn } from '../styles/themes';
import Sidebar from '../components/sidebar/Sidebar';
import Article from '../components/Article';
import { Suspense } from 'react';
import Loading from '../components/loading/Loading';

const Screen = styled(FlexColumn)`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Screen>
          <TeamspaceModal />
        </Screen>
      </Suspense>
    ),
  },
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
    path: '/teamspace/:teamspaceId/article/:articleId',
    element: (
      <Suspense fallback={<Loading />}>
        <Flex>
          <Sidebar />
          <Article />
        </Flex>
      </Suspense>
    ),
  },
]);
