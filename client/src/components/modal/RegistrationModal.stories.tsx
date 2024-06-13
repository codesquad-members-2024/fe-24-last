import { Meta, StoryFn } from '@storybook/react';
import RegistrationModal from './RegistrationModal';

export default {
  title: 'Modal/RegistrationModal',
  component: RegistrationModal,
} as Meta;

const Template: StoryFn = () => <RegistrationModal />;

export const DefaultRegistrationModal = Template.bind({});
