import { useQuery } from "react-query";
import { getPagesData } from "../services/pageService";

const usePageList = () => {
    return useQuery({
        queryKey: ["pageList"],
        queryFn: () => getPagesData(),
    });
};

export default usePageList;
