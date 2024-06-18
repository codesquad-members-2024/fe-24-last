import { Meta, StoryFn } from '@storybook/react';
import TeamspaceModal from './TeamspaceModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

const mockTeamspaces = [
  {
    id: 1234,
    title: 'teamspace1',
    articles: [
      {
        id: 1,
        title: 'article1',
        icon: 'src/anywhere',
      },
      {
        id: 2,
        title: 'article2',
        icon: 'src/anywhere2',
      },
    ],
  },
  {
    id: 1235,
    title: 'teamspace2',
    articles: [
      {
        id: 1,
        title: 'article1',
        icon: 'src/anywhere',
      },
      {
        id: 2,
        title: 'article2',
        icon: 'src/anywhere2',
      },
    ],
  },
  {
    id: 1235,
    title: 'teamspace2',
    articles: [
      {
        id: 1,
        title: 'article1',
        icon: 'src/anywhere',
      },
      {
        id: 2,
        title: 'article2',
        icon: 'src/anywhere2',
      },
    ],
  },
  {
    id: 1235,
    title: 'teamspace2',
    articles: [
      {
        id: 1,
        title: 'article1',
        icon: 'src/anywhere',
      },
      {
        id: 2,
        title: 'article2',
        icon: 'src/anywhere2',
      },
    ],
  },
  {
    id: 1235,
    title: 'teamspace2',
    articles: [
      {
        id: 1,
        title: 'article1',
        icon: 'src/anywhere',
      },
      {
        id: 2,
        title: 'article2',
        icon: 'src/anywhere2',
      },
    ],
  },
  {
    id: 1235,
    title: 'teamspace2',
    articles: [
      {
        id: 1,
        title: 'article1',
        icon: 'src/anywhere',
      },
      {
        id: 2,
        title: 'article2',
        icon: 'src/anywhere2',
      },
    ],
  },
  {
    id: 1235,
    title: 'teamspace2',
    articles: [
      {
        id: 1,
        title: 'article1',
        icon: 'src/anywhere',
      },
      {
        id: 2,
        title: 'article2',
        icon: 'src/anywhere2',
      },
    ],
  },
  {
    id: 1235,
    title: 'teamspace2',
    articles: [
      {
        id: 1,
        title: 'article1',
        icon: 'src/anywhere',
      },
      {
        id: 2,
        title: 'article2',
        icon: 'src/anywhere2',
      },
    ],
  },
  {
    id: 1235,
    title: 'teamspace2',
    articles: [
      {
        id: 1,
        title: 'article1',
        icon: 'src/anywhere',
      },
      {
        id: 2,
        title: 'article2',
        icon: 'src/anywhere2',
      },
    ],
  },
  {
    id: 1235,
    title: 'teamspace2',
    articles: [
      {
        id: 1,
        title: 'article1',
        icon: 'src/anywhere',
      },
      {
        id: 2,
        title: 'article2',
        icon: 'src/anywhere2',
      },
    ],
  },
  {
    id: 1235,
    title: 'teamspace2',
    articles: [
      {
        id: 1,
        title: 'article1',
        icon: 'src/anywhere',
      },
      {
        id: 2,
        title: 'article2',
        icon: 'src/anywhere2',
      },
    ],
  },
  {
    id: 1235,
    title: 'teamspace2',
    articles: [
      {
        id: 1,
        title: 'article1',
        icon: 'src/anywhere',
      },
      {
        id: 2,
        title: 'article2',
        icon: 'src/anywhere2',
      },
    ],
  },
  {
    id: 1235,
    title: 'teamspace2',
    articles: [
      {
        id: 1,
        title: 'article1',
        icon: 'src/anywhere',
      },
      {
        id: 2,
        title: 'article2',
        icon: 'src/anywhere2',
      },
    ],
  },
  {
    id: 1235,
    title: 'teamspace2',
    articles: [
      {
        id: 1,
        title: 'article1',
        icon: 'src/anywhere',
      },
      {
        id: 2,
        title: 'article2',
        icon: 'src/anywhere2',
      },
    ],
  },
];

const client = new QueryClient();

export default {
  title: 'Modal/TeamspaceModal',
  component: TeamspaceModal,
  decorators: [
    (Story: StoryFn) => (
      <QueryClientProvider client={client}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <TeamspaceModal />;

export const DefaultTeamspaceModal = Template.bind({});
DefaultTeamspaceModal.args = {};
