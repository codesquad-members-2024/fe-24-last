const SERVER = import.meta.env.VITE_SERVER;

const LOGIN_ERROR_MESSAGE: { [key: number]: string } = {
  400: '입력 형식이 맞지 않습니다.',
  404: '닉네임이 존재하지 않습니다.',
  409: '중복된 닉네임입니다.',
  500: '서버와의 연결에 실패하였습니다.',
};

const TEAMSPACES_ERROR_MESSAGE: { [key: number]: string } = {
  400: '입력 형식이 맞지 않습니다.',
  409: '중복된 팀 스페이스 이름입니다.',
  500: '서버와의 연결에 실패하였습니다.',
};

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

    if (!response.ok) {
      const errorMessage = LOGIN_ERROR_MESSAGE[response.status] || UNKNOWN_ERROR_MESSAGE;
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE;
    throw new Error(message);
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

    if (!response.ok) {
      const errorMessage = LOGIN_ERROR_MESSAGE[response.status] || UNKNOWN_ERROR_MESSAGE;
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export const sendTeamspaceListRequest = async () => {
  try {
    const response = await fetch(`${SERVER}/teamspaces`);

    if (!response.ok) {
      const errorMessage = TEAMSPACES_ERROR_MESSAGE[response.status] || UNKNOWN_ERROR_MESSAGE;
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE;
    throw new Error(message);
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

    if (!response.ok) {
      const errorMessage = TEAMSPACES_ERROR_MESSAGE[response.status] || UNKNOWN_ERROR_MESSAGE;
      throw new Error(errorMessage);
    }
    throw new Error(UNKNOWN_ERROR_MESSAGE);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE;
    throw new Error(message);
  }
};
