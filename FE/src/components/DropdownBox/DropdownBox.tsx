import styled from "styled-components";
import { BlockType } from "../../pages/SideBar";
import moveCursorToStartEnd from "../../utils/MoveCursorToStartEnd";
import React, { useImperativeHandle, useState, useRef } from "react";

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
    handleBlockChange: (
        index: number,
        key: keyof BlockType,
        value: string
    ) => void;
    index: number;
}

export interface DropdownBoxHandle {
    focus: () => void;
}

const DropdownBox = React.forwardRef<DropdownBoxHandle, DropdownBoxProps>(
    ({ handleBlockChange, index }, ref) => {
        const [selectItemIdx, setSelectItemIdx] = useState(0);
        const [hoverItemIdx, setHoverItemIdx] = useState<number | null>(null);
        const dropDownRef = useRef<HTMLDivElement>(null);

        const handleBlockClick = (selectTag: string) => {
            console.log(selectTag)
            handleBlockChange(index, "type", selectTag);
            const currentBlock = document.querySelector<HTMLDivElement>(
                `[data-position="${index}"]`
            );
            if (currentBlock) moveCursorToStartEnd(currentBlock, true);
        };

        useImperativeHandle(ref, () => ({
            focus() {
                dropDownRef.current?.focus();
            }
        }));

        const handleDropDownKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (e.key === "ArrowDown") {
                setSelectItemIdx((prevIndex) => Math.min(prevIndex + 1, TAG_LIST.length - 1));
            } else if (e.key === "ArrowUp") {
                setSelectItemIdx((prevIndex) => Math.max(prevIndex - 1, 0));
            } else if (e.key === "Enter") {
                handleBlockClick(TAG_LIST[selectItemIdx].tag);
            }
        };

        return (
            <DropDownContainer >
                {TAG_LIST.map((curTag, i) => (
                    <SelectItem
                        ref={dropDownRef} 
                        tabIndex={0}
                        key={i}
                        onMouseDown={() => handleBlockClick(curTag.tag)}
                        onMouseEnter={() => setHoverItemIdx(i)}
                        onMouseLeave={() => {
                            setSelectItemIdx(i)
                            setHoverItemIdx(null);
                        }}
                        onKeyDown={(e) => handleDropDownKeyDown(e)}
                        $selectItemIdx={i === selectItemIdx}
                        $hoverItemIdx={hoverItemIdx}
                    >
                        {curTag.name}
                    </SelectItem>
                ))}
            </DropDownContainer>
        );
    }
);

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