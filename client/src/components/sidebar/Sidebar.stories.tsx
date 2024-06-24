import { Meta, StoryFn } from '@storybook/react';
import Sidebar from './Sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

const client = new QueryClient();

export default {
  title: 'Sidebar/Sidebar',
  component: Sidebar,
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

const Template: StoryFn = (args) => <Sidebar {...args} />;

export const DefaultSidebar = Template.bind({});
DefaultSidebar.args = {};
