import styled from "styled-components";
import { useTitleContext } from "../../hooks/useTitleContext";
import { useQueryClient, useMutation } from "react-query";
import { patchTitle } from "../../services/pageService";
import debounce from "../../utils/debounce";
import { useCallback, useRef, useState } from "react";
import moveCursorToEnd from "../../utils/\bMoveCursorToEnd";

const DEBOUNCE_TIME = 1000;

interface TitleForm {
    title: string;
}

interface TitleEditorProps {
    id: string | undefined, 
    title: string
}

const TitleEditor = ({ id, title }: TitleEditorProps) => {
    const queryClient = useQueryClient();
    const textRef = useRef<HTMLDivElement | null>(null);
    const { setCurrentTitle } = useTitleContext();
    const [isComposing, setIsComposing] = useState(false);

    const { mutate } = useMutation({
        mutationFn: async ({ id, title }: { id: string; title: TitleForm }) => {
            await patchTitle(`page/title/${id}`, title);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pageList"] });
        },
    });

    const debouncedMutation = useCallback(
        debounce(async ({ id, title }: { id: string; title: TitleForm }) => {
            mutate({ id, title });
        }, DEBOUNCE_TIME),
        [mutate]
    );
    
    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const newTitle = e.currentTarget.textContent ?? "";
        setCurrentTitle(newTitle);
        if (id) debouncedMutation({ id, title: { title: newTitle } });
        if (!isComposing) moveCursorToEnd(e.currentTarget);
    };


    return (
        <TitleView
            ref={textRef}
            contentEditable
            suppressContentEditableWarning={true}
            onInput={handleInput}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
        >
            {title}
        </TitleView>
    );
};

export default TitleEditor;

const TitleView = styled.div`
    max-width: 708px;
    outline: none;
    padding: 3px 0px;
    font-weight: bold;
    font-size: 45px;
    margin: 50px auto 0px;
`;
