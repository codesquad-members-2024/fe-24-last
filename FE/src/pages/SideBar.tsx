import usePageList from "../hooks/usePageList";
import PageListCard from "../components/PageListCard/PageListCard";
import { FormOutlined, DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import * as S from "../styles/SideBarStyle";
import Loading from "./Loading";
import NewPageBtn from "../components/NewPageBtn/NewPageBtn";
import { Link } from "react-router-dom";
import { useState } from "react";
interface ChildrenType {
    type: string;
    content: string;
}

export interface BlockType {
    type: string;
    content: string;
    children: [ChildrenType] | [];
}

export interface PageType {
    _id: string;
    title: string;
    blocklist: [BlockType] | [];
    parent_id: string | null;
}

const SideBar = () => {
    const { data, isLoading } = usePageList();
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
                    <NewPageBtn parentId={null} iconComponent={<FormOutlined />} />
                </S.IconWrap>
            </S.SideBarHeader>
            <S.PageCardWrap>
                {isLoading ? (
                    <Loading />
                ) : (
                    data
                        .filter((page: PageType) => !page.parent_id)
                        .map((page: PageType) => (
                            <PageListCard
                                key={page._id}
                                page={page}
                                pages={data}
                            />
                        ))
                )}
            </S.PageCardWrap>
        </S.SideBarContainer>
        <S.RightIcon>
        {isSIdeToggle && <DoubleRightOutlined onClick={handleSideToggle}/>}
        </S.RightIcon>
        </>
    );
};

export default SideBar;
