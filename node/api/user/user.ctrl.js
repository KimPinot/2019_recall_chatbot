const request = require('request');

// getalldata
exports.getalldata = async (ctx) => {
    let promise = () => {
        return request.get({uri:"https://recall.run.goorm.io/callNLPJSON?company=kisa&system=recall&classgubun=ALL&var1=현대자동차"}, function (error, response, body) {
            return response;
        });
    };

    result = await Promise.all([promise()]);

    ctx.body = result;
};