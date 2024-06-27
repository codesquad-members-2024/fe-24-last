import React, { useEffect, useState } from "react";
import { ColumnsType } from "../TemplateCardWrap/TemplateCardWrap";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import NewPageBtn from "../NewPageBtn/NewPageBtn";
import ModalComponent from "../Modal/Modal";
import useDeletePage from "../../hooks/useDeletePage";
import { useQueryClient } from "react-query";
import * as S from "../../styles/TaskListBoxStyle";

const TASK_BG_COLOR = ['#FFE2DD', '#FDECC8', '#DAECDA'];

interface TaskListBoxProps {
    columns: ColumnsType[];
    id: string
}

const TaskListBox = ({ columns, id }: TaskListBoxProps) => {
    const [columnsData, setColumnsData] = useState<ColumnsType[]>(columns)
    const { mutate } = useDeletePage("page");
    const queryClient = useQueryClient()
    const handleDeletePage = async (id: string) => {
        mutate(id);
        queryClient.invalidateQueries({ queryKey: ["templateList"] });
    }

    const handleDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination || (destination.droppableId === source.droppableId &&
            destination.index === source.index)) {
            return;
        }

        const sourceColumnIndex = columnsData.findIndex(column => column._id === source.droppableId);
        const destinationColumnIndex = columnsData.findIndex(column => column._id === destination.droppableId);

        const sourceColumn = columnsData[sourceColumnIndex];
        const destinationColumn = columnsData[destinationColumnIndex];

        const sourceItems = Array.from(sourceColumn.pages);
        const [movedItem] = sourceItems.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            sourceItems.splice(destination.index, 0, movedItem);
            const newColumnsData = Array.from(columnsData);
            newColumnsData[sourceColumnIndex].pages = sourceItems;
            setColumnsData(newColumnsData);
        } else {
            const destinationItems = Array.from(destinationColumn.pages);
            destinationItems.splice(destination.index, 0, movedItem);

            const newColumnsData = Array.from(columnsData);
            newColumnsData[sourceColumnIndex].pages = sourceItems;
            newColumnsData[destinationColumnIndex].pages = destinationItems;

            setColumnsData(newColumnsData);
        }
    };

    useEffect(() => {
        setColumnsData(columns)
    }, [columns, id])

    return (
        <S.TaskListWrap>
            <DragDropContext onDragEnd={handleDragEnd}>
                {columnsData.map((curColumns, idx) => {
                    return (
                        <Droppable
                            droppableId={curColumns._id}
                            key={curColumns._id}
                        >
                            {(provided) => (
                                <S.TaskContainer
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <S.TaskNameBox
                                            $bgColor={TASK_BG_COLOR[idx]}
                                        >
                                            {curColumns.title}{" "}
                                            {curColumns.pages.length}
                                        </S.TaskNameBox>
                                        <NewPageBtn
                                            parentId={null}
                                            iconComponent={<PlusOutlined />}
                                            type="template"
                                            queryURL={`template/${id}/column/${curColumns._id}/newPage`}
                                        />
                                    </div>
                                    {curColumns.pages.map((page, index) => (
                                        <Draggable
                                            key={page._id}
                                            draggableId={page._id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <S.PageContainer ref={
                                                    provided.innerRef
                                                }
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    ...provided
                                                        .draggableProps
                                                        .style,
                                                    width: `236px`,
                                                }}>
                                                    <Link
                                                        to={`/page/${page._id}`}
                                                        state={page}
                                                    >
                                                        <S.PageName
                                                            
                                                        >
                                                            {page.title}
                                                        </S.PageName>
                                                    </Link>
                                                    <S.ControlBox>
                                                    <ModalComponent
                                                        callBack={() =>
                                                            handleDeletePage(
                                                                page._id
                                                            )
                                                        }
                                                        iconComponent={
                                                            <MinusOutlined />
                                                        }
                                                        message="정말 삭제하시겠습니까?"
                                                    />
                                                    </S.ControlBox>
                                                </S.PageContainer>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </S.TaskContainer>
                            )}
                        </Droppable>
                    );
                })}
            </DragDropContext>
        </S.TaskListWrap>
    );
};

export default TaskListBox;


