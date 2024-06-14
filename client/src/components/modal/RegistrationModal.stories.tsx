import { Meta, StoryFn } from '@storybook/react';
import RegistrationModal from './RegistrationModal';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Modal/RegistrationModal',
  component: RegistrationModal,
  decorators: [
    (Story: StoryFn) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <RegistrationModal />;

export const DefaultRegistrationModal = Template.bind({});
