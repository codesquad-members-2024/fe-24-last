import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import SideBar from "../pages/SideBar";
import usePageList from "../hooks/useFetchData";
import { PageType } from "../components/PageCardWrap/PageCardWrap";
import { QueryClient, QueryClientProvider } from "react-query";

interface UseQueryResult<TData = unknown, TError = unknown> {
    data: TData | undefined;
    isLoading: boolean;
    isError?: boolean;
    error?: TError | null;
    isSuccess?: boolean;
    isFetching?: boolean;
    refetch?: () => void;
    remove?: () => void;
    status?: "idle" | "loading" | "error" | "success";
}

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

jest.mock("../hooks/usePageList");

const mockUsePageList = usePageList as jest.MockedFunction<typeof usePageList>;

const samplePages: PageType[] = [
    {
        _id: "1",
        title: "Sample Page",
        blocklist: [],
        parent_id: null,
    },
    {
        _id: "2",
        title: "Child Page",
        blocklist: [],
        parent_id: "1",
    },
];

describe("SideBar", () => {
    const queryClient = new QueryClient();

    const renderWithClient = (ui: React.ReactElement) => {
        return render(
            <QueryClientProvider client={queryClient}>
                {ui}
            </QueryClientProvider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("데이터가 로드되었을 때 필터링 후 부모 페이지 카드가 렌더링되는지 확인", () => {
        const mockData: UseQueryResult<PageType[], unknown> = {
            data: samplePages,
            isLoading: false,
            isError: false,
            error: null,
            isSuccess: true,
            isFetching: false,
            refetch: jest.fn(),
            remove: jest.fn(),
            status: "success",
        };

        mockUsePageList.mockReturnValue(mockData as unknown as ReturnType<typeof usePageList>);

        renderWithClient(<SideBar />);

        expect(screen.getByText("Sample Page")).toBeInTheDocument();
        expect(screen.queryByText("Child Page")).not.toBeInTheDocument();
    });
});
