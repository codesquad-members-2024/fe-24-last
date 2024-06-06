import { Meta, StoryFn } from '@storybook/react';
import BlockController from './BlockController';
import { BlockControllerProps } from '../constants';

export default {
  title: 'Article/BlockController',
  component: BlockController,
} as Meta;

const Template: StoryFn<BlockControllerProps> = (args) => <BlockController {...args} />;

export const DefaultController = Template.bind({});
DefaultController.args = {
  blocks: [
    { type: 'header', content: 'Hello World', level: 2 },
    { type: 'paragraph', content: '내용입니다.' },
    { type: 'list', items: ['미메', '슈니', '우디'] },
  ],
};
