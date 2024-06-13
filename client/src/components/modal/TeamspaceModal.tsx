import styled from 'styled-components';
import { TeamspaceDescription } from '../../constants';
import { FlexColumn } from '../../styles/themes';
import TeamspacePanel from './TeamspacePanel';

export interface TeamspaceModalProps {
  teamspaces: TeamspaceDescription[];
}

export default function TeamspaceModal({ teamspaces }: TeamspaceModalProps) {
  return (
    <Wrapper>
      <span>팀 스페이스 목록</span>
      <TeamspaceListBox>
        <TeamspaceListContent>
          {teamspaces.map((teamspace, index) => (
            <TeamspacePanel key={`teamspace-panel-${index}`} {...{ teamspace }} />
          ))}
        </TeamspaceListContent>
      </TeamspaceListBox>
    </Wrapper>
  );
}

const Wrapper = styled(FlexColumn)`
  width: 700px;
  height: 500px;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

const TeamspaceListBox = styled.div`
  width: 550px;
  height: 400px;
  max-height: 400px;
  border: 1px solid black;
`;

const TeamspaceListContent = styled.div`
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  max-height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  justify-items: center;
  align-items: center;
  gap: 16px;
  overflow-y: scroll;
`;
