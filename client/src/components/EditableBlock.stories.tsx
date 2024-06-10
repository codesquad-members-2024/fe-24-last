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

export const UnorderedListBlock = Template.bind({});
UnorderedListBlock.args = {
  block: {
    type: 'ul-item',
    content: '안녕하세요 슈니입니다.',
  },
  index: 0,
};

export const OrderedListBlock = Template.bind({});
OrderedListBlock.args = {
  block: {
    type: 'ordered-list',
    items: [
      {
        type: 'ol-item',
        content: '미메',
      },
      {
        type: 'ol-item',
        content: '우디',
      },
      {
        type: 'ol-item',
        content: '슈니',
      },
    ],
  },
  index: 0,
};
