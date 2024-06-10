import styled from "styled-components";
import { useTitleContext } from "../../hooks/useTitleContext";
import { useQueryClient, useMutation } from "react-query";
import { patchTitle } from "../../services/pageService";
import debounce from "../../utils/debounce";
import { useCallback} from "react";

interface TitleForm {
    title: string;
}

interface TitleEditorProps {
    id: string | undefined, 
    title: string
}

const TitleEditor = ({ id, title }: TitleEditorProps) => {
    const queryClient = useQueryClient();
    const { setCurrentTitle } = useTitleContext();

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
            onInput={handleInput}
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
