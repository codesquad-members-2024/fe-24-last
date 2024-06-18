import EditPopup from './EditPopup';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Popup/Edit',
  component: EditPopup,
} as Meta;

const Template: StoryFn = () => <EditPopup />;

export const DefaultEditPopup = Template.bind({});
