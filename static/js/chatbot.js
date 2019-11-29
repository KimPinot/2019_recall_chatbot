let answerarray = "";
let lastQuestion = "";
let recallarray = "";
let recallsubarray = "";
let answerSelectLength = -1;
let recallSelectLength = -1;
let query = "";

window.addEventListener('DOMContentLoaded', () => {
    const chatBotValue = document.getElementById("JSchatBotValue");
    const chatBotSubmit = document.getElementById("JSchatBotSubmit");
    const chatBotBody = document.getElementById("chatBody");
    const answerSelect = document.getElementsByClassName("JSchatBotAnswerSelect");
    const recallSelect = document.getElementsByClassName("JSrecallSelect");
    const applyForm = document.getElementById('apply');
    const user_id = "0xe292c994516c8b35c9743b260ec2086d1a47e14d";

    // 챗봇으로 텍스트를 작성하는 코드
    chatBotValue.addEventListener('keyup', () => {
        if (window.event.keyCode === 13) {
            chatSend(chatBotValue.value, true);
            bottomScroll();
        }
    });

// 보내기 버튼이 눌렸을때 텍스트를 보내는 코드
    chatBotSubmit.addEventListener('click', () => {
        chatSend(chatBotValue.value, true);
        bottomScroll();
    });

    // 채팅 입력시 하단으로 강제 스크롤
    const bottomScroll = () => {
        chatBotBody.scrollTo(0, chatBotBody.scrollHeight);
    };

    // 버튼에 자동으로 이벤트 리스너 추가
    const addEvent = () => {
        if (answerSelect.length > 0) {
            if (answerSelect.length === answerSelectLength) {
                return false;
            }

            for (let i = 0; i < answerSelect.length; i++) {
                let j = i;
                if (i > answerSelectLength) {
                    const t = Number(answerSelect[i].getAttribute("data-idx")) + 1;
                    j = t + answerSelectLength;
                }
                const c = answerSelect[i].getAttribute("data-idx");

                const dooooo = () => {
                    if (answerSelect[j].innerHTML === lastQuestion) {
                        alert('[선택해서보내기] 똑같은 질의를 여러번 할 수 없습니다!');
                        return false;
                    }
                    const v =
                        answerSelect[c].getAttribute('data-answer') + `
                    <br>
                    <a href="http://` + answerarray[c].Link + `" target="_blank">자세히보기</a>
                    <br>
                    <button id="JSchatBotRecallForm">
                        리콜 신청하기
                    </button>
                `;

                    chatSend(answerSelect[j].innerHTML, false);
                    botChat(v);

                    const f = document.getElementById('JSchatBotRecallForm');
                    f.addEventListener('click', () => {
                        chatSend("신청" + answerSelect[j].innerHTML, false);
                        apply(answerarray[c].Link_Gubun, answerarray[c].Question);
                    });
                    f.removeAttribute("id");
                };

                // console.log([j, c]);\
                // console.log(answerSelect[j].getAttribute('eventseted'));
                if (answerSelect[j].getAttribute('eventseted') !== "true") {
                    // console.log('이벤트가 감지되지 않음');
                    answerSelect[j].addEventListener("click", () => {
                        dooooo();
                        answerSelect[j].setAttribute('eventseted', "true");
                    });
                }
            }

            if (answerSelect.length !== 0) {
                answerSelectLength = answerSelect.length - 1;
            }
            // console.log([Number(answerSelectLength + 1), answerSelect.length]);
            // console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        }

        if (recallSelect.length > 0) {
            if (recallSelect.length === recallSelectLength) {
                return false;
            }

            for (let i = 0; i < recallSelect.length; i++) {
                let j = i;
                if (i > recallSelectLength) {
                    const t = Number(recallSelect[i].getAttribute("data-idx")) + 1;
                    j = t + recallSelectLength;
                }
                const c = recallSelect[i].getAttribute("data-idx");

                const dooooo = () => {
                    if (recallSelect[j].innerHTML === lastQuestion) {
                        alert('[선택해서보내기] 똑같은 질의를 여러번 할 수 없습니다!');
                        return false;
                    }
                    const v = `
                        <div>
                            ` + recallarray[i].infoSj + `
                        </div>
                        <div class="small">
                            ` + recallarray[i].infoDetailCn + `
                        </div>
                        <button id="JSrecallSeeInfo">
                            리콜 현황 조회하기
                        </button>
                    `;

                    query = recallarray[i].infoSj;
                    chatSend(recallSelect[j].innerHTML, false);
                    botChat(v);

                    const f = document.getElementById('JSrecallSeeInfo');
                    f.addEventListener('click', () => {
                        chatSend("상세보기" + recallSelect[j].innerHTML, false, "recallInfo", recallarray[i].infoId);
                    });
                    f.removeAttribute("id");
                };

                // console.log([j, c]);\
                // console.log(answerSelect[j].getAttribute('eventseted'));
                if (recallSelect[j].getAttribute('eventseted') !== "true") {
                    // console.log('이벤트가 감지되지 않음');
                    recallSelect[j].addEventListener("click", () => {
                        dooooo();
                        recallSelect[j].setAttribute('eventseted', "true");
                    });
                }
            }

            if (recallSelect.length !== 0) {
                recallSelectLength = recallSelect.length - 1;
            }
            // console.log([Number(answerSelectLength + 1), answerSelect.length]);
            // console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        }
    };

    // 사용자가 메시지를 보내는 기능
    const chatSend = (value, isajax, option, query) => {
///        console.log([lastQuestion, value, isajax]);
        if (lastQuestion === value) {
            alert('[일반보내기] 똑같은 질의를 여러번 할 수 없습니다!');
            return false;
        } else if (value === "") {
            alert('내용을 입력해주세요!');
            return false;
        }

        const data = `
            <div class="userchat">
                <span class="chat">
                    ` + value + `         
                </span>
            </div>
        `;

        bottomScroll();

        lastQuestion = value;

        if (isajax) {
            AJAX("GET", "localhost:4001/api/user/getData/" + value, null);
        }

        if (option === "recallInfo") {
            AJAX("GET", "localhost:4001/api/user/recallhistory/infoId/" + query, null);
        }

        // console.log([value, isajax, option, query]);
        chatBotBody.innerHTML += data;
        chatBotValue.value = "";
    };

// 리콜 신청 폼
    const apply = (link, title) => {
        applyTitle = title;
        applyForm.innerHTML = `
        <div class="container">
            <div class="background" id="JSchatBotApplyClose"></div>
            <div class="form">
              <div class="center">
                <h1>리콜 신청</h1>
                <input type="hidden" id="JSchatBotApplyLink" value="` + link + `">
                <input type="text" id="JSchatBotChadae" placeholder="고유번호 입력" value="KMHEM42APXA123456">
                <textarea id="JSchatBotApplyValue" placeholder="리콜 신청 사유 입력"></textarea>
                <button id="JSchatBotApplysSubmit">전송하기</button>
              </div>
            </div>
      </div>
    `;
        applyForm.setAttribute('class', 'show');

        const v = document.getElementById('JSchatBotApplyValue');
        const c = document.getElementById('JSchatBotApplyClose');
        const s = document.getElementById('JSchatBotApplysSubmit');
        const l = document.getElementById('JSchatBotApplyLink');
        const cha = document.getElementById('JSchatBotChadae');

        const close = () => {
            applyForm.removeAttribute('class');
            applyForm.innerHTML = "";
            botChat('사용자가 작업을 취소했습니다.');
        };

        s.addEventListener('click', () => {
            if (v.value === "") {
                alert("내용을 입력해주세요!");
                return false;
            }

            const data = {
                "user_id": "0xe292c994516c8b35c9743b260ec2086d1a47e14d",
                "user_gubun": encodeURI("소비자"),
                "infoId": encodeURI(l.value),
                "serialno": encodeURI(cha.value),
                "request_remarks": encodeURI(v.value),
                "status": "request",
                "score": 0,
                "score_remarks": "test"
            };

            // console.log(data);

            AJAX("POST", "localhost:4001/api/user/apply/", data);
            close();
        });

        c.addEventListener('click', () => {
            const check = confirm("리콜 작성을 취소하시겠습니까?");
            if (check) {
                close();
            } else {
                return false;
            }
        });
    };

// 챗봇이 메시지를 보내는 기능
    const botChat = (sendtext) => {
        let chatbottext = "";

        // 웰컴 메세지 출력
        if (sendtext === "welcome") {
            chatbottext = `
                안녕하세요. 리콜봇입니다!
                <br>
                궁금하신 사항이 있으시다면, 무엇이든지 물어보세요!
            `;
        } else if (sendtext === "cantfinddata") {
            chatbottext = `
                질문하신 내용과 유사한 답을 찾지 못했어요.
            `;
        } else if (sendtext === "compelete") {
            chatbottext = applyTitle + ` 에 대한 리콜 신청이 완료되었어요!
            `;
        } else {
            chatbottext = sendtext;
        }

        const data = `
        <div class="botchat">
        <div class="profile">
          <img src="./image/chatbot.png">
        </div>

        <div class="chat">
          <span>` + chatbottext + `</span>
        </div>

      </div>
    `;
        chatBotBody.innerHTML += data;
        addEvent();
        bottomScroll();
    };

// AJAX
    const AJAX = async (method, link, data, useResponse) => {
        const xhttp = new XMLHttpRequest();

        // console.log([method, link, data]);
        if (method === link || null) {
            error(1);
            return false;
        }

        // 요청 성공시
        xhttp.onreadystatechange = () => {
            // console.log([xhttp.readyState, xhttp.status]);
            if (xhttp.readyState !== XMLHttpRequest.DONE) {
                chatBotValue.setAttribute('disabled', ' disabled');
                chatBotValue.setAttribute('placeholder', '응답을 기다리는 중이에요!');
            } else if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 500) {
                chatBotValue.removeAttribute('disabled', ' disabled');
                chatBotValue.setAttribute('placeholder', '궁금하신 내용을 입력해주세요!');
                botChat("서버 오류입니다! <br> 조금 뒤에 다시 시도해주세요!");
            } else if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
                chatBotValue.removeAttribute('disabled', ' disabled');
                chatBotValue.setAttribute('placeholder', '궁금하신 내용을 입력해주세요!');

                // 답변 처리
                r = xhttp.responseText;

                // console.log(r);

                // infoid가 있을 시, 다른 리스트 목록으로 추출
                if (r.indexOf("infoId") !== -1) {
                    if (r.indexOf("insert_dt") !== -1) {
                        query =
                            botChat(responseProcess(r, "insert_dt"));
                        return true;
                    }

                    botChat(responseProcess(r, "infoId"));
                    return true;
                }

                // infoid가 있을 시, 다른 리스트 목록으로 추출
                else if (r.indexOf("Gubun") !== -1) {
                    botChat(responseProcess(r, "Gubun"));
                    return true;
                }

                // 내용을 찾을 수 없음
                if (r === "[\"유사도 0.3 이하 이면 미답변으로 처리합니다.\"]") {
                    botChat('cantfinddata');
                    return true;
                }

                // 리콜 신청 완료
                if (r === "[\"complete\"]") {
                    botChat('compelete');
                    return true;
                }

                if (useResponse === false) {
                    return false;
                }

                // 아니면 HTML 쿼리로 내보냄
                botChat(r);
            }

            // 에러 발생시 status
            xhttp.addEventListener("error", () => {
                console.error(xhttp.status);
            });
        };
        xhttp.open(method, "http://" + link, true);

        if (data !== null) {
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        }

        await xhttp.send(JSON.stringify(data));
    };

// 데이터를 가공하는 함수
    const responseProcess = (d, dataName) => {
        let r = "";

        if (dataName === "Gubun") {
            answerarray = JSON.parse(JSON.parse(d)[0]);
            // 헤더
            r +=
                answerarray.length + `개의 결과가 있습니다.
            <br>
            텍스트를 눌러 자세한 내용을 확인해 보세요.
        `;

            // 반복문
            for (let i = 0; i < answerarray.length; i++) {
                r += `
                <button class="JSchatBotAnswerSelect" data-answer="` + answerarray[i].Answer + `" data-idx="` + i + `">
                ` +
                    answerarray[i].Question;
                +`
                </button>
            `;
            }
            return r;
        } else if (dataName === "infoId") {
            recallarray = JSON.parse(JSON.parse(d)[0]);
            // console.log(recallList);
            // 헤더
            r += `
            고객님이 신청한 리콜은 다음과 같습니다!
            <br>
            제목을 눌러 리콜의 진행사항을 확인보세요.
        `;

            // 반복문
            for (let i = 0; i < recallarray.length; i++) {
                r += `
                <button class="JSrecallSelect" data-idx="` + i + `">
                ` +
                    recallarray[i].infoSj;
                +`
                </button>
            `;
            }
            return r;
        } else if (dataName === "insert_dt") {
            recallsubarray = JSON.parse(JSON.parse(d)[0]);
            console.log(recallsubarray);
            // 헤더
            r += query + `에 대한 리콜 결과는 다음과 같습니다.
        `;

            // 반복문
            for (let i = 0; i < recallsubarray.length; i++) {
                r += `<div class="recallArray"> <span class="date">` +  recallsubarray[i].insert_dt + ` </span> ㅡ <span class="name">` + recallsubarray[i].user_gubun + `</span> : <span class="text"> ` + recallsubarray[i].request_remarks + ` </span> <span>(` + recallsubarray[i].status + `)</span></div>`
            }

            return r;
        }
    };

// 에러 발생시 오류를 작성하는 코드
    const error = (errorCode) => {
        let query, errorText;

        if (errorCode === 1) {
            query = "[AJAX] 오류가 발생했습니다. 오류코드 001";
            errorText = "[AJAX] 필수 인수가 누락되었습니다.";
        } else {
            query = "알 수 없는 오류가 발생했습니다. 오류코드 000";
            errorText = "[JavaScript] 콘솔의 오류 내용을 확인해주세요."
        }

        botChat(query);
        console.error(errorText);
    };

    botChat("welcome");

// 만약 해당 유저가 리콜을 한 전적이 있다면 recall 목록을 보여줌.
    AJAX("GET", "localhost:4001/api/user/recallhistory/userid/" + user_id, null, false);
})
;