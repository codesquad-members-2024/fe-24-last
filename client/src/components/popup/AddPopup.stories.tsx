import { Meta, StoryFn } from '@storybook/react';
import AddPopup from './AddPopup';

export default {
  title: 'Popup/Add',
  component: AddPopup,
} as Meta;

const Template: StoryFn = () => <AddPopup />;

export const DefaultAddPopup = Template.bind({});
