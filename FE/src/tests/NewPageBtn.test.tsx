import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import useCreatePage from "../hooks/useCreatePage";
import NewPageBtn from "../components/NewPageBtn/NewPageBtn";
import { PlusOutlined } from "@ant-design/icons";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

jest.mock("../hooks/useCreatePage");

const mockUseCreatePage = useCreatePage as jest.MockedFunction<
    typeof useCreatePage
>;
const mockMutate = jest.fn();

describe("NewPageBtn Component Test", () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        mockUseCreatePage.mockReturnValue({ mutate: mockMutate });
        (
            useNavigate as jest.MockedFunction<typeof useNavigate>
        ).mockReturnValue(mockNavigate);
        jest.clearAllMocks();
    });

    it("아이콘 컴포넌트가 렌더링되는지 확인", () => {
        render(<NewPageBtn parentId="123" iconComponent={<PlusOutlined />} />);
        const iconElement = screen.getByRole("button");
        expect(iconElement).toBeInTheDocument();
    });

    it("버튼 클릭 시 handleCreatePage가 호출되는지 확인", () => {
        render(<NewPageBtn parentId="123" iconComponent={<PlusOutlined />} />);
        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement);
        expect(mockMutate).toHaveBeenCalledWith("123", expect.any(Object));
    });

    it("onSuccess 콜백이 올바르게 동작하는지 확인", () => {
        const newPageData = { _id: "newPageId", name: "New Page" };
        render(<NewPageBtn parentId="123" iconComponent={<PlusOutlined />} />);
        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement);

        const mutateOptions = mockMutate.mock.calls[0][1];
        mutateOptions.onSuccess(newPageData);

        expect(mockNavigate).toHaveBeenCalledWith(`/page/${newPageData._id}`, {
            state: newPageData,
        });
    });
});
