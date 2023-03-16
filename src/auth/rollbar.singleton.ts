const Rollbar = require('rollbar');

export const RollbarSngl = new Rollbar({
  accessToken: 'fcfc4c8ea0104285bb2279465737bf15',
  captureUncaught: true,
  captureUnhandledRejections: true,
});