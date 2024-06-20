import { useCallback, useEffect, useRef } from 'react';
import { Block } from '../constants';
import { sendArticleRequestById, updateArticleRequestById } from '../api/articleAPI';
import { io } from 'socket.io-client';
import { debounce } from '../utils/timeoutUtils';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

const SERVER = import.meta.env.VITE_SERVER;

export default function useArticle() {
  const clientBlocksRef = useRef<Block[]>([]);
  const { teamspaceId, articleId } = useParams();
  const queryClient = useQueryClient();

  const { data: blocks = [] } = useSuspenseQuery<Block[]>({
    queryKey: [`article-${articleId}`],
    queryFn: async () => {
      const response = await sendArticleRequestById({ teamspaceId, articleId });
      return response.content;
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: updateArticle } = useMutation({
    mutationFn: updateArticleRequestById,
  });

  useEffect(() => {
    const socket = io(SERVER);

    socket.on(`article-${articleId}`, ({ content }) => {
      clientBlocksRef.current = content;
      queryClient.setQueryData([`article-${articleId}`], content);
    });

    return () => {
      socket.off(`article-${articleId}`);
    };
  }, [teamspaceId, articleId]);

  const debouncedFetch = useCallback(
    debounce((updatedBlocks: Block[]) => {
      updateArticleRequestById({
        teamspaceId,
        articleId,
        blocks: updatedBlocks,
      });
    }, 1000),
    []
  );

  return {
    clientBlocksRef,
    blocks,
    setBlocks: (newBlocks: Block[]) => (clientBlocksRef.current = newBlocks),
    debouncedFetch,
  };
}
