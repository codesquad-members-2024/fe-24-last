import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import debounce from "../utils/debounce";
import { focusOnElement } from "../utils/focus";
import { Block } from "../model/types";
import {
  useCreateNewBlockOrElement,
  useGetArticle,
  useUpdateArticleTitle,
} from "../hooks/api";
import * as S from "../styles/ArticleLayout";
import BlockBox from "./BlockBox";
import DndProvider from "../contexts/DndProvider";

function ArticleLayout() {
  const { id: articleId = "" } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { data: currentArticle, isLoading, error } = useGetArticle(articleId);
  const { mutate: updateArticleTitle } = useUpdateArticleTitle(
    articleId,
    queryClient
  );
  const { mutate: createNewBlockOrElement } = useCreateNewBlockOrElement(
    articleId,
    queryClient
  );
  const [localBlockList, setLocalBlockList] = useState<Block[]>([]);
  const [focusedElementId, setFocusedElementId] = useState<string | null>(null);

  useEffect(() => {
    if (currentArticle) {
      setLocalBlockList(currentArticle.blockList);
    }
  }, [currentArticle]);

  const [debouncedSaveTitle] = debounce(async (newTitle: string) => {
    updateArticleTitle(newTitle);
  }, 1000);

  const handleTitleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newTitle = e.currentTarget.innerText;
    debouncedSaveTitle(newTitle);
  };

  const handleWrapperClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = e.currentTarget;
    const paddingBottom = parseInt(
      window.getComputedStyle(wrapper).paddingBottom,
      10
    );
    const clickY = e.clientY;
    const wrapperRect = wrapper.getBoundingClientRect();
    const isInBottomPadding = clickY > wrapperRect.bottom - paddingBottom;

    if (isInBottomPadding) {
      createNewBlockOrElement(
        { blockIndex: localBlockList.length },
        {
          onSuccess: (newBlock) => {
            setFocusedElementId(newBlock.newElementId);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (focusedElementId) {
      focusOnElement(focusedElementId);
      setFocusedElementId(null);
    }
  }, [currentArticle, focusedElementId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Article</div>;

  const { title, blockList } = currentArticle;

  return (
    <S.Wrapper onClick={handleWrapperClick}>
      <S.TitleBox
        contentEditable
        aria-placeholder="제목없음"
        onInput={handleTitleChange}
        suppressContentEditableWarning
      >
        {title}
      </S.TitleBox>
      <DndProvider>
        <S.Content>
          {blockList.map((block: Block, index: number) => {
            return (
              <BlockBox
                key={`block-${block._id}`}
                blockData={block}
                blockIndex={index}
                setFocusedElementId={setFocusedElementId}
                localBlockList={localBlockList}
              />
            );
          })}
        </S.Content>
      </DndProvider>
    </S.Wrapper>
  );
}

export default ArticleLayout;
