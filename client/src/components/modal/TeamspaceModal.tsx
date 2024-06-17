import styled from 'styled-components';
import { TeamspaceDescription } from '../../constants';
import { FlexColumn } from '../../styles/themes';
import TeamspacePanel from './TeamspacePanel';
import { useEffect, useState } from 'react';
import { postNewTeamspace, sendTeamspaceListRequest } from '../../api/indexAPI';
import TeamspaceCreateModal from './TeamspaceCreateModal';
import useUserStore from '../../hooks/useUserStore';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function TeamspaceModal() {
  const client = useQueryClient();
  const { userId, isLoggedIn } = useUserStore();
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const navigate = useNavigate();

  const { data: teamspaces } = useQuery<TeamspaceDescription[]>({
    queryKey: ['teamspaces'],
    queryFn: sendTeamspaceListRequest,
  });

  const { mutate: fetchNewTeamspace } = useMutation({
    mutationFn: postNewTeamspace,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['teamspaces'] });
      setIsCreateFormOpen(false);
    },
  });

  useEffect(() => {
    // 세션 구현 이전 로그인 상태를 임시로 클라이언트에서 관리
    if (!isLoggedIn) navigate('/login');
  }, []);

  const handleAddButtonClick = () => setIsCreateFormOpen(true);
  const handleCancelClick = () => setIsCreateFormOpen(false);
  const handleSubmitClick = (title: string) => fetchNewTeamspace(title);

  return (
    <Wrapper>
      <span>팀 스페이스 목록</span>
      <TeamspaceListBox>
        <TeamspaceListContent>
          {teamspaces &&
            teamspaces.map((teamspace, index) => (
              <TeamspacePanel key={`teamspace-panel-${index}`} {...{ teamspace }} />
            ))}
        </TeamspaceListContent>
      </TeamspaceListBox>
      <AddButton onClick={handleAddButtonClick}>팀 스페이스 추가 +</AddButton>
      {isCreateFormOpen && <TeamspaceCreateModal {...{ handleCancelClick, handleSubmitClick }} />}
    </Wrapper>
  );
}

const Wrapper = styled(FlexColumn)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 550px;
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
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  justify-items: center;
  align-items: center;
  gap: 16px;
  overflow-y: scroll;
`;

const AddButton = styled.button`
  width: 150px;
  height: 24px;
  color: white;
  background-color: blue;
  border: 1px solid blue;
  border-radius: 12px;
  opacity: 0.4;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;
