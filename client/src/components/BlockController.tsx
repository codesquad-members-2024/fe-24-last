import { BlockControllerProps } from '../constants';
import styled from 'styled-components';
import EditableBlock from './EditableBlock';
import useBlockController from '../hooks/useBlockController';

export default function BlockController(props: BlockControllerProps) {
  const { blocks } = props;
  const { handleInput } = useBlockController(props);
  const showPopup = () => {};

  return (
    <BlocksWrapper>
      {blocks.map((block, index) => (
        <div key={index}>
          <EditableBlock block={block} index={index} handleInput={handleInput} showPopup={showPopup} />
        </div>
      ))}
    </BlocksWrapper>
  );
}

const BlocksWrapper = styled.div`
  width: 100%;
`;
