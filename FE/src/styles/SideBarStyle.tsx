import styled from "styled-components";

const SideBarContainer = styled.section<{ $isSideToggle: boolean }>`
    transform: ${({ $isSideToggle }) =>
        $isSideToggle ? "translate(-100%);" : "translate(0);"};
    transition: transform 0.5s;
    width: 250px;
    height: 100%;
    background-color: #f7f7f5;
    border-right: 1px solid #e1e1df;
    top: 0;
    left: 0;
    overflow-y: auto;
    position: ${({ $isSideToggle }) =>
        $isSideToggle && "absolute"};
`;
const SideBarHeader = styled.header`
    width: 100%;
    height: 32px;
    margin: 10px 0px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const TitleBox = styled.h3`
    width: 80%;
    margin-left: 15px;
    font-weight: bold;
`;

const PageCardWrap = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const IconWrap = styled.div`
    display: flex;
    gap: 2px;
`;

const RightIcon = styled.div`
    display: flex;
    position: absolute;
    padding: 5px;
`;

export { SideBarContainer, SideBarHeader, TitleBox, PageCardWrap, IconWrap, RightIcon };
