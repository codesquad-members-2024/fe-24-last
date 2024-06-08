import styled, { css } from "styled-components";

export const blockStyles = {
    text: css`
        margin: auto;
    `,
};

interface BlockProps {
    $type: keyof typeof blockStyles;
}

const Block = styled.div<BlockProps>`
    ${({ $type }) => blockStyles[$type]};
    max-width: 708px;
    outline: none;
    padding: 3px 0px;
`;

export default Block;
