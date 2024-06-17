import styled, { css } from "styled-components";
import { HolderOutlined } from "@ant-design/icons";

export const blockStyles = {
    text: css`
        
    `,
};

interface BlockProps {
    $type: keyof typeof blockStyles;
}

const Block = styled.div<BlockProps>`
    ${({ $type }) => blockStyles[$type]};
    max-width: 708px;
    min-width: 708px;
    height: 100%;
    outline: none;
    
    &:empty:before {
        content: attr(aria-placeholder);
        color: #aaa;
        position: absolute;
    }
`;

const DragHandle = styled(HolderOutlined)`
    visibility: hidden;
`

const BlockContainer = styled.div`
    max-width: 750px;
    padding: 3px 0px;
    margin: 0px auto;
    display: flex;
    gap: 6px;
    position: relative;
    &:hover {
        ${DragHandle} {
            visibility: visible
        }
    }
`


export {Block, BlockContainer, DragHandle};