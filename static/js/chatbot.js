window.addEventListener('DOMContentLoaded', () => {
    const chatBotValue = document.getElementById("JSchatBotValue");
    const chatBotSubmit = document.getElementById("JSchatBotSubmit");

    const chatBotBody = document.getElementById("chatBody");

    // AJAX
    const AJAX = (method, link, data) => {
        const xhttp = new XMLHttpRequest();

        // 요청 성공시
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                r = xhttp.responseText;
            } else {
                // 요청 실패시 경고를 띄움
                console.warn(xhttp.responseText);
            }
        };
        xhttp.open(method, link, true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(data);

        console.log([r]);
        return [r];
    };

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

    // 사용자가 메시지를 보내는 기능 추가
    const chatBotSend = () => {
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

    const botChat = (setisbool) => {
        const chatbotidx = 1;
        const chatbottext = "테스트";
        let setisform = "";

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


    botChat();
});