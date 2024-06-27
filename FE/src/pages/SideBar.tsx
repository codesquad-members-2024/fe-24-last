import React,{ useState } from "react";
import { Link } from "react-router-dom";
import NewPageBtn from "../components/NewPageBtn/NewPageBtn";
import * as S from "../styles/SideBarStyle";
import { FormOutlined, DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import PageCardWrap from "../components/PageCardWrap/PageCardWrap";
import TemplateCardWrap from "../components/TemplateCardWrap/TemplateCardWrap";

const SideBar = () => {
    const [isSIdeToggle, setSideToggle] = useState(false)

    const handleSideToggle = () => setSideToggle(!isSIdeToggle)
    return (
        <>
        <S.SideBarContainer $isSideToggle={isSIdeToggle}>
            <S.SideBarHeader>
                <S.TitleBox>
                    <Link to="/">Notion</Link>
                </S.TitleBox>
                <S.IconWrap>
                    {!isSIdeToggle && <DoubleLeftOutlined onClick={handleSideToggle}/>}
                    <NewPageBtn parentId={null} iconComponent={<FormOutlined />} type="page" queryURL="newPage"/>
                </S.IconWrap>
            </S.SideBarHeader>

            <S.ContentWrapper>
                <PageCardWrap/>
                <TemplateCardWrap/>
            </S.ContentWrapper>

        </S.SideBarContainer>
        <S.RightIcon>
        {isSIdeToggle && <DoubleRightOutlined onClick={handleSideToggle}/>}
        </S.RightIcon>
        </>
    );
};

export default SideBar;
