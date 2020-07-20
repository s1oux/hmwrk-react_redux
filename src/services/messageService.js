import callWebApi from '../helpers/webApiHelper';
import mockMessages from './messagesMock';

const FAKE_MESSAGES_API_URL =
  'https://edikdolynskyi.github.io/react_sources/messages.json';

export const getMessagesFromMock = () => {
  return mockMessages;
};

export const getMessages = async () => {
  const response = await callWebApi({
    endpoint: FAKE_MESSAGES_API_URL,
    type: 'GET',
  });
  return response.json();
};
