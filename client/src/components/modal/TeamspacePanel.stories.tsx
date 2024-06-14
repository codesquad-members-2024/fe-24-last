import { Meta, StoryFn } from '@storybook/react';
import TeamspacePanel, { TeamspacePanelProps } from './TeamspacePanel';

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
  title: 'Modal/TeamspacePanel',
  component: TeamspacePanel,
} as Meta;

const Template: StoryFn<TeamspacePanelProps> = (args) => <TeamspacePanel {...args} />;

export const DefaultTeamspacePanel = Template.bind({});
DefaultTeamspacePanel.args = {
  teamspace: mockTeamspace,
};
