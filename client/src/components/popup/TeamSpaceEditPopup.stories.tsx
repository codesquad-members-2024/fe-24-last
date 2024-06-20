import { Meta, StoryFn } from '@storybook/react';
import TeamSpaceEditPopup from './TeamSpaceEditPopup';

export default {
  title: 'Popup/TeamSpace',
  component: TeamSpaceEditPopup,
} as Meta;

const Template: StoryFn = () => <TeamSpaceEditPopup />;

export const DefaultTeamSpaceEditPopup = Template.bind({});
