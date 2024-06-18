import { Meta, StoryFn } from '@storybook/react';
import TeamspacePanel, { TeamspacePanelProps } from './TeamspacePanel';
import { MemoryRouter } from 'react-router-dom';

const mockTeamspace = {
  _id: '1234',
  title: 'teamspace1',
  articles: [
    {
      _id: '1',
      title: 'article1',
      icon: 'src/anywhere',
    },
    {
      _id: '2',
      title: 'article2',
      icon: 'src/anywhere2',
    },
  ],
};

export default {
  title: 'Modal/TeamspacePanel',
  component: TeamspacePanel,
  decorators: [
    (Story: StoryFn) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: StoryFn<TeamspacePanelProps> = (args) => <TeamspacePanel {...args} />;

export const DefaultTeamspacePanel = Template.bind({});
DefaultTeamspacePanel.args = {
  teamspace: mockTeamspace,
};
