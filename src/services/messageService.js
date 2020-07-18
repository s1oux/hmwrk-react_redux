import callWebApi from '../helpers/webApiHelper';

const FAKE_MESSAGES_API_URL = 'https://api.npoint.io/b919cb46edac4c74d0a8';

export const getMessages = async () => {
  const response = await callWebApi({
    endpoint: FAKE_MESSAGES_API_URL,
    type: 'GET',
  });
  return response.json();
};
