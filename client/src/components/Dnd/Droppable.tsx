import { ReactNode, useEffect, useRef, useState } from "react";
import { useDnd } from "../../contexts/DndProvider";

interface OnDropParms {
  draggingItemId: string;
  dropTargetId: string;
  dropDirection: string;
}

export type OnDrop = (params: OnDropParms) => void;

interface DroppableProps {
  id: string;
  onDrop: OnDrop;
  allowedDirections: ("TOP" | "BOTTOM" | "LEFT" | "RIGHT")[];
  isDisabled?: boolean;
  threshold?: number;
  children: ReactNode;
}

export default function Droppable({
  id,
  onDrop,
  allowedDirections,
  isDisabled,
  threshold = 5,
  children,
}: DroppableProps) {
  const { isDragging, draggingItemId, endDrag } = useDnd();
  const droppableRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState<string | null>(null);

  useEffect(() => {
    if (isDisabled) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && draggingItemId && droppableRef.current) {
        const rect = droppableRef.current.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        let newHighlight: string | null = null;

        if (
          allowedDirections.includes("TOP") &&
          mouseY <= rect.top + threshold &&
          mouseY >= rect.top - threshold
        ) {
          newHighlight = "TOP";
        } else if (
          allowedDirections.includes("BOTTOM") &&
          mouseY >= rect.bottom - threshold &&
          mouseY <= rect.bottom + threshold
        ) {
          newHighlight = "BOTTOM";
        } else if (
          allowedDirections.includes("LEFT") &&
          mouseX <= rect.left + threshold &&
          mouseX >= rect.left - threshold
        ) {
          newHighlight = "LEFT";
        } else if (
          allowedDirections.includes("RIGHT") &&
          mouseX >= rect.right - threshold &&
          mouseX <= rect.right + threshold
        ) {
          newHighlight = "RIGHT";
        }

        setHighlight(newHighlight);
      }
    };

    const handleMouseUp = () => {
      if (highlight && draggingItemId) {
        onDrop({ draggingItemId, dropTargetId: id, dropDirection: highlight });
        endDrag();
      }
      setHighlight(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    draggingItemId,
    allowedDirections,
    threshold,
    highlight,
    onDrop,
    isDisabled,
  ]);

  const borderColor = (dir: string) =>
    highlight === dir ? "2px solid red" : "2px solid transparent";

  return (
    <div
      ref={droppableRef}
      style={{
        position: "relative",
        borderTop: borderColor("TOP"),
        borderBottom: borderColor("BOTTOM"),
        borderLeft: borderColor("LEFT"),
        borderRight: borderColor("RIGHT"),
      }}
    >
      {children}
    </div>
  );
}
