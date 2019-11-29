const request = require('request-promise');

// getalldata
exports.getalldata = async (ctx) => {
    let promise = async () => {
        const t = encodeURI("현대자동차");
        let r = await request.get(
            {
                uri: "https://recall.run.goorm.io/callNLPJSON?company=kisa&system=recall&classgubun=ALL&var1=" + t
            }
        );
        let b = await r;
        await console.log(b);
        return r;
    };

    result = await Promise.all([promise()]);

    ctx.body = result;
};