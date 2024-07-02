import { MutableRefObject, useRef } from 'react';
import EditPopup from './EditPopup';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Popup/Edit',
  component: EditPopup,
} as Meta;

const Template: StoryFn<{ contentTagRef: MutableRefObject<HTMLDivElement | null> }> = (args) => <EditPopup {...args} />;

export const DefaultEditPopup = Template.bind({
  contentTagRef: useRef(null),
});
