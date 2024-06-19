import styled from "styled-components";
import { FormEvent, KeyboardEvent, useCallback, useEffect, useState } from "react";
import debounce from "../utils/debounce";
import { useParams } from "react-router-dom";
import { createBlock, deleteData, updateData, usePatchNewBlock, useGetPage } from "../services/api";
import BlockList from "./BlockList";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { HolderOutlined } from "@ant-design/icons";

export interface Block {
  type: string;
  content: string;
  _id?: string;
  index: number;
  children: Block[];
}

function ArticleLayout() {
  const { id: pageId } = useParams<{ id: string }>();
  const mutate = usePatchNewBlock(pageId);
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const { data: pageData } = useGetPage(`pages/${pageId}`);

  const saveTitle = useCallback(
    debounce(async (newTitle: string) => {
      await updateData(`pages/${pageId}`, { title: newTitle });
    }, 1000),
    [pageId]
  );

  const handleTitleChange = (e: FormEvent<HTMLDivElement>) => {
    const newTitle = e.currentTarget.innerText;
    // setTitle(newTitle);
    saveTitle(newTitle);
  };

  const handleTitleKeyDown = async (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      await handleKeyDown(e, -1);
    }
  }

  const handleKeyDown = async (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === "Enter") {
      if (e.shiftKey) return;
      e.preventDefault();
      const newData = {
        type: "text",
        content: "",
        children: [],
      };
      const { data: newBlock } = await createBlock(pageId!, index + 1);
      const { _id: blockId } = newBlock;

      const updatedBlocks = [
        ...blocks.slice(0, index + 1),
        newBlock,
        ...blocks.slice(index + 1).map((block) => ({ ...block, index: block.index + 1 })),
      ];
      setBlocks(updatedBlocks);
      mutate({ newData, blockId });
    } else if (e.key === "Backspace" && blocks[index].content === "") {
      e.preventDefault();
      if (blocks.length > 1) {
        const blockToDelete = blocks[index];
        const updatedBlocks = [
          ...blocks.slice(0, index),
          ...blocks.slice(index + 1).map((block) => ({ ...block, index: block.index - 1 })),
        ];
        setBlocks(updatedBlocks);
        await deleteData(`pages/${pageId}/blocks/${blockToDelete._id}`);
      }
    }
  };

  const saveBlock = useCallback(
    debounce(async (blockId: string = "", newContent: string) => {
      await updateData(`pages/${pageId}/blocks/${blockId}`, {
        content: newContent,
      });
    }, 1000),
    [pageId]
  );

  const handleInput = (e: FormEvent<HTMLDivElement>, index: number) => {
    const newContent = e.currentTarget.innerText;
    const updatedBlocks = [...blocks];
    updatedBlocks[index].content = newContent;
    const blockId = updatedBlocks[index]._id;
    saveBlock(blockId, newContent);
  };

  const reorder = (list: Block[], startIndex: number, endIndex: number) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result.map((block, idx) => ({ ...block, index: idx }));
  };

  const updateBlockOrder = async (blocks: Block[]) => {
    try {
      await updateData(`pages/${pageId}/blocks`, { blocks });
    } catch (error) {
      console.error("Failed to update block order:", error);
    }
  };
  
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedBlocks = reorder(blocks, result.source.index, result.destination.index);
    setBlocks(reorderedBlocks);
    updateBlockOrder(reorderedBlocks);
  };

  useEffect(() => {
    if (pageData) {
      setTitle(pageData.title);
      setBlocks(pageData.blocklist);
    }       
  }, [pageData, pageId]);

  return (
    <Wrapper>
      <StyledTitleBox
        contentEditable
        suppressContentEditableWarning
        aria-placeholder="제목없음"
        onInput={handleTitleChange}
        onKeyDown={handleTitleKeyDown}
      >
        {title}
      </StyledTitleBox>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <StyledContentBox
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {blocks.map((block, index) => (
                <Draggable
                  key={index}
                  draggableId={String(index)}
                  index={index}
                >
                  {(provided) => (
                    <StyledBlockBox
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <StyledHolderOutlined {...provided.dragHandleProps} />
                      <BlockList
                        key={block._id}
                        block={block}
                        index={index}
                        handleKeyDown={(e) => handleKeyDown(e, index)}
                        handleInput={handleInput}
                      />
                    </StyledBlockBox>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </StyledContentBox>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* padding-bottom: 30vh; */
  padding-left: 100px;
  padding-right: 100px;
  flex-grow: 1;
  min-width: 700px;
`;

const StyledTitleBox = styled.h1`
  width: 100%;
  max-width: 900px;
  height: 60px;
  margin-top: 100px;
  display: flex;
  align-items: center;
  &:empty:before {
    content: attr(aria-placeholder);
    color: gray;
  }
`;

const StyledContentBox = styled.div`
  max-width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-size: 16px;
  line-height: 1.5;
  width: 100%;
`;

const StyledHolderOutlined = styled(HolderOutlined)`
  visibility: hidden;
  color: #aeaeae;
`;

const StyledBlockBox = styled.div`
  width: 100%;
  display: flex;
  &:hover {
    ${StyledHolderOutlined} {
      visibility: visible;
    }
  }
`;

export default ArticleLayout;
