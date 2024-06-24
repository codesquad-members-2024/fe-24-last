import { sendArticleRequestById } from '@/api/articleAPI';
import { sendTeamspaceListRequest } from '@/api/mainAPI';
import { sendTeamspaceRequestById } from '@/api/teamspaceAPI';
import { Block, TeamspaceDescription } from '@/constants';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useTeamspacesQuery = () =>
  useSuspenseQuery<TeamspaceDescription[]>({
    queryKey: ['teamspaces'],
    queryFn: sendTeamspaceListRequest,
    refetchOnWindowFocus: false,
  });

export const useTeamspaceQuery = ({ teamspaceId = '' }) =>
  useSuspenseQuery<TeamspaceDescription>({
    queryKey: ['teamspace', teamspaceId],
    queryFn: () => sendTeamspaceRequestById(teamspaceId),
    refetchOnWindowFocus: false,
  });

export const useArticleQuery = ({ teamspaceId = '', articleId = '' }) =>
  useSuspenseQuery<Block[]>({
    queryKey: ['article', articleId],
    queryFn: async () => {
      const response = await sendArticleRequestById({ teamspaceId, articleId });
      return response.content;
    },
    refetchOnWindowFocus: false,
  });
