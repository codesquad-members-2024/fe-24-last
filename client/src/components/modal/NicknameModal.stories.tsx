import { Meta, StoryFn } from '@storybook/react';
import NicknameModal from './NicknameModal';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Modal/NicknameModal',
  component: NicknameModal,
  decorators: [
    (Story: StoryFn) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <NicknameModal />;

export const DefaultNicknameModal = Template.bind({});
