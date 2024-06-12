import { Meta, StoryFn } from '@storybook/react';
import NicknameModal from './NicknameModal';

export default {
  title: 'Modal/NicknameModal',
  component: NicknameModal,
} as Meta;

const Template: StoryFn = () => <NicknameModal />;

export const DefaultNicknameModal = Template.bind({});
