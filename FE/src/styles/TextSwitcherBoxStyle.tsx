import styled from "styled-components";

const TextSwitcherContainer = styled.div`
    position: absolute;
    z-index: 10;
    border: none;
    border-radius: 5px;
    top: -110%;
    left: 0;
    width: 200px;
    height: 30px;
    display: flex;
    box-shadow: 0 0 3px;
    overflow: hidden;
    background-color: white;
    font-weight: bold;
`;

const TextItem = styled.div`
    z-index: 10;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    &:hover {
        background-color: #e0e0e0;
    }
`;

export {TextSwitcherContainer, TextItem}