import styled from 'styled-components';
import { TeamspaceDescription } from '../../constants';
import { FlexColumn } from '../../styles/themes';

export interface TeamspacePanelProps {
  teamspace: TeamspaceDescription;
}

export default function TeamspacePanel({ teamspace: { title } }: TeamspacePanelProps) {
  return (
    <Wrapper>
      <span>{title}</span>
      <button>들어가기</button>
    </Wrapper>
  );
}

const Wrapper = styled(FlexColumn)`
  width: 100px;
  height: 100px;

  border: 1px solid black;
  justify-content: center;
  align-items: center;
`;
