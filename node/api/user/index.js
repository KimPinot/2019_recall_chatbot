const Router = require('koa-router');
const user = new Router();
const userCtrl = require('./user.ctrl');

user.get('/getData/:value', userCtrl.getalldata);
user.post('/apply', userCtrl.apply);
user.get('/recallhistory/infoid/:value', userCtrl.gethistorybyinfoid);
user.get('/recallhistory/userid/:value', userCtrl.gethistorybyuserid);

module.exports = user;