import { useQueryClient, useMutation } from "react-query";
import { postNewPage } from "../services/pageService";

const useCreatePage = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (parentId: string | null) => {
            const newPageData = await postNewPage(parentId);
            return newPageData;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pageList"] });
        },
    });
    return { mutate };
};

export default useCreatePage;
