import { Meta, StoryFn } from '@storybook/react';
import Sidebar, { SidebarProps } from './Sidebar';

const mockTeamspace = {
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
};

const mockUsers = [
  {
    nickname: 'user1',
    isActive: true,
  },
  {
    nickname: 'user2',
    isActive: false,
  },
];

export default {
  title: 'Sidebar/Sidebar',
  component: Sidebar,
} as Meta;

const Template: StoryFn<SidebarProps> = (args) => <Sidebar {...args} />;

export const DefaultSidebar = Template.bind({});
DefaultSidebar.args = {
  teamspace: mockTeamspace,
  users: mockUsers,
};
