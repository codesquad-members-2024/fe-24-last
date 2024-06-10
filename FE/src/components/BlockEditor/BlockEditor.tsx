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
}

const BlockEditor = ({ index, id, type, content, handleContentChange }: BlockEditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isComposing, setIsComposing] = useState(false);
    const caretPositionRef = useRef<{
        startContainer: Node;
        startOffset: number;
        endContainer: Node;
        endOffset: number;
    } | null>(null);

    const handleInput = () => {
        saveCaretPosition(caretPositionRef);
        if (!isComposing && editorRef.current && caretPositionRef.current) {
            const newContent = editorRef.current.textContent ?? "";
            handleContentChange(index, newContent);
        }
    };

    const handleCompositionEnd = () => {
        setIsComposing(false);
        if (editorRef.current) {
            const newContent = editorRef.current.textContent ?? "";
            handleContentChange(index, newContent);
        }
    };

    useEffect(() => {
        const selection = window.getSelection();
        selection?.removeAllRanges();
        if (editorRef.current) {
            editorRef.current.blur();
        }
        caretPositionRef.current = null;
    }, [id]);

    useEffect(() => {
        if (!isComposing && caretPositionRef.current) {
            restoreCaretPosition(caretPositionRef);
        }
    }, [content, isComposing]);

    return (
        <Block
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning={true}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={handleCompositionEnd}
            onInput={handleInput}
            $type={type as keyof typeof blockStyles}
        >
            {content}
        </Block>
    );
};

export default BlockEditor;
