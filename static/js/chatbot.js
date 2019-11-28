window.addEventListener('DOMContentLoaded', () => {
    const chatBotValue = document.getElementById("JSchatBotValue");
    const chatBotSubmit = document.getElementById("JSchatBotSubmit");

    const chatBotBody = document.getElementById("chatBody");

    // 챗봇으로 텍스트를 작성하는 코드
    chatBotValue.addEventListener('keyup', () => {
        if (window.event.keyCode === 13) {
            chatBotSend();
        }
    });

    // 보내기 버튼이 눌렸을때 텍스트를 보내는 코드
    chatBotSubmit.addEventListener('click', () => {
        chatBotSend();
    });

    // 사용자가 메시지를 보내는 기능
    const chatBotSend = () => {
        if (chatBotValue.value === "") {
            alert('내용을 입력해주세요!');
            return false;
        }

        const data = `
            <div class="userchat">
                <span class="chat">
                    ` + chatBotValue.value + `         
                </span>
            </div>
        `
        chatBotBody.innerHTML += data;
        chatBotValue.value = "";
    };

    // 챗봇이 메시지를 보내는 기능
    const botChat = (setisbool, sendtext) => {
        const chatbotidx = 1;
        let chatbottext = "";
        let setisform = "";

        // 웰컴 메세지 출력
        if (sendtext === "welcome") {
            chatbottext = `
                안녕하세요. 리콜봇입니다!
                <br>
                궁금하신 사항이 있으시다면, 무엇이든지 물어보세요!
                <br>
                응답에 만족도를 입력해주시면, 챗봇이 더 똑똑해질거에요!
            `;
        } else {
            chatbottext = sendtext;
        }

        // 값이 true 일 경우, 만족도 조사 기능 추가
        if (setisbool === true) {
            setisform = `
            <ul class="chatBotSetis">
                <li id="JSchatBotSetisYes">
                   <i class="far fa-thumbs-up"></i>
                </li>
                <li id="JSchatBotSetisNo">
                    <i class="far fa-thumbs-down"></i>
                </li>
            </ul>
            `
        }

        const data = `
        <div class="botchat" data-chatidx="` + chatbotidx + `">
        <div class="profile">
          <img src="//placehold.it/50x50">
        </div>

        <div class="chat">
          <span>` + chatbottext + `</span>
          <div class="function">
            <div class="fake"></div>
            ` + setisform + `
          </div>
        </div>

      </div>
    `;
        chatBotBody.innerHTML += data;
    };

    // AJAX
    const AJAX = (method, link, data) => {
        const xhttp = new XMLHttpRequest();

        if (method === link || null) {
            error(1);
            return false;
        }

        // 요청 성공시
        xhttp.onreadystatechange = function () {
            console.log(xhttp.readyState);

            if (xhttp.readyState === 4 && xhttp.status === 200) {
                r = xhttp.responseText;
            } else {
                // 요청 실패시 경고를 띄움
                error();
            }
        };
        xhttp.open(method, link, true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(data);

        console.log([r]);
        return [r];
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

        botChat(false, query);
        console.error(errorText);
    };

    botChat(false, "welcome")
});