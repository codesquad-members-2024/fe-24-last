import styled from 'styled-components';
import { TeamspaceDescription } from '../../constants';
import { FlexColumn } from '../../styles/themes';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useTeamspaceDeleteMutation } from '@/hooks/mutationHooks';

export interface TeamspacePanelProps {
  teamspace: TeamspaceDescription;
}

const FIRST_PAGE = 0;

export default function TeamspacePanel({ teamspace }: TeamspacePanelProps) {
  const client = useQueryClient();
  const { title, _id } = teamspace;
  const navigate = useNavigate();
  const defaultArticleId = teamspace.articles[FIRST_PAGE]._id || '';

  const successFn = () => client.invalidateQueries({ queryKey: ['teamspaces'] });

  const { deleteTeamspace } = useTeamspaceDeleteMutation({ successFn });

  const handleDeleteClick = () => deleteTeamspace(_id);
  const handleButtonClick = () => navigate(`/teamspace/${_id}/article/${defaultArticleId}`);

  return (
    <Wrapper>
      <DeleteButton onClick={handleDeleteClick}>x</DeleteButton>
      <TitleText>{title}</TitleText>
      <button onClick={handleButtonClick}>들어가기</button>
    </Wrapper>
  );
}

const Wrapper = styled(FlexColumn)`
  position: relative;
  box-sizing: border-box;
  padding: 0 10px;
  width: 100px;
  height: 100px;

  border: 1px solid black;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
`;

const TitleText = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  text-align: center;
  width: 100%;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  left: 71px;
`;
