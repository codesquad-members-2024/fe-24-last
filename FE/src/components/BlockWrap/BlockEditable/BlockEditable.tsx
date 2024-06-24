import React, { useEffect, useRef, useState } from "react";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import restoreCaretPosition from "../../../utils/restoreCaretPosition";
import saveCaretPosition from "../../../utils/saveCaretPosition";
import DropdownBox from "./DropdownBox/DropdownBox";
import * as S from "../../../styles/BlockStyle";
import TextSwitcherBox from "./TextSwitcherBox/TextSwitcherBox";

interface BlockEditorProps {
    index: number;
    id: string | undefined;
    type: string;
    content: string;
    handleContentChange: (index: number, newContent: string) => void;
    handleTagChange: (index: number, newType: string) => void;
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
    handleContentChange,
    handleTagChange,
    handleKeyDown,
    dragHandleProps,
}: BlockEditorProps) => {
    
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isTextSwitcher, setIsTextSwitcher] = useState(false);
    const [isFocus, setFocus] = useState(false);
    const dropDownRef = useRef<HTMLDivElement>(null);
    const blockRef = useRef<HTMLDivElement>(null);
    const caretPositionRef = useRef<{
        startContainer: Node;
        startOffset: number;
        endContainer: Node;
        endOffset: number;
    } | null>(null);

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        saveCaretPosition(caretPositionRef);
        const newContent = (e.currentTarget as HTMLDivElement).textContent ?? "";
        handleContentChange(index, newContent);
        if (newContent === "/" && isFocus) {
            setDropdownOpen(true);
        } else {
            setDropdownOpen(false);
        }
    };

    const handleMouseUp = () => {
        const selection = window.getSelection();
        const selectText = selection?.toString();
        if (selectText !== "" && isFocus) return setIsTextSwitcher(true);
        return setIsTextSwitcher(false);
    };

    useEffect(() => {
        const selection = window.getSelection();
        selection?.removeAllRanges();
        caretPositionRef.current = null;
    }, [id]);

    useEffect(() => {
        if (content !== "") restoreCaretPosition(caretPositionRef);
    }, [content]);

    useEffect(() => {
        if (isDropdownOpen) {
            dropDownRef.current?.focus();
        }
    }, [isDropdownOpen, isFocus]);

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
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onMouseUp={handleMouseUp}
                ref={blockRef}
                $isFocus={isFocus}
                dangerouslySetInnerHTML={{ __html: content }}
            >
            </S.Block>
            {isDropdownOpen && (
                <DropdownBox
                    handleTagChange={handleTagChange}
                    index={index}
                    ref={dropDownRef}
                    setDropdownOpen={setDropdownOpen}
                />
            )}
            {isTextSwitcher && (
                <TextSwitcherBox
                    setIsTextSwitcher={setIsTextSwitcher}
                    index={index}
                    handleContentChange={handleContentChange}
                    blockRef={blockRef}
                />
            )}
        </S.BlockContainer>
    );
};

export default BlockEditable;
