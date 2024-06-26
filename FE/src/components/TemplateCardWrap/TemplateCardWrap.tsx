import React from "react";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../pages/Loading";
import { PageType } from "../PageCardWrap/PageCardWrap";
import { Link, useParams } from "react-router-dom";
import * as S from "../../styles/TemplateCardWrapStyle"
import { useTitleContext } from "../../hooks/useTitleContext";

export interface ColumnsType {
    title: string;
    pages: PageType[];
    _id: string;
}

export interface TemplateType {
    _id: string;
    title: string;
    columns: ColumnsType[];
}

const TemplateCardWrap = () => {
    const { data, isLoading } = useFetchData("templateList");
    const { id } = useParams()
    const { currentTitle } = useTitleContext()

    return (
        <S.TemplateCardContainer>
            <S.TemplateText>Templates</S.TemplateText>
            {isLoading ? (
                <Loading />
            ) : (
                data.map((template: TemplateType) => (
                    <Link to={`template/${template._id}`} key={template._id} state={template}>
                        <S.TemplateCard>
                            {id === template._id ? currentTitle : template.title}
                        </S.TemplateCard>
                    </Link>
                ))
            )}
        </S.TemplateCardContainer>
    );
};

export default TemplateCardWrap;

