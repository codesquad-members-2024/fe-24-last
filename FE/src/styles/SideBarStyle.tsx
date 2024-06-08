import styled from "styled-components";

const SideBarContainer = styled.section`
    width: 250px;
    height: 100%;
    background-color: #F7F7F5;
    border-right: 1px solid #E1E1DF;
    top: 0;
    left: 0;
    overflow-y: auto;
`
const SideBarHeader = styled.header`
    width: 100%;
    height: 32px;
    margin: 10px 0px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const TitleBox = styled.h3`
    width: 80%;
    margin-left: 15px;
    font-weight: bold;
`

const PageCardWrap = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px
`

export {SideBarContainer, SideBarHeader, TitleBox, PageCardWrap}