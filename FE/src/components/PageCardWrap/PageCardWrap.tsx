import React from "react";
import styled from "styled-components";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../pages/Loading";
import PageListCard from "./PageListCard/PageListCard";

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

const PageCardWrap = () => {
    const { data, isLoading } = useFetchData("pageList");
    
    return (
        <PageCardContainer>
            {isLoading ? (
                <Loading />
            ) : (
                data
                    .filter((page: PageType) => !page.parent_id)
                    .map((page: PageType) => (
                        <PageListCard key={page._id} page={page} pages={data} />
                    ))
            )}
        </PageCardContainer>
    );
};

export default PageCardWrap;

const PageCardContainer = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
