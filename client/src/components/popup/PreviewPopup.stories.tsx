import { Meta, StoryFn } from '@storybook/react';
import PreviewPopup, { previewPopupContents } from './PreviewPopup';

type PreviewType = keyof typeof previewPopupContents;

interface StyledPopupProps {
  $left: number;
}
export interface PreviewPopupProps extends StyledPopupProps {
  $top: number;
  previewType: PreviewType;
}
const mockPreviewParagraph = {
  $top: 10,
  $left: 10,
  previewType: 'paragraph',
};
const mockHeader1Paragraph = {
  $top: 20,
  $left: 10,
  previewType: 'Header1',
};
const mockHeader2Paragraph = {
  $top: 30,
  $left: 10,
  previewType: 'Header2',
};
const mockHeader3Paragraph = {
  $top: 40,
  $left: 10,
  previewType: 'Header3',
};
const mockUnOrderListParagraph = {
  $top: 50,
  $left: 10,
  previewType: 'unOrderList',
};
const mockOrderListParagraph = {
  $top: 60,
  $left: 10,
  previewType: 'orderList',
};
const mockCodeParagraph = {
  $top: 70,
  $left: 10,
  previewType: 'code',
};
const mockQuoteParagraph = {
  $top: 80,
  $left: 10,
  previewType: 'quote',
};

export default {
  title: 'Popup/Preview',
  component: PreviewPopup,
} as Meta;

const Template: StoryFn<PreviewPopupProps> = (args) => <PreviewPopup {...args} />;

export const ParagraphEditPopup = Template.bind({});
ParagraphEditPopup.args = mockPreviewParagraph;
export const Header1Paragraph = Template.bind({});
Header1Paragraph.args = mockHeader1Paragraph;
export const Header2Paragraph = Template.bind({});
Header2Paragraph.args = mockHeader2Paragraph;
export const Header3Paragraph = Template.bind({});
Header3Paragraph.args = mockHeader3Paragraph;
export const UnOrderListParagraph = Template.bind({});
UnOrderListParagraph.args = mockUnOrderListParagraph;
export const OrderListParagraph = Template.bind({});
OrderListParagraph.args = mockOrderListParagraph;
export const CodeParagraph = Template.bind({});
CodeParagraph.args = mockCodeParagraph;
export const QuoteParagraph = Template.bind({});
QuoteParagraph.args = mockQuoteParagraph;
