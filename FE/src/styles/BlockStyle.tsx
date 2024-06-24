import styled from "styled-components";
import { HolderOutlined } from "@ant-design/icons";

const Block = styled.div<{$isFocus: boolean}>`
    max-width: 708px;
    min-width: 708px;
    height: 100%;
    outline: none;
    position: relative;

    &:empty::before {
        content: attr(aria-placeholder);
        color: #aaa;
        position: absolute;
        left: 0;
        top: 0;
        display: none;
    }

    &:empty::before {
        display: ${({ $isFocus }) => ($isFocus && "block")}; 
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
