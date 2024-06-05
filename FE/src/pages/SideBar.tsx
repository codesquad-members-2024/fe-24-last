import usePageList from "../hooks/usePageList";
import PageListCard from "../components/PageListCard/PageListCard";
import { FormOutlined } from "@ant-design/icons";
import * as S from "../styles/SideBarStyle";
import Loading from "./Loading";
import NewPageBtn from "../components/NewPageBtn/NewPageBtn";
interface ChildrenType {
    type: String;
    content: String;
}

interface BlockType {
    type: String;
    content: String;
    children: [ChildrenType] | [];
}

export interface PageType {
    _id: string;
    title: String;
    blocklist: [BlockType] | [];
    parent_id: String | null;
}

const SideBar = () => {
    const { data, isLoading } = usePageList();

    return (
        <S.SideBarContainer>
            <S.SideBarHeader>
                <S.TitleBox>Notion</S.TitleBox>
                <NewPageBtn parentId={null} iconComponent={FormOutlined} />
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
