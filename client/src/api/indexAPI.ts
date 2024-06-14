const SERVER = import.meta.env.VITE_SERVER;

const UNKNOWN_ERROR_MESSAGE = '알 수 없는 에러가 발생하였습니다.';

export const postLogin = async (nickname: string) => {
  try {
    const response = await fetch(`${SERVER}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname }),
    });

    if (!response.ok) throw new Error(UNKNOWN_ERROR_MESSAGE);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postRegistration = async (nickname: string) => {
  try {
    const response = await fetch(`${SERVER}/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname }),
    });

    if (!response.ok) throw new Error(UNKNOWN_ERROR_MESSAGE);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const sendTeamspaceListRequest = async () => {
  try {
    const response = await fetch(`${SERVER}/teamspaces`);

    if (!response.ok) throw new Error(UNKNOWN_ERROR_MESSAGE);

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const postNewTeamspace = async (title: string) => {
  try {
    const response = await fetch(`${SERVER}/api/teamspace`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) throw new Error(UNKNOWN_ERROR_MESSAGE);

    return response;
  } catch (error) {
    console.error(error);
  }
};
