'use strict';

/**
 * Module dependencies.
 */
var paysPolicy = require('../policies/pays.server.policy'),
  pays = require('../controllers/pays.server.controller');

module.exports = function (app) {
  // Pays collection routes
  app.route('/api/pays').all(paysPolicy.isAllowed)
    .get(pays.list)
    .post(pays.create);

  // Single pay routes
  app.route('/api/pays/:payId').all(paysPolicy.isAllowed)
    .get(pays.read)
    .put(pays.update)
    .delete(pays.delete);

  // Finish by binding the pay middleware
  app.param('payId', pays.payByID);
};
