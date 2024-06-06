import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useNavigate } from "react-router-dom";
import useDeletePage from "../hooks/useDeletePage";
import PageListCard from "../components/PageListCard/PageListCard";
import { PageType } from "../pages/SideBar";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

jest.mock("../hooks/useDeletePage");

const mockUseDeletePage = useDeletePage as jest.MockedFunction<
    typeof useDeletePage
>;
const mockMutate = jest.fn();

const testPage: PageType = {
    _id: "1",
    title: "test page",
    blocklist: [],
    parent_id: null,
};
const testPages: PageType[] = [
    {
        _id: "1",
        title: "test page",
        blocklist: [],
        parent_id: null,
    },
    {
        _id: "2",
        title: "Child page",
        blocklist: [],
        parent_id: "1",
    },
];

describe("PageListCard Component Test", () => {
    const mockNavigate = jest.fn();
    const queryClient = new QueryClient();


    beforeEach(() => {
        mockUseDeletePage.mockReturnValue({ mutate: mockMutate });
        (
            useNavigate as jest.MockedFunction<typeof useNavigate>
        ).mockReturnValue(mockNavigate);
        jest.clearAllMocks();
    });

    const renderWithClient = (ui: React.ReactElement) => {
        return render(
            <QueryClientProvider client={queryClient}>
                {ui}
            </QueryClientProvider>
        );
    };

    it("컴포넌트가 올바르게 렌더링되는지 확인", () => {
        renderWithClient(<PageListCard page={testPage} pages={testPages} />);
        expect(screen.getByText("test page")).toBeInTheDocument();
    });

    it("토글 버튼 클릭 시 하위 페이지가 렌더링되는지 확인", () => {
        renderWithClient(<PageListCard page={testPage} pages={testPages} />);
        const toggleButton = screen.getByLabelText("toggle-button");
        fireEvent.click(toggleButton);
        expect(screen.getByText("Child page")).toBeInTheDocument();
    });
    
    it("페이지 링크 클릭 시 navigate 함수가 호출되는지 확인", () => {
        renderWithClient(<PageListCard page={testPage} pages={testPages} />);
        const pageLink = screen.getByText("test page");
        fireEvent.click(pageLink);
        expect(mockNavigate).toHaveBeenCalledWith("/page/1", { state: testPage })
    })

    it("삭제 버튼 클릭 시 mutate 함수가 호출되는지 확인", () => {
        renderWithClient(<PageListCard page={testPage} pages={testPages} />);
        const deleteButton = screen.getByRole("button", { name: /minus/i });
        fireEvent.click(deleteButton);
        expect(screen.getByText("정말 삭제하시겠습니까?")).toBeInTheDocument();
    });


});
