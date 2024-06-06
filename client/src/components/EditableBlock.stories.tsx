import EditableBlock, { EditableBlockProps } from './EditableBlock';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Article/EditableBlock',
  component: EditableBlock,
  argTypes: {
    handleInput: {
      action: 'input',
    },
  },
} as Meta;

const Template: StoryFn<EditableBlockProps> = (args) => <EditableBlock {...args} />;

export const HeaderBlock = Template.bind({});
HeaderBlock.args = {
  block: {
    type: 'header',
    level: 2,
    content: 'Hello World',
  },
  index: 0,
};

export const ParagraphBlock = Template.bind({});
ParagraphBlock.args = {
  block: {
    type: 'paragraph',
    content: '미메는 팝콘이 먹고 싶어요.',
  },
  index: 1,
};

export const ListBlock = Template.bind({});
ListBlock.args = {
  block: {
    type: 'list',
    items: ['슈니', '우디', '미메'],
  },
  index: 0,
};
