import styled from "styled-components";
import { FormEvent, KeyboardEvent, useCallback, useEffect, useState } from "react";
import debounce from "../utils/debounce";
import { useParams } from "react-router-dom";
import { createBlock, deleteData, useGetPage, usePatchNewTitle, usePatchBlockContent, usePatchBlockOrder, usePatchBlockData } from "../services/api";
import BlockList from "./BlockList";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { HolderOutlined } from "@ant-design/icons";
import SocketIO, { socket } from "./SocketIO";

export interface Block {
  type: string;
  content: string;
  _id?: string;
  index: number;
  children: Block[];
}

function ArticleLayout() {
  const { id: pageId } = useParams<{ id: string }>();
  const updateNewTitle = usePatchNewTitle(pageId);

  const updateBlock = usePatchBlockData(pageId);
  // usePatchBlock, usePatchBlockContent, usePatchBlockOrder 뭉치는 작업중
  // const updateNewBlock = usePatchBlock(pageId);
  const updateBlockContent = usePatchBlockContent(pageId);
  const updateBlockOrder = usePatchBlockOrder(pageId);

  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const { data: pageData } = useGetPage(`pages/${pageId}`);

  const saveTitle = useCallback(
    debounce((newTitle: string) => {
      updateNewTitle({ newTitle });
      socket.emit("title_updated", { pageId, newTitle });
    }, 500), // 일단 사이드바에 거의 실시간으로 반영되게 하려고 0.5초로. debounce 필요한가? 상태로 가지고 있는게 나은가?
    []
  );

  const handleTitleChange = (e: FormEvent<HTMLDivElement>) => {
    const newTitle = e.currentTarget.innerText;
    saveTitle(newTitle);
  };

  const handleTitleKeyDown = async (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      await handleKeyDown(e, -1);
    }
  };

  const handleKeyDown = async ( e: KeyboardEvent<HTMLDivElement>, index: number ) => {
    if (e.key === "Enter") {
      if (e.shiftKey) return;
      e.preventDefault();
      const newData = {
        type: "p",
        content: "",
        children: [],
      };
      const { data: newBlock } = await createBlock(pageId!, index + 1);
      const { _id: blockId } = newBlock;

      const updatedBlocks = [
        ...blocks.slice(0, index + 1),
        newBlock,
        ...blocks
          .slice(index + 1)
          .map((block) => ({ ...block, index: block.index + 1 })),
      ];
      setBlocks(updatedBlocks);
      // updateNewBlock({ newData, blockId });
      updateBlock({
        endpoint: `pages/${pageId}/blocks/${blockId}`,
        data: { newData, blockId },
      });
      socket.emit("block_updated", { pageId, blocks: updatedBlocks }); // 소켓 블록 content 업데이트 전송
    } else if (e.key === "Backspace" && blocks[index].content === "") {
      e.preventDefault();
      if (blocks.length > 1) {
        const blockToDelete = blocks[index];
        const updatedBlocks = [
          ...blocks.slice(0, index),
          ...blocks
            .slice(index + 1)
            .map((block) => ({ ...block, index: block.index - 1 })),
        ];
        setBlocks(updatedBlocks);
        await deleteData(`pages/${pageId}/blocks/${blockToDelete._id}`);
        socket.emit("block_updated", { pageId, blocks: updatedBlocks }); // 소켓 블록(삭제) 업데이트 전송
      }
    }
  };

  const saveBlock = useCallback(
    debounce((blockId: string = "", newContent: string) => {
      updateBlockContent({ newContent, blockId });
      socket.emit("block_content_updated", { pageId, blockId, newContent }); // 소켓 블록 업데이트 전송
      // updateBlock({endpoint: `pages/${pageId}/blocks/${blockId}`,data: {newContent, blockId}})
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

  const handleUpdateBlockOrder = async (blocks: Block[]) => {
    updateBlockOrder({ newData: blocks });
    socket.emit('block_updated', { pageId, blocks }); // 소켓 블록(순서) 업데이트 전송
    // updateBlock({endpoint: `pages/${pageId}/blocks`, data: { newData: blocks }})
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedBlocks = reorder(
      blocks,
      result.source.index,
      result.destination.index
    );
    setBlocks(reorderedBlocks);
    handleUpdateBlockOrder(reorderedBlocks);
  };

  useEffect(() => {
    if (pageData) {
      setTitle(pageData.title);
      setBlocks(pageData.blocklist);
    }
  }, [pageData, pageId]);

  return (
    <Wrapper>
      <SocketIO
        pageId={pageId as string}
        onBlockUpdate={(updatedBlocks) => setBlocks(updatedBlocks)}
        onTitleUpdate={(newTitle) => setTitle(newTitle)}
      />
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
