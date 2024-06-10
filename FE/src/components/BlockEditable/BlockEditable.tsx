import { useEffect, useRef, useState } from "react";
import Block from "../../styles/BlockStyle";
import { blockStyles } from "../../styles/BlockStyle";
import restoreCaretPosition from "../../utils/restoreCaretPosition";
import saveCaretPosition from "../../utils/saveCaretPosition";

interface BlockEditorProps {
    index: number;
    id: string | undefined;
    type: string;
    content: string;
    handleContentChange: (index: number, content: string) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, index: number) => void;
}

const BlockEditable = ({ index, id, type, content, handleContentChange, handleKeyDown }: BlockEditorProps) => {
    const [isComposing, setIsComposing] = useState(false);
    const caretPositionRef = useRef<{
        startContainer: Node;
        startOffset: number;
        endContainer: Node;
        endOffset: number;
    } | null>(null);
    
    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        saveCaretPosition(caretPositionRef);
        if (!isComposing && e.currentTarget && caretPositionRef.current) {
            const newContent = (e.currentTarget as HTMLDivElement).textContent ?? "";
            handleContentChange(index, newContent);
        }
    };

    const handleCompositionEnd = (e: React.FormEvent<HTMLDivElement>) => {
        setIsComposing(false);
        const newContent = (e.currentTarget as HTMLDivElement).textContent ?? "";
        handleContentChange(index, newContent);
    };

    useEffect(() => {
        const selection = window.getSelection();
        selection?.removeAllRanges();
        caretPositionRef.current = null;
    }, [id]);

    useEffect(() => {
        if (!isComposing && caretPositionRef.current) {
            restoreCaretPosition(caretPositionRef);
        }
    }, [content, isComposing]);

    return (
        <Block
            data-position={index}
            contentEditable
            suppressContentEditableWarning={true}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={handleCompositionEnd}
            aria-placeholder="글을 작성하려면 '스페이스'키를, 명령어를 사용하려면 '/'키를 누르세요."
            onInput={handleInput}
            onKeyDown={(e) => handleKeyDown(e, index)}
            $type={type as keyof typeof blockStyles}
        >
            {content}
        </Block>
    );
};

export default BlockEditable;
