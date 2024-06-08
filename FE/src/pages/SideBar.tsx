import usePageList from "../hooks/usePageList";
import PageListCard from "../components/PageListCard/PageListCard";
import { FormOutlined } from "@ant-design/icons";
import * as S from "../styles/SideBarStyle";
import Loading from "./Loading";
import NewPageBtn from "../components/NewPageBtn/NewPageBtn";
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

    return (
        <S.SideBarContainer>
            <S.SideBarHeader>
                <S.TitleBox>Notion</S.TitleBox>
                <NewPageBtn parentId={null} iconComponent={<FormOutlined/>} />
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
    );
};

export default SideBar;
