import React, { useCallback, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { PageType } from "../PageCardWrap";
import * as S from "../../../styles/PageListCardStyle";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import NewPageBtn from "../../NewPageBtn/NewPageBtn";
import useDeletePage from "../../../hooks/useDeletePage";
import ModalComponent from "../../Modal/Modal";
import { useTitleContext } from "../../../hooks/useTitleContext";

interface PageListCardProps {
    page: PageType;
    pages: PageType[];
    depth?: number;
}

const PageListCard = ({ page, pages, depth = 0 }: PageListCardProps) => {
    const navigate = useNavigate();
    const { mutate } = useDeletePage();
    const { id } = useParams()
    const [isOpen, setIsOpen] = useState(false);
    const { currentTitle, setCurrentTitle } = useTitleContext();

    const handleToggle = () => setIsOpen(!isOpen);
    const handleLinkClick = () => navigate(`/page/${page._id}`, { state: page });
    const handleDeletePage = async () => mutate(page._id);

    const childPages = useCallback(() => pages.filter((p) => p.parent_id === page._id), [pages, page])
    
    useLayoutEffect(() => {
        if (id === page._id) setCurrentTitle(page.title)
    }, [id, page._id, page.title, setCurrentTitle]);

    return (
        <>
            <S.CardContainer>
                <S.ToggleLinkWrap>
                    <S.ToggleBtn
                        onClick={handleToggle}
                        aria-label="toggle-button"
                        $isOpen={isOpen}
                        $depth={depth}
                    ></S.ToggleBtn>
                    <S.CustomLink onClick={handleLinkClick}>
                        {id === page._id ? currentTitle : page.title}
                    </S.CustomLink>
                </S.ToggleLinkWrap>
                <S.ControlBox>
                    <ModalComponent
                        callBack={handleDeletePage}
                        iconComponent={<MinusOutlined />}
                        message="정말 삭제하시겠습니까?"
                    />
                    <NewPageBtn
                        parentId={page._id}
                        iconComponent={<PlusOutlined />}
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

export default PageListCard;
