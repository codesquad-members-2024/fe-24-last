import styled from "styled-components";
import { BlockType } from "../../pages/SideBar";

const TAG_LIST = [
    { name: "Heading1", tag: "h1" },
    { name: "Heading2", tag: "h2" },
    { name: "Heading3", tag: "h3" },
    { name: "Text", tag: "p" },
    { name: "To-do list", tag: "input" },
    { name: "Bulleted list", tag: "ul" },
    { name: "Numbered list", tag: "ol" },
    { name: "Quote", tag: "cite" },
];

interface DropdownBoxProps {
    handleBlockChange: (index: number, key: keyof BlockType, value: string) => void;
    index: number;
}

const DropdownBox = ({ handleBlockChange, index }: DropdownBoxProps) => {
    return (
        <DropDownContainer>
            {TAG_LIST.map((curTag, i) => (
                <SelectItem key={i} onMouseDown={() => handleBlockChange(index, "type", curTag.tag)}>
                    {curTag.name}
                </SelectItem>
            ))}
        </DropDownContainer>
    );
};

export default DropdownBox;

const DropDownContainer = styled.div`
    position: absolute;
    z-index: 10;
    border: none;
    border-radius: 10px;
    top: 100%;
    left: 0;
    width: 200px;
    height: 220px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 3px;
    overflow: hidden;
`;

const SelectItem = styled.div`
    z-index: 10;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ccc;
    background-color: white;
    &:last-child {
        border-bottom: none;
    }
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;
