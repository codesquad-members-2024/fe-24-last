import Block from "../../styles/BlockStyle";
import { blockStyles } from "../../styles/BlockStyle";

interface BlockEditorProps {
    id: string | undefined;
    type: string;
    content: string;
}

const BlockEditor = ({ id, type, content }: BlockEditorProps) => {
    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        console.log(e.currentTarget.textContent)
    };
    

    return (
        <>
            <Block
                contentEditable
                suppressContentEditableWarning={true}
                onInput={handleInput}
                $type={type as keyof typeof blockStyles}
            >
                {content}
            </Block>
        </>
    );
};

export default BlockEditor;

