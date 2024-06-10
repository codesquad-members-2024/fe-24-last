import { render, screen, fireEvent } from "@testing-library/react";
import ModalComponent from "../components/Modal/Modal";
import { MinusOutlined } from "@ant-design/icons";

describe("ModalComponent test", () => {
    beforeEach(() => jest.clearAllMocks());

    const mockCallback = jest.fn();

    it("아이콘 컴포넌트가 보이는지 확인", () => {
        render(
            <ModalComponent
                callBack={mockCallback}
                iconComponent={<MinusOutlined />}
                message="정말 삭제하시겠습니까?"
            />
        );

        const iconElement = screen.getByRole("button");
        expect(iconElement).toBeInTheDocument();
    });

    it("모달이 띄워졌을때 message text가 보이는지 확인", () => {
        render(
            <ModalComponent
                callBack={mockCallback}
                iconComponent={<MinusOutlined />}
                message="정말 삭제하시겠습니까?"
            />
        );

        const iconElement = screen.getByRole("button");
        fireEvent.click(iconElement);
        expect(screen.getByText("정말 삭제하시겠습니까?")).toBeInTheDocument();
    });

    it("OK 버튼을 눌렀을때 Callback이 실행되는지 확인", () => {
        render(
            <ModalComponent
                callBack={mockCallback}
                iconComponent={<MinusOutlined />}
                message="정말 삭제하시겠습니까?"
            />
        );

        const iconElement = screen.getByRole("button");
        fireEvent.click(iconElement);
        const okButton = screen.getByRole('button', { name: /ok/i });
        fireEvent.click(okButton);
        expect(mockCallback).toBeCalled();
    })

    it("CanCle 버튼을 눌렀을때 모달창이 닫히는지 확인", () => {
        render(
            <ModalComponent
                callBack={mockCallback}
                iconComponent={<MinusOutlined />}
                message="정말 삭제하시겠습니까?"
            />
        );

        const iconElement = screen.getByRole("button");
        fireEvent.click(iconElement);
        const cancelButton = screen.getByRole("button", { name: /cancel/i });
        fireEvent.click(cancelButton);
        expect(screen.queryByText("정말 삭제하시겠습니까")).not.toBeInTheDocument()
    })
});
