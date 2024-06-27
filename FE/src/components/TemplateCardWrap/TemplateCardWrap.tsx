import React from "react";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../pages/Loading";
import { PageType } from "../PageCardWrap/PageCardWrap";
import { Link, useParams } from "react-router-dom";
import * as S from "../../styles/TemplateCardWrapStyle"
import { useTitleContext } from "../../hooks/useTitleContext";
import NewPageBtn from "../NewPageBtn/NewPageBtn";
import { FormOutlined, MinusOutlined } from "@ant-design/icons";
import ModalComponent from "../Modal/Modal";
import useDeletePage from "../../hooks/useDeletePage";

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
    const { mutate } = useDeletePage("template");
    const handleDeleteTemplate = async (id: string) => mutate(id);
    
    return (
        <S.TemplateCardContainer>
            <S.TemplateNav>
                <S.TemplateText>Templates</S.TemplateText>
                <NewPageBtn
                    parentId={null}
                    iconComponent={<FormOutlined />}
                    type="template"
                    queryURL="newTemplate"
                />
            </S.TemplateNav>
            {isLoading ? (
                <Loading />
            ) : (
                data.map((template: TemplateType) => (
                    <Link
                        to={`template/${template._id}`}
                        key={template._id}
                        state={template}
                    >
                        <S.TemplateCard>
                            {id === template._id
                                ? currentTitle
                                : template.title}
                            <S.ControlBox>
                                <ModalComponent
                                    callBack={() => handleDeleteTemplate(template._id)}
                                    iconComponent={<MinusOutlined />}
                                    message="정말 삭제하시겠습니까?"
                                />
                            </S.ControlBox>
                        </S.TemplateCard>
                    </Link>
                ))
            )}
        </S.TemplateCardContainer>
    );
    
};


export default TemplateCardWrap;

