import { Meta, StoryFn } from '@storybook/react';
import UserStatus from './UserStatus';
import { UserDescription } from '../../constants';

export default {
  title: 'Sidebar/UserStatus',
  component: UserStatus,
} as Meta;

const Template: StoryFn<UserDescription> = (args) => <UserStatus {...args} />;

export const ActiveUser = Template.bind({});
ActiveUser.args = {
  nickname: 'user1',
  isActive: true,
};

export const InactiveUser = Template.bind({});
InactiveUser.args = {
  nickname: 'user2',
  isActive: false,
};
