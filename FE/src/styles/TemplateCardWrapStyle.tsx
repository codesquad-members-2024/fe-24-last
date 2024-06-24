import styled from "styled-components";

const TemplateCardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const TemplateText = styled.div`
    font-size: 13px;
    color: #6c757d;
    font-weight: bold;
    padding: 4px;
`;

const TemplateCard = styled.div`
    cursor: pointer;
    padding: 0px 10px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 15px;
    transition: background-color 0.3s;

    &:hover {
        button {
            background-color: #E8E8E6;
        }

        background-color: #E8E8E6;
        border: 1px solid #E8E8E6;


    }
`;

export {TemplateCardContainer, TemplateText, TemplateCard}
