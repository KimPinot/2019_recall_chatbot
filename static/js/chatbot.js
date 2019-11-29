let answerarray = "";
let lastQuestion = "";

window.addEventListener('DOMContentLoaded', () => {
    const chatBotValue = document.getElementById("JSchatBotValue");
    const chatBotSubmit = document.getElementById("JSchatBotSubmit");

    const chatBotBody = document.getElementById("chatBody");

    // 예상 답변 설정
    const answerSelect = document.getElementsByClassName("JSchatBotAnswerSelect");

    const bottomScroll = () => {
        chatBotBody.scrollTo(0, chatBotBody.scrollHeight);
    };

    // 버튼에 자동으로 이벤트 리스너 추가
    const addEvent = () => {
        for (let i = 0; i < answerSelect.length; i++) {
            answerSelect[i].addEventListener("click", () => {
                if (answerSelect[i].innerHTML === lastQuestion) {
                    alert('똑같은 질의를 여러번 할 수 없습니다!');
                    return false;
                }
                const v =
                    answerSelect[i].getAttribute('data-answer') + `
                    <br>
                    <a href="http://` + answerarray[i].Link + `" target="_blank">자세히보기</a>
                `;
                chatSend(answerSelect[i].innerHTML);
                botChat(v);
            });
        }
    };

    // 챗봇으로 텍스트를 작성하는 코드
    chatBotValue.addEventListener('keyup', () => {
        if (window.event.keyCode === 13) {
            chatSend(chatBotValue.value);
            addEvent();
            bottomScroll();
        }
    });

    // 보내기 버튼이 눌렸을때 텍스트를 보내는 코드
    chatBotSubmit.addEventListener('click', () => {
        chatSend(chatBotValue.value);
        addEvent();
        bottomScroll();
    });

    // 사용자가 메시지를 보내는 기능
    const chatSend = (value) => {

        if (lastQuestion === value) {
            alert('똑같은 질의를 여러번 할 수 없습니다!');
            return;
        } else if (value === "") {
            alert('내용을 입력해주세요!');
            return;
        }

        const data = `
            <div class="userchat">
                <span class="chat">
                    ` + value + `         
                </span>
            </div>
        `;

        addEvent();
        bottomScroll();

        lastQuestion = value;

        chatBotBody.innerHTML += data;
        chatBotValue.value = "";
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
        } else {
            chatbottext = sendtext;
        }

        const data = `
        <div class="botchat">
        <div class="profile">
          <img src="//placehold.it/50x50">
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
    const AJAX = async (method, link, data) => {
        const xhttp = new XMLHttpRequest();

        if (method === link || null) {
            error(1);
            return false;
        }

        // 요청 성공시
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
                r = xhttp.responseText;
                botChat(responseProcess(r));
            }
        };
        xhttp.open(method, link, true);
        await xhttp.send(data);
    };

    // 데이터를 가공하는 함수
    const responseProcess = (d) => {
        answerarray = JSON.parse(JSON.parse(d)[0]);
        let r = "";

        r += `
            테스트 메시지 입니다.
            <br />
            으악 어머니 분산처리
        `;

        for (let i = 0; i < answerarray.length; i++) {
            r += `
                <button class="JSchatBotAnswerSelect" data-answer="` + answerarray[i].Answer + `">
                ` +
                answerarray[i].Question;
            + `
                </button>
            `;
        }
        return r;
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

    AJAX("GET", "http://localhost:4001/api/user/", null);
});