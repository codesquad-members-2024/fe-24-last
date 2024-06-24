import React from "react";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../pages/Loading";
import { PageType } from "../PageCardWrap/PageCardWrap";
import { Link } from "react-router-dom";
import * as S from "../../styles/TemplateCardWrapStyle"

export interface columnsType {
    title: string;
    pages: PageType[];
    _id: string;
}

interface TemplateType {
    _id: string;
    title: string;
    columns: columnsType[];
}

const TemplateCardWrap = () => {
    const { data, isLoading } = useFetchData("templateList");

    return (
        <S.TemplateCardContainer>
            <S.TemplateText>Templates</S.TemplateText>
            {isLoading ? (
                <Loading />
            ) : (
                data.map((template: TemplateType) => (
                    <Link to={`template/${template._id}`} key={template._id} state={template.columns}>
                        <S.TemplateCard>
                            {template.title}
                        </S.TemplateCard>
                    </Link>
                ))
            )}
        </S.TemplateCardContainer>
    );
};

export default TemplateCardWrap;

