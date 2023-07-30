const MESSAGES = {
    // Successful operations
    SUCCESSFUL_OPERATION: 'Hooray! Operation successful!',
    SUCCESSFUL_LOGOUT: 'Farewell, brave adventurer! Logout complete.',
    SUCCESSFUL_RESET: 'Your password has been reset. Like magic!',
    SUCCESSFUL_SIGN_UP: 'Welcome aboard! You are now officially part of the crew.',
  
    // Errors and validation messages
    ERROR_GET_CONNECTION: 'Oops! There was a glitch while trying to connect.',
    SESSION_EXPIRED: 'Your adventure has been paused. Please log in again.',
    USER_NOT_LOGGED_IN: 'Hold up! The user is not logged in.',
    WRONG_USERNAME: 'Abandon hope! Wrong username, matey!',
    WRONG_PASSWORD: 'Ahoy there! Wrong password! Yo ho ho!',
    INVALID_EMAIL: 'Arrr! That be an invalid email address!',
    EMAIL_DOES_EXIST: 'Avast ye! No user with this email address be found.',
    EMAIL_USER_EXIST: 'Arrr! That email and username already be taken!',
    EMAIL_EXIST: 'Ye better be changing that email, matey! It already be taken!',
    USER_EXIST: 'Batten down the hatches! That username already exists!',
    SQL_INJECTION_ALERT: "Arrr! Attempted SQL Injection attack detected!",
  
    // Server errors and permissions
    SERVER_ERROR: "Arrr! Unknown server error. Please contact your friendly admin.",
    FORBIDDEN: 'Ye be not allowed to access this treasure!',
    
    // Authorization
    JWT_ERROR: 'JsonWebTokenError: invalid signature.',
    AUTHORIZATION_LVL: 'Avast ye! Authorization level: ',
  };
  
  module.exports = MESSAGES;
  