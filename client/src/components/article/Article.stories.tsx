import { Meta, StoryFn } from '@storybook/react';
import Article from './Article';

export default {
  title: 'Article/Article',
  component: Article,
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
} as Meta;

const Template: StoryFn = (args) => <Article {...args} />;

export const DefaultArticle = Template.bind({});
DefaultArticle.args = {};
