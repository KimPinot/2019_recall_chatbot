const request = require('request-promise');

// 리콜 목록을 불러옴
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

// 리콜 신청
exports.apply = async (ctx) => {
    const d = ctx.request.body;
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

// infoid에 따라 목록 불러오기
exports.gethistorybyinfoid = async (ctx) => {
    const promise = async () => {
        const t = encodeURI(ctx.params.value);
        let r = await request.get(
            {
                uri: "https://recall.run.goorm.io/recall_history_by_infoId?infoId=" + t
            }
        );
        return r;
    };
    result = await Promise.all([promise()]);
    ctx.body = result;
};

// userid의 이름으로 된 리콜 목록 알아내기
exports.gethistorybyuserid = async (ctx) => {
    const promise = async () => {
        const t = encodeURI(ctx.params.value);
        let r = await request.get(
            {
                uri: "https://recall.run.goorm.io/recall_history_consumer_by_user_id?user_id=" + t
            }
        );
        return r;
    };
    result = await Promise.all([promise()]);
    ctx.body = result;
};