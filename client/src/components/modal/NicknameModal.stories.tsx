import { Meta, StoryFn } from '@storybook/react';
import NicknameModal from './NicknameModal';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

export default {
  title: 'Modal/NicknameModal',
  component: NicknameModal,
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

const Template: StoryFn = () => <NicknameModal />;

export const DefaultNicknameModal = Template.bind({});
