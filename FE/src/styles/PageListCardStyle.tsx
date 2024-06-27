import styled from "styled-components";
import { RightOutlined } from "@ant-design/icons";

const ToggleLinkWrap = styled.div`
    display: inline-block;
    gap: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
`;

const ControlBox = styled.div`
    display: flex;
    gap: 2px;
    font-size: 13px;
    visibility: hidden;
`;

const ToggleBtn = styled(RightOutlined)<{ $isOpen: boolean, $depth: number }>`
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
    transition: transform 0.2s;
    margin-left: ${({$depth}) => ($depth * 20)}px;
    font-size: 15px;
`;

const CardContainer = styled.div`
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

        ${ControlBox} {
            visibility: visible;
        }

    }
`;

const CustomLink = styled.span`
    cursor: pointer;
    margin-left: 5px;
`;

export {ToggleLinkWrap, ToggleBtn, CardContainer, ControlBox, CustomLink}