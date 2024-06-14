import { useCallback, useEffect, useRef, useState } from 'react';
import { Block } from '../constants';
import { sendArticleRequestById, updateArticleRequestById } from '../api/articleAPI';
import { io } from 'socket.io-client';
import { debounce } from '../utils/timeoutUtils';
import { useParams } from 'react-router-dom';

const SERVER = import.meta.env.VITE_SERVER;

export default function useArticle() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const clientBlocksRef = useRef<Block[]>([]);
  const { teamspaceId, articleId } = useParams();

  useEffect(() => {
    const socket = io(SERVER);

    socket.on('articleUpdated', (data) => {
      setBlocks(data.content);
    });

    sendArticleRequestById({ teamspaceId: teamspaceId || '', articleId: articleId || '' }).then(({ content }) => {
      setBlocks(content);
    });

    return () => {
      socket.off('articleUpdated');
    };
  }, [teamspaceId, articleId]);

  useEffect(() => {
    clientBlocksRef.current = blocks;
  }, [blocks]);

  const debouncedFetch = useCallback(
    debounce((updatedBlocks: Block[]) => {
      updateArticleRequestById({
        teamspaceId: teamspaceId || '',
        articleId: articleId || '',
        blocks: updatedBlocks,
      }).then(({ content }) => {
        setBlocks(content);
      });
    }, 1000),
    []
  );

  const handleContentChange = (updatedBlock: Block, index: number) => {
    const newBlocks = [...blocks];
    newBlocks[index] = updatedBlock;
    clientBlocksRef.current[index] = updatedBlock;
    setBlocks(clientBlocksRef.current);
    debouncedFetch(clientBlocksRef.current);
  };

  return {
    blocks,
    setBlocks,
    debouncedFetch,
    handleContentChange,
  };
}
