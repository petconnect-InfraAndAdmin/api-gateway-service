module.exports = {
  auth: `http://auth-service:${process.env.PORT_AUTH}`,
  userProfile: `http://user-profile-service:${process.env.PORT_USER_PROFILE}`,
  registration: `http://registration-service:${process.env.PORT_REGISTRATION}`,
  petProfile: `http://pet-profile-service:${process.env.PORT_PET_PROFILE}`,
  chat: `http://chat-service:${process.env.PORT_CHAT}`,
  notification: `http://notification-service:${process.env.PORT_NOTIFICATION}`,
  post: `http://post-service:${process.env.PORT_POST}`,
  comment: `http://comment-service:${process.env.PORT_COMMENT}`,
  media: `http://media-service:${process.env.PORT_MEDIA}`,
  feed: `http://feed-service:3010`, // puerto fijo por ahora
  report: `http://report-service:3011`, // puedes ajustarlo si lo defines en .env
  petHealth: `http://pet-health-service:3012`, // puedes ajustarlo también
};
