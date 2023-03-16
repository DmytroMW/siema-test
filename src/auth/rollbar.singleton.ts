const Rollbar = require('rollbar');

export const RollbarSngl = new Rollbar({
  accessToken: '9772add992c24d5188c12f8028598063',
  captureUncaught: true,
  captureUnhandledRejections: true,
});