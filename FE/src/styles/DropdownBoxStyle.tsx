import styled from "styled-components";

const DropDownContainer = styled.div`
    position: absolute;
    z-index: 10;
    border: none;
    border-radius: 10px;
    top: 100%;
    left: 0;
    width: 200px;
    height: 150px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 3px;
    overflow: hidden;
    &:focus {
        outline: none;
    }
`;

const SelectItem = styled.div<{ $selectItemIdx: boolean; $hoverItemIdx: number | null }>`
    z-index: 10;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ccc;
    background-color: ${({ $selectItemIdx, $hoverItemIdx }) =>
        $selectItemIdx && $hoverItemIdx === null ? '#e0e0e0' : 'white'};
    &:last-child {
        border-bottom: none;
    }
    cursor: pointer;
    &:hover {
        background-color: #e0e0e0;
    }
`;

export {DropDownContainer, SelectItem}