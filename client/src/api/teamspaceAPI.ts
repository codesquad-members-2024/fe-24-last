const SERVER = import.meta.env.VITE_SERVER;

const UNKNOWN_ERROR_MESSAGE = '알 수 없는 에러가 발생하였습니다.';

export const sendTeamspaceRequestById = async (teamspaceId: string) => {
  try {
    const response = await fetch(`${SERVER}/api/teamspace/${teamspaceId}`);

    if (!response.ok) throw new Error(UNKNOWN_ERROR_MESSAGE);

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const sendTeamspaceDeleteRequest = async (teamspaceId: string) => {
  try {
    const response = await fetch(`${SERVER}/api/teamspace/${teamspaceId}`, { method: 'DELETE' });

    if (!response.ok) throw new Error(UNKNOWN_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE;
    throw new Error(message);
  }
};
