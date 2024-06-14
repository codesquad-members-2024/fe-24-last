import { Meta, StoryFn } from '@storybook/react';
import TeamspaceModal, { TeamspaceModalProps } from './TeamspaceModal';

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

export default {
  title: 'Modal/TeamspaceModal',
  component: TeamspaceModal,
} as Meta;

const Template: StoryFn<TeamspaceModalProps> = (args) => <TeamspaceModal {...args} />;

export const DefaultTeamspaceModal = Template.bind({});
DefaultTeamspaceModal.args = {
  teamspaces: mockTeamspaces,
};
