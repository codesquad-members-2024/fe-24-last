import { Meta, StoryFn } from '@storybook/react';
import TeamspaceCreateModal from './TeamspaceCreateModal';

export default {
  title: 'Modal/TeamspaceCreateModal',
  component: TeamspaceCreateModal,
} as Meta;

const Template: StoryFn = (...args) => <TeamspaceCreateModal />;

export const DefaultCreateModal = Template.bind({});
