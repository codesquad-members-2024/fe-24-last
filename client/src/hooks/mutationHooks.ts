import { updateArticleRequestById } from '@/api/articleAPI';
import { postLogin, postNewTeamspace, postRegistration } from '@/api/mainAPI';
import { sendTeamspaceDeleteRequest } from '@/api/teamspaceAPI';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';

export const useLoginMutation = ({ successFn }: { successFn: () => void }) => {
  const { mutate: fetchLogin } = useMutation({
    mutationFn: postLogin,
    onSuccess: successFn,
    onError: ({ message: errorMessage }) => message.warning(errorMessage),
  });

  return { fetchLogin };
};

export const useRegistrationMutation = ({ successFn }: { successFn: () => void }) => {
  const { mutate: fetchRegistration } = useMutation({
    mutationFn: postRegistration,
    onSuccess: successFn,
    onError: ({ message: errorMessage }) => message.warning(errorMessage),
  });

  return { fetchRegistration };
};

export const useNewTeamsapceMutation = ({ successFn }: { successFn: () => void }) => {
  const { mutate: fetchNewTeamspace } = useMutation({
    mutationFn: postNewTeamspace,
    onSuccess: successFn,
    onError: ({ message: errorMessage }) => message.warning(errorMessage),
  });

  return { fetchNewTeamspace };
};

export const useTeamspaceDeleteMutation = ({ successFn }: { successFn: () => void }) => {
  const { mutate: deleteTeamspace } = useMutation({
    mutationFn: sendTeamspaceDeleteRequest,
    onSuccess: successFn,
  });

  return { deleteTeamspace };
};

export const useUpdateArticleMutation = () => {
  const { mutate: updateArticle } = useMutation({
    mutationFn: updateArticleRequestById,
  });

  return { updateArticle };
};
