import { useQueryClient, useMutation } from "react-query";
import { deletePage } from "../services/pageService";

const useDeletePage = (type: string) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (id: string) => {
            await deletePage(id, type);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [type === "page" ? "pageList" : "templateList"] });
        },
    });
    return { mutate };
};

export default useDeletePage;
