const request = require('request-promise');

// getalldata
exports.getalldata = async (ctx) => {
    const promise = async () => {
        const t = encodeURI(ctx.params.value);
        let r = await request.get(
            {
                uri: "https://recall.run.goorm.io/callNLPJSON?company=kisa&system=recall&classgubun=ALL&var1=" + t
            }
        );
        return r;
    };

    result = await Promise.all([promise()]);

    ctx.body = result;
};

exports.apply = async (ctx) => {
    ctx.body = ctx.request.body.value;
};