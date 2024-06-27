import { useQuery } from "react-query";
import { getPagesData } from "../services/pageService";

const useFetchData = (tableName: string) => {
    return useQuery({
        queryKey: [tableName],
        queryFn: () => getPagesData(tableName),
    });
};

export default useFetchData;
