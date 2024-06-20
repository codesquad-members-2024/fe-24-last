import { BlockControllerProps } from '../../constants';
import EditableBlock from './EditableBlock';
import useBlockController from '../../hooks/useBlockController';
import { ColumnGap } from '../../styles/themes';

export default function BlockController(props: BlockControllerProps) {
  const { blocks } = props;
  const { handleInput } = useBlockController(props);
  const showPopup = () => {};

  return (
    <ColumnGap>
      {blocks.map((block, index) => (
        <div key={index}>
          <EditableBlock block={block} index={index} handleInput={handleInput} showPopup={showPopup} />
        </div>
      ))}
    </ColumnGap>
  );
}
