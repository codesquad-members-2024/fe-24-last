import { Meta, StoryFn } from '@storybook/react';
import SubPopup from './SubPopup';

export default {
  title: 'Popup/Sub',
  component: SubPopup,
} as Meta;

const Template: StoryFn = () => <SubPopup />;

export const DefaultSubPopup = Template.bind({});
