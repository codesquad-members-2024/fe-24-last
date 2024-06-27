import { Meta, StoryFn } from '@storybook/react';
import RegistrationModal from './RegistrationModal';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

export default {
  title: 'Modal/RegistrationModal',
  component: RegistrationModal,
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

const Template: StoryFn = () => <RegistrationModal />;

export const DefaultRegistrationModal = Template.bind({});
