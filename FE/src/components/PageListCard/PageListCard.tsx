import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PageType } from "../../pages/SideBar";
import * as S from "../../styles/PageListCardStyle";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import NewPageBtn from "../NewPageBtn/NewPageBtn";
import useDeletePage from "../../hooks/useDeletePage";
import ModalComponent from "../Modal/Modal";

interface PageListCardProps {
    page: PageType;
    pages: PageType[];
    depth?: number;
}

const PageListCard = ({ page, pages, depth = 0 }: PageListCardProps) => {
    const navigate = useNavigate();
    const { mutate } = useDeletePage();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleLinkClick = () =>
        navigate(`/page/${page._id}`, { state: page });
    const handleDeletePage = async () => mutate(page._id);

    const childPages = () => pages.filter((p) => p.parent_id === page._id);

    return (
        <>
            <S.CardContainer>
                <S.ToggleLinkWrap>
                    <S.ToggleBtn
                        onClick={handleToggle}
                        $isOpen={isOpen}
                        $depth={depth}
                    ></S.ToggleBtn>
                    <S.CustomLink onClick={handleLinkClick}>
                        {page.title}
                    </S.CustomLink>
                </S.ToggleLinkWrap>
                <S.ControlBox>
                    <ModalComponent
                        callBack={handleDeletePage}
                        iconComponent={<MinusOutlined />}
                        message="정말 삭제하시겠습니끼?"
                    />
                    <NewPageBtn
                        parentId={page._id}
                        iconComponent={PlusOutlined}
                    />
                </S.ControlBox>
            </S.CardContainer>
            {isOpen &&
                childPages().map((childPage) => (
                    <PageListCard
                        key={childPage._id}
                        page={childPage}
                        pages={pages}
                        depth={depth + 1}
                    />
                ))}
        </>
    );
};

export default React.memo(PageListCard);
