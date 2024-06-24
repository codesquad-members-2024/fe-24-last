import React, { useImperativeHandle, useState, useRef } from "react";
import useOnClickOutside from "../../../../hooks/useOnClickOutSide";
import * as S from "../../../../styles/DropdownBoxStyle"
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

export interface DropdownBoxHandle {focus: () => void}

type KeyMap = "ArrowDown" | "ArrowUp" | "Enter";

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

        const dropdownKeyMap = {
            ArrowDown: () => setSelectItemIdx((prevIndex) => Math.min(prevIndex + 1, TAG_LIST.length - 1)),
            ArrowUp: () => setSelectItemIdx((prevIndex) => Math.max(prevIndex - 1, 0)),
            Enter: () => handleBlockClick(TAG_LIST[selectItemIdx].tag),
            Escape: () => setDropdownOpen(false),
        }

        const handleDropDownKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (!["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) return;
            dropdownKeyMap[e.key as KeyMap]();
        };

        return (
            <S.DropDownContainer >
                {TAG_LIST.map((curTag, i) => (
                    <S.SelectItem
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
                    </S.SelectItem>
                ))}
            </S.DropDownContainer>
        );
    }
);

DropdownBox.displayName
export default DropdownBox;