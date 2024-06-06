import { BlockControllerProps } from '../constants';
import styled from 'styled-components';
import EditableBlock from './EditableBlock';
import useBlockController from '../hooks/useBlockController';

export default function BlockController(props: BlockControllerProps) {
  const { blocks } = props;
  const { handleInput } = useBlockController(props);
  return (
    <BlocksWrapper>
      {blocks.map((block, index) => (
        <div key={index}>
          <EditableBlock block={block} index={index} handleInput={handleInput} />
        </div>
      ))}
    </BlocksWrapper>
  );
}

const BlocksWrapper = styled.div`
  width: 100%;
`;
