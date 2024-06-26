import React, { useState } from "react";
import { ColumnsType } from "../TemplateCardWrap/TemplateCardWrap";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import styled from "styled-components";

const TASK_BG_COLOR = ['#FFE2DD', '#FDECC8', '#DAECDA'];

interface TaskListBoxProps {
    columns: ColumnsType[];
}

const TaskListBox = ({ columns }: TaskListBoxProps) => {
    const [columnsData, setColumnsData] = useState<ColumnsType[]>(columns)

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
    return (
        <TaskListWrap>
            <DragDropContext onDragEnd={handleDragEnd}>
                {columnsData.map((curColumns, idx) => {
                    return (
                        <Droppable
                            droppableId={curColumns._id}
                            key={curColumns._id}
                        >
                            {(provided) => (
                                <TaskContainer
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <TaskNameBox $bgColor={TASK_BG_COLOR[idx]}>
                                        {curColumns.title} {curColumns.pages.length}
                                    </TaskNameBox>
                                    {curColumns.pages.map((page, index) => (
                                        <Draggable
                                            key={page._id}
                                            draggableId={page._id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <PageName
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        ...provided
                                                            .draggableProps
                                                            .style,
                                                        width: `236px`,
                                                    }}
                                                >
                                                    {page.title}
                                                </PageName>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </TaskContainer>
                            )}
                        </Droppable>
                    );
                })}
            </DragDropContext>
        </TaskListWrap>
    );
};

export default TaskListBox;

const TaskListWrap = styled.div`
    max-width: 708px;
    outline: none;
    margin: 50px auto 0px;
    display: flex;
    gap: 10px;
`;

const TaskContainer = styled.div`
    flex-grow: 1;
    width: auto;
`

const TaskNameBox = styled.span<{$bgColor: string}>`
    background-color: ${({ $bgColor }) => ($bgColor)};
    font-size: 15px;
    padding: 2px 4px;
    border-radius: 5px;
`

const PageName = styled.div`
    width: auto;
    height: 30px;
    margin: 10px 0;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: start;
    border: 1px solid #e0e0e0;
    border-radius: 7px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    background-color: #fff;
    
`