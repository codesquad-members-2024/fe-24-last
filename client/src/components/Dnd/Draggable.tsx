import { ReactNode, useState, useEffect } from "react";
import { useDnd } from "../../contexts/DndProvider";

interface DraggableProps {
  id: string;
  children: (provided: {
    dragHandlerProps: {
      onMouseDown: (event: React.MouseEvent) => void;
    };
  }) => ReactNode;
}

export default function Draggable({ id, children }: DraggableProps) {
  const { isDragging, draggingItemId, startDrag, endDrag } = useDnd();
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const [translation, setTranslation] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && origin && draggingItemId === id) {
        setTranslation({
          x: event.clientX - origin.x,
          y: event.clientY - origin.y,
        });
      }
    };

    const handleMouseUp = () => {
      setOrigin(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, origin, draggingItemId, id, endDrag]);

  const handleMouseDown = (event: React.MouseEvent) => {
    startDrag(id);
    setOrigin({
      x: event.clientX - translation.x,
      y: event.clientY - translation.y,
    });
  };

  return (
    <div
      style={{
        transform: `translate(${translation.x}px, ${translation.y}px)`,
        cursor: isDragging && draggingItemId === id ? "grabbing" : "grab",
      }}
    >
      {children({
        dragHandlerProps: {
          onMouseDown: handleMouseDown,
        },
      })}
    </div>
  );
}
