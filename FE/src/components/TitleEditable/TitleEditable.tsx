import styled from "styled-components";
import { useTitleContext } from "../../hooks/useTitleContext";
import { useQueryClient, useMutation } from "react-query";
import { patchTitle } from "../../services/pageService";
import debounce from "../../utils/debounce";
import React , { useCallback }from "react";

interface TitleForm {
    title: string;
}

interface TitleEditorProps {
    id: string | undefined, 
    title: string
}

interface TitleMutateType {
    id: string; 
    title: TitleForm
}

const TitleEditable = ({ id, title }: TitleEditorProps) => {
    const queryClient = useQueryClient();
    const { setCurrentTitle } = useTitleContext();

    const { mutate } = useMutation({
        mutationFn: async ({ id, title }: TitleMutateType) => {
            await patchTitle(`page/title/${id}`, title);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pageList"] });
        },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedMutation = useCallback(
        debounce(async ({ id, title }: TitleMutateType) => {
            mutate({ id, title });
        }),
        [mutate]
    );

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const newTitle = e.currentTarget.textContent ?? "";
        setCurrentTitle(newTitle);
        if (id) debouncedMutation({ id, title: { title: newTitle } });
    };


    return (
        <TitleView
            contentEditable
            suppressContentEditableWarning={true}
            aria-placeholder="Untitled"
            onInput={handleInput}
        >
            {title}
        </TitleView>
    );
};

export default TitleEditable;

const TitleView = styled.div`
    max-width: 708px;
    outline: none;
    padding: 3px 0px;
    font-weight: bold;
    font-size: 45px;
    margin: 50px auto 0px;
    &:empty:before {
        content: attr(aria-placeholder);
        color: #aaa;
        position: absolute;
    }
`;
