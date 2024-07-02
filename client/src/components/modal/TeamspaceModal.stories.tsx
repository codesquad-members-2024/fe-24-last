import { Meta, StoryFn } from '@storybook/react';
import TeamspaceModal from './TeamspaceModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

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
