import React from "react";
import styled from "styled-components";
import useCreatePage from "../../hooks/useCreatePage";
import { useNavigate } from "react-router-dom";
interface NewPageBtnProps {
    parentId: string | null;
    iconComponent: React.ReactNode;
    type: string;
    queryURL: string
}

const NewPageBtn = ({
    parentId,
    iconComponent,
    type,
    queryURL
}: NewPageBtnProps) => {
    const navigate = useNavigate()
    const { mutate } = useCreatePage(type, queryURL);

    const handleCreatePage = () => {
        mutate(parentId, {
            onSuccess: (newData) => {
                // if(queryURL !== "newPage" && queryURL !== "newTemplate") return;
                navigate(`/${type}/${newData._id}`, { state: newData } );
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
    background-color: transparent;
    margin-right: 10px;
    font-size: 15px;
`;
