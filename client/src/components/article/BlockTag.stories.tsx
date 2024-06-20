import { Meta, StoryFn } from '@storybook/react';
import BlockTag from './BlockTag';
import { ReactNode } from 'react';
import { OrderedListIndex, StyledBlockTag } from './EditableBlock';
import { Flex } from '../../styles/themes';

const HeaderContentTag = (
  <h1 contentEditable suppressContentEditableWarning>
    헤더1 태그 입니다.
  </h1>
);
const ParagraphContentTag = (
  <StyledBlockTag
    contentEditable
    suppressContentEditableWarning
    style={{ backgroundColor: 'aliceblue' }}
    onKeyUp={() => {}}
    onKeyDown={() => {}}
  >
    paragraph 태그입니다.
  </StyledBlockTag>
);

const UnorderedListContentTag = (
  <Flex>
    <OrderedListIndex>•</OrderedListIndex>
    <div contentEditable suppressContentEditableWarning onKeyUp={() => {}} onKeyDown={() => {}}>
      ul 태그 입니다.
    </div>
  </Flex>
);

const OrderedListContentTag = (
  <Flex>
    <OrderedListIndex>1. </OrderedListIndex>
    <div key={`ol-1-1`} contentEditable suppressContentEditableWarning onKeyUp={() => {}} onKeyDown={() => {}}>
      ol 태그 입니다.
    </div>
  </Flex>
);

export default {
  title: 'Article/BlockTag',
  component: BlockTag,
} as Meta;

const Template: StoryFn<{ contentTag: ReactNode }> = (args) => <BlockTag {...args} />;

export const HeaderBlockTag = Template.bind({});
HeaderBlockTag.args = {
  contentTag: HeaderContentTag,
};
export const ParagraphBlockTag = Template.bind({});
ParagraphBlockTag.args = {
  contentTag: ParagraphContentTag,
};
export const UnorderedListBlockTag = Template.bind({});
UnorderedListBlockTag.args = {
  contentTag: UnorderedListContentTag,
};
export const OrderedListBlockTag = Template.bind({});
OrderedListBlockTag.args = {
  contentTag: OrderedListContentTag,
};
