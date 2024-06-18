import React, { useState } from "react";
import { Modal } from "antd";
import styled from "styled-components";

interface ModalComponentProps {
    callBack: () => void;
    iconComponent: React.ReactNode;
    message: string;
}

export const ModalComponent = ({callBack, iconComponent, message }: ModalComponentProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    
    const handleCancel = () => setIsModalOpen(false);
    const handleOk = () => {
        setIsModalOpen(false);
        callBack()
    };
    return (
        <>
            <ButtonIcon onClick={showModal}>
                {iconComponent}
            </ButtonIcon>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {message}
            </Modal>
        </>
    );
};

export default ModalComponent;

const ButtonIcon = styled.button`
    border: none;
`