import React from "react";
import styled from "styled-components";
import useCreatePage from "../../hooks/useCreatePage";
import { useNavigate } from "react-router-dom";
interface NewPageBtnProps {
    parentId: string | null;
    iconComponent: React.ReactNode;
}

const NewPageBtn = ({
    parentId,
    iconComponent,
}: NewPageBtnProps) => {
    const navigate = useNavigate()
    const { mutate } = useCreatePage();

    const handleCreatePage = () => {
        mutate(parentId, {
            onSuccess: (newPageData) => {
                navigate(`/page/${newPageData._id}`, { state: newPageData} );
            }
        })
    }
    return (
        <BtnContainer onClick={handleCreatePage}>
            {iconComponent}
        </BtnContainer>
    );
};

export default NewPageBtn;

const BtnContainer = styled.button`
    border: none;
    background-color: #f7f7f5;
    margin-right: 10px;
    font-size: 15px;
`;
