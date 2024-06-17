import { useEffect, useRef, useState } from "react";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { BlockType } from "../../pages/SideBar";
import restoreCaretPosition from "../../utils/restoreCaretPosition";
import saveCaretPosition from "../../utils/saveCaretPosition";
import DropdownBox from "../DropdownBox/DropdownBox";
import * as S from "../../styles/BlockStyle";
interface BlockEditorProps {
    index: number;
    id: string | undefined;
    type: string;
    content: string;
    handleBlockChange: (index: number, key: keyof BlockType, value: string) => void;
    handleKeyDown: (
        e: React.KeyboardEvent<HTMLDivElement>,
        index: number
    ) => void;
    dragHandleProps: DraggableProvidedDragHandleProps | null;
}

const BlockEditable = ({
    index,
    id,
    type,
    content,
    handleBlockChange,
    handleKeyDown,
    dragHandleProps,
}: BlockEditorProps) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [isFocus, setFocus] = useState(false)
    const dropDownRef = useRef<HTMLDivElement>(null)
    const caretPositionRef = useRef<{
        startContainer: Node;
        startOffset: number;
        endContainer: Node;
        endOffset: number;
    } | null>(null);

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        saveCaretPosition(caretPositionRef);
        const newContent = (e.currentTarget as HTMLDivElement).textContent ?? "";
        handleBlockChange(index, "content", newContent)
        if (newContent === "/" && isFocus) {
            setDropdownOpen(true);
        } else {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        const selection = window.getSelection();
        selection?.removeAllRanges();
        caretPositionRef.current = null;
    }, [id]);

    useEffect(() => {
            restoreCaretPosition(caretPositionRef);
    }, [content]);

    useEffect(() => {
        if (isDropdownOpen) {
            dropDownRef.current?.focus();
        }
    }, [isDropdownOpen]);

    return (
        <S.BlockContainer>
            <S.DragHandle {...dragHandleProps} />
            <S.Block
                as={type}
                data-position={index}
                contentEditable
                suppressContentEditableWarning={true}
                aria-placeholder="글을 작성하려면 '스페이스'키를, 명령어를 사용하려면 '/'키를 누르세요."
                onInput={handleInput}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={()=> setFocus(true)}
                onBlur={()=> setFocus(false)}
                $type={type as keyof typeof S.blockStyles}
            >
                {content}
            </S.Block>
            {isDropdownOpen && (
                <DropdownBox handleBlockChange={handleBlockChange} index={index} ref={dropDownRef}/>
            )}
        </S.BlockContainer>
    );
};

export default BlockEditable;

