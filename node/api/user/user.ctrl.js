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
    const d = ctx.request.body;
    // https://recall.run.goorm.io/recall_request? infoId=RCLL_000000000019416& user_id=0xe292c994516c8b35c9743b260ec2086d1a47e14d& serialno=KMHEM42APXA123456& request_remarks=test& status=request& score=0& score_remarks=test
    // console.log(d);
    const url = "https://recall.run.goorm.io/recall_request?infoId=" + d.infoId + "&user_id=" + d.user_id + "&user_gubun=" + d.user_gubun + "&serialno=" + d.serialno + "&status=" + d.status + "&request_remarks=" + d.request_remarks + "&score=" + d.score + "&score_remarks=" + d.score_remarks;
    const promise = async () => {
        let r = await request.get(
            {
                uri: url
            }
        );
        return r;
    };

    result = await Promise.all([promise()]);

    ctx.body = result;
};