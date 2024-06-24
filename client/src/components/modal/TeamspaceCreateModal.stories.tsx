import { Meta, StoryFn } from '@storybook/react';
import TeamspaceCreateModal, { TeamspaceCreateModalProps } from './TeamspaceCreateModal';

const mockHandlers = {
  handleCancelClick: () => {},
  handleSubmitClick: () => {},
};

export default {
  title: 'Modal/TeamspaceCreateModal',
  component: TeamspaceCreateModal,
} as Meta;

const Template: StoryFn<TeamspaceCreateModalProps> = (args) => <TeamspaceCreateModal {...args} />;

export const DefaultCreateModal = Template.bind({});
DefaultCreateModal.args = mockHandlers;
