import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import debounce from "../utils/debounce";
import { Block } from "../model/types";
import { fetchArticleById, updateArticleTitle } from "../services/api";
import { useArticles } from "../contexts/ArticlesProvider";
import * as S from "../styles/ArticleLayout";
import BlockBox from "./BlockBox";

function ArticleLayout() {
  const { id } = useParams<{ id: string }>();
  const { refetch: refetchArticles } = useArticles();
  const {
    data: currentArticle,
    error,
    isLoading,
    refetch: refetchCurrentArticle,
  } = useQuery(["article", id], () => fetchArticleById(id), {
    enabled: !!id,
  });
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setFocusOnNewBlock = (
    index: number,
    ref: React.RefObject<HTMLDivElement>
  ) => {
    blockRefs.current[index] = ref.current;
    setFocusIndex(index);
  };

  useEffect(() => {
    if (focusIndex !== null && blockRefs.current[focusIndex]) {
      const newBlockElement = blockRefs.current[focusIndex];
      if (newBlockElement) {
        newBlockElement.focus();
        const range = document.createRange();
        range.selectNodeContents(newBlockElement);
        range.collapse(false);
        const sel = window.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
      setFocusIndex(null);
    }
  }, [focusIndex, currentArticle?.blocklist]);

  const [debouncedSaveTitle] = debounce(async (newTitle: string) => {
    try {
      await updateArticleTitle(id, newTitle);
      refetchArticles();
    } catch (error) {
      console.error("Error:", error);
    }
  }, 1000);

  const handleTitleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newTitle = e.currentTarget.innerText;
    debouncedSaveTitle(newTitle);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading page</div>;

  const { title, blocklist } = currentArticle;
  return (
    <S.Wrapper>
      <S.TitleBox
        contentEditable
        aria-placeholder="제목없음"
        onInput={handleTitleChange}
        suppressContentEditableWarning
      >
        {title}
      </S.TitleBox>
      <S.Content>
        {blocklist.map((block: Block, index: number) => {
          return (
            <BlockBox
              key={`block-${block._id}`}
              blockData={block}
              refetchCurrentArticle={refetchCurrentArticle}
              blockIndex={index}
              setFocusOnNewBlock={setFocusOnNewBlock}
            />
          );
        })}
      </S.Content>
    </S.Wrapper>
  );
}

export default ArticleLayout;
