export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: '/register',
    LOGIN: '/login',
  },

  // User endpoints
  USER: {
    GET_PROFILE: '/users/me',
  },

  // Question endpoints
  QUESTION: {
    CREATE: '/questions',
    GET_ALL: '/questions',
    GET_BY_ID: (id: string) => `/questions/${id}`,
  },

  // Answer endpoints
  ANSWER: {
    CREATE: (questionId: string) => `/questions/${questionId}/answers`,
    GET_ALL: (questionId: string) => `/questions/${questionId}/answers`,
    VERIFY: (answerId: string) => `/answers/${answerId}/verify`,
    VOTE: (answerId: string, type: string) => `/answers/${answerId}/vote/${type}`,
    GET_VOTES: (answerId: string) => `/answers/${answerId}/votes`,
  },
} as const; 