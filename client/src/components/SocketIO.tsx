import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { Block } from "./ArticleLayout";

const URL = "http://localhost:3001";
export const socket = io(URL);

interface SocketIOExampleProps {
  pageId: string;
  onBlockUpdate: (updatedBlocks: Block[]) => void;
  onTitleUpdate: (newTitle: string) => void;
}

const SocketIO: React.FC<SocketIOExampleProps> = ({ pageId, onBlockUpdate, onTitleUpdate }) => {
  useEffect(() => {
    socket.emit("join_room", pageId);

    socket.on("title_updated", (newTitle: string) => {
      onTitleUpdate(newTitle);
    });

    socket.on("block_updated", (updatedBlocks: Block[]) => {
      onBlockUpdate(updatedBlocks);
    });

    // socket.on("block_content_updated", (updatedBlocks: Block[]) => {
    //   onBlockUpdate(updatedBlocks);
    // });

    socket.on("block_content_updated", ({ blockId, newContent }) => {
      onBlockUpdate((prevBlocks: Block[]) => {
        const updatedBlocks = prevBlocks.map((block) =>
          block._id === blockId ? { ...block, content: newContent } : block
        );
        return updatedBlocks;
      });
    });

    return () => {
      socket.emit("leave_room", pageId);
      socket.off("title_updated");
      socket.off("block_updated");
      socket.off("block_content_updated");
    };
  }, [pageId]);

  return null;
};

export default SocketIO;
