import { useQueryClient, useMutation } from "react-query";
import { postNewPage } from "../services/pageService";

const useCreatePage = (type: string, queryURL: string) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (parentId: string | null) => {
            const newPageData = await postNewPage(parentId, queryURL);
            return newPageData;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [type === "page" ? "pageList" : "templateList"] });
        },
    });
    return { mutate };
};

export default useCreatePage;
