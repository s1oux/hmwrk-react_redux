export const selectRandomUser = (messages) => {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  return {
    name: randomMessage.user,
    id: randomMessage.userId,
  };
};

export const countUsersInChat = (messages) =>
  new Set(messages.map((message) => message.user)).size;

export const isCurrentUserMessage = (user, message) =>
  user.id === message.userId;
