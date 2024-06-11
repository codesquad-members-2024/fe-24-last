import styled from "styled-components";
import { FormEvent, KeyboardEvent, useCallback, useEffect, useState } from "react";
import debounce from "../utils/debounce";
import { useLocation, useParams } from "react-router-dom";
import { createBlock, deleteData, fetchData, updateData } from "../services/api";
import BlockList from "./BlockList";

export interface Block {
  type: string;
  content: string;
  _id: string;
  index: number;
  children: Block[];
}

function ArticleLayout() {
  const { id: pageId } = useParams<{ id: string }>();
  const location = useLocation();
  const data = location.state;
  console.log(data);

  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const pageData = await fetchData(`pages/${pageId}`);
        setTitle(pageData.title);
        if (pageData.blocklist.length === 0) {
          const defaultBlock = await createBlock(pageId!, 0);
          setBlocks([defaultBlock]);
        } else {
          setBlocks(pageData.blocklist);
        }
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    };

    fetchPage();
  }, [pageId, blocks.length]);

  const saveTitle = useCallback(
    debounce(async (newTitle: string) => {
      try {
        await updateData(`pages/${pageId}`, { title: newTitle });
      } catch (error) {
        console.error("Error saving title:", error);
      }
    }, 1000),
    [pageId]
  );

  const handleTitleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newTitle = e.currentTarget.innerText;
    // setTitle(newTitle);
    saveTitle(newTitle);
  };

  const handleKeyDown = async ( e: KeyboardEvent<HTMLDivElement>, index: number ) => {
    if (e.key === "Enter") {
      if (e.shiftKey) return;
      e.preventDefault();
      console.log(index + "인덱스")
      try {
        const newBlock = await createBlock(pageId!, index + 1);
        const updatedBlocks = [
          ...blocks.slice(0, index + 1),
          newBlock,
          ...blocks.slice(index + 1).map((block) => ({ ...block, index: block.index + 1 })),
        ];

        setBlocks(updatedBlocks);
      } catch (error) {
        console.error("Error creating new block:", error);
      }
    } else if (e.key === "Backspace" && blocks[index].content === "") {
      e.preventDefault();
      if (blocks.length > 1) {
        const blockToDelete = blocks[index];
        const updatedBlocks = [
          ...blocks.slice(0, index),
          ...blocks.slice(index + 1).map((block) => ({ ...block, index: block.index - 1 })),
        ];
        setBlocks(updatedBlocks);

        try {
          await deleteData(`pages/${pageId}/blocks/${blockToDelete._id}`);
        } catch (error) {
          console.error("Error deleting block:", error);
        }
      }
    }
  };

  const saveBlock = useCallback(
    debounce(async (blockId, newContent) => {
      try {
        await updateData(`pages/${pageId}/blocks/${blockId}`, {
          content: newContent,
        });
      } catch (error) {
        console.error("Error updating block:", error);
      }
    }, 1000),
    [pageId]
  );

  const handleInput = async (e: FormEvent<HTMLDivElement>, index: number) => {
    const newContent = e.currentTarget.innerText;
    const updatedBlocks = [...blocks];
    updatedBlocks[index].content = newContent;
    // setBlocks(updatedBlocks);

    saveBlock(updatedBlocks[index]._id, newContent);
  };

  return (
    <Wrapper>
      <StyledTitleBox
        contentEditable
        aria-placeholder="제목없음"
        onInput={handleTitleChange}
        suppressContentEditableWarning
      >
        {title}
      </StyledTitleBox>
      <StyledContentBox>
        {blocks.map((block, index) => (
          <BlockList
            key={index}
            block={block}
            index={index}
            handleKeyDown={handleKeyDown}
            handleInput={handleInput}
          />
        ))}
      </StyledContentBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* padding-bottom: 30vh; */
  padding-left: 100px;
  padding-right: 100px;
  flex-grow: 1;
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

export default ArticleLayout;
