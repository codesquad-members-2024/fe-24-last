import { BlockControllerProps } from '../constants';
import EditableBlock from './EditableBlock';
import useBlockController from '../hooks/useBlockController';
import { CursorPosition } from '../helpers/cursorHelpers';

import { ColumnGap } from '../styles/themes';
import { useRef } from 'react';

export default function BlockController(props: BlockControllerProps) {
  const { blocks } = props;
  const { handleInput } = useBlockController(props);
  const showPopup = () => {};

  const cursorPositionRef = useRef<{ node: Node | null; offset: number; blockOffset: number }>({
    node: null,
    offset: 0,
    blockOffset: 0,
  });

  const updateCursorPosition = (positionObj: CursorPosition) => {
    cursorPositionRef.current = positionObj;
  };

  return (
    <ColumnGap>
      {blocks.map((block, index) => (
        <div key={index}>
          <EditableBlock
            block={block}
            index={index}
            handleInput={handleInput}
            showPopup={showPopup}
            cursorPositionRef={cursorPositionRef}
            updateCursorPosition={updateCursorPosition}
            isFocusedBlock={index === cursorPositionRef.current.blockOffset}
          />
        </div>
      ))}
    </ColumnGap>
  );
}
