const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MS_IN_SECOND = 1000;
const DAY_IN_MS =
  MS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY;

const addLikeProp = (message) => ({
  ...message,
  likes: [],
});

const convertDatePropToDateType = (message) => ({
  ...message,
  createdAt: new Date(message.createdAt),
});

const sortByDateAsc = (message1, message2) =>
  message1.createdAt - message2.createdAt;

export const processMessagesInitData = (messages) => {
  return messages
    .map((message) => convertDatePropToDateType(addLikeProp(message)))
    .sort(sortByDateAsc);
};

const checkIfYesterday = (date) => {
  let propYesterday = new Date();
  propYesterday.setDate(propYesterday.getDate() - 1);
  return Math.floor((date - propYesterday) / DAY_IN_MS) === 1;
};

export const groupMessagesByDate = (messages) => {
  const groups = messages.reduce((groups, message) => {
    const messageDate = message.createdAt;
    const date = checkIfYesterday(messageDate)
      ? 'Yesterday'
      : messageDate.toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      messages: groups[date],
    };
  });
  return groupArrays;
};

export const getLastMessageDate = (messages) =>
  messages[messages.length - 1].createdAt;

export const createMessage = (user) => {
  return (messageText) => ({
    id: Math.random() + user.name,
    user: user.name,
    userId: user.id,
    likes: [],
    text: messageText,
    createdAt: new Date(),
  });
};

export const updateMessage = (messages) => {
  return (messageId, messageText) => {
    return messages.map((message) => {
      if (messageId === message.id) {
        message.text = messageText;
      }
      return message;
    });
  };
};

export const deleteMessage = (messages) => {
  return (messageId) => {
    return messages.filter((message) => message.id !== messageId);
  };
};

export const isLikedByUser = (message, user) => {
  return message.likes.some((userId) => isLikeFound(userId, user.id));
};

export const removeUserLike = (message, user) => {
  return message.likes.filter((userId) => !isLikeFound(userId, user.id));
};

export const isLikeFound = (userId, idInLikes) => {
  return userId === idInLikes;
};
