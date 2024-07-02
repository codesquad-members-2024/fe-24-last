import { useState, ReactNode, createContext, useContext } from "react";

interface DndContextType {
  isDragging: boolean;
  draggingItemId: string | null;
  startDrag: (id: string) => void;
  endDrag: () => void;
}

const DndContext = createContext<DndContextType | undefined>(undefined);

interface DndProviderProps {
  children: ReactNode;
}

export default function DndProvider({ children }: DndProviderProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);

  const startDrag = (id: string) => {
    setIsDragging(true);
    setDraggingItemId(id);
  };

  const endDrag = () => {
    setIsDragging(false);
    setDraggingItemId(null);
  };

  return (
    <DndContext.Provider
      value={{ isDragging, draggingItemId, startDrag, endDrag }}
    >
      {children}
    </DndContext.Provider>
  );
}

export function useDnd(): DndContextType {
  const context = useContext(DndContext);
  if (context === undefined) {
    throw new Error("useDnd must be used within a DndProvider");
  }
  return context;
}
