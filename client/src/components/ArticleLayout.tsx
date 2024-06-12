import styled from "styled-components";
import { FormEvent, KeyboardEvent, useCallback, useEffect, useState} from "react";
import debounce from "../utils/debounce";
import { useLocation, useParams } from "react-router-dom";
import { createBlock, deleteData, fetchData, updateData} from "../services/api";
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
      const pageData = await fetchData(`pages/${pageId}`);
      setTitle(pageData.title);
      if (pageData.blocklist.length === 0) {
        const defaultBlock = await createBlock(pageId!, 0);
        setBlocks([defaultBlock]);
      } else {
        setBlocks(pageData.blocklist);
      }
    };

    fetchPage();
  }, [pageId]);

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

  const handleKeyDown = async (
    e: KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      if (e.shiftKey) return;
      e.preventDefault();
      const newBlock = await createBlock(pageId!, index + 1);
      const updatedBlocks = [
        ...blocks.slice(0, index + 1),
        newBlock,
        ...blocks.slice(index + 1).map((block) => ({ ...block, index: block.index + 1 })),
      ];
      setBlocks(updatedBlocks);
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
    debounce(async (blockId: string, newContent: string) => {
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
    // setBlocks(updatedBlocks);

    setTimeout(() => {
      const blockId = updatedBlocks[index + 1]._id;
      saveBlock(blockId, newContent);
    }, 0);
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
            key={block._id}
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
