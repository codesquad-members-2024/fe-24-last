import { useQueryClient, useMutation } from "react-query";
import { deletePage } from "../services/pageService";

const useDeletePage = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (id: string) => {
            await deletePage(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pageList"] });
        },
    });
    return { mutate };
};

export default useDeletePage;
