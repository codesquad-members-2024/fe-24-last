import styled from "styled-components";
import React, { useImperativeHandle, useState, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutSide";
const TAG_LIST = [
    { name: "Heading1", tag: "h1" },
    { name: "Heading2", tag: "h2" },
    { name: "Heading3", tag: "h3" },
    { name: "Text", tag: "p" },
    { name: "Quote", tag: "cite" },
];
interface DropdownBoxProps {
    handleTagChange: (index: number, newType: string) => void;
    index: number;
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface DropdownBoxHandle {
    focus: () => void;
}

const DropdownBox = React.forwardRef<DropdownBoxHandle, DropdownBoxProps>(
    ({  handleTagChange, index, setDropdownOpen }, ref) => {
        const [selectItemIdx, setSelectItemIdx] = useState(0);
        const [hoverItemIdx, setHoverItemIdx] = useState<number | null>(null);
        const dropDownRef = useRef<HTMLDivElement>(null);
        
        useOnClickOutside(dropDownRef, setDropdownOpen);

        const handleBlockClick = (selectTag: string) => {
            handleTagChange(index, selectTag);
            setDropdownOpen(false)
        }

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
                setDropdownOpen(false)
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

DropdownBox.displayName
export default DropdownBox;

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