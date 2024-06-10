import { Meta, StoryFn } from '@storybook/react';
import Teamspace, { TeamspaceProps } from './Teamspace';

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

export default {
  title: 'Sidebar/Teamspace',
  component: Teamspace,
} as Meta;

const Template: StoryFn<TeamspaceProps> = (args) => <Teamspace {...args} />;

export const DefaultTeamspace = Template.bind({});
DefaultTeamspace.args = mockTeamspace;
