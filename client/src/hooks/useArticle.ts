import { useCallback, useEffect, useRef, useState } from 'react';
import { Block } from '../constants';
import { sendArticleRequestById, updateArticleRequestById } from '../api/articleAPI';
import { io } from 'socket.io-client';
import { debounce } from '../utils/timeoutUtils';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const SERVER = import.meta.env.VITE_SERVER;

export default function useArticle() {
  const clientBlocksRef = useRef<Block[]>([]);
  const { teamspaceId, articleId } = useParams();
  const queryClient = useQueryClient();

  const { data: blocks = [] } = useQuery<Block[]>({
    queryKey: [`article-${articleId}`],
    queryFn: async () => {
      const response = await sendArticleRequestById({ teamspaceId: teamspaceId || '', articleId: articleId || '' });
      return response.content;
    },
    refetchOnWindowFocus: false,
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
    debounce(
      (updatedBlocks: Block[]) =>
        updateArticleRequestById({
          teamspaceId: teamspaceId || '',
          articleId: articleId || '',
          blocks: updatedBlocks,
        }),
      1000
    ),
    []
  );

  const handleContentChange = (updatedBlock: Block, index: number) => {
    const newBlocks = [...blocks];
    newBlocks[index] = updatedBlock;
    clientBlocksRef.current[index] = updatedBlock;
    debouncedFetch(clientBlocksRef.current);
  };

  return {
    blocks,
    setBlocks: (newBlocks: Block[]) => (clientBlocksRef.current = newBlocks),
    debouncedFetch,
    handleContentChange,
  };
}
