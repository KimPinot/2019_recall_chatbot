window.addEventListener('DOMContentLoaded', () => {
    const chatBotValue = document.getElementById("JSchatBotValue");
    const chatBotSubmit = document.getElementById("JSchatBotSubmit");

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

    const chatBotSend = () => {
        console.log(chatBotValue.value);
        chatBotValue.value = "";
    };

    // var urls = '';
    // var opts = {
    //     method: 'POST',
    //     body: '{longUrl:"' + urls + '"}',
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // };
    // fetch('', opts).then(function (response) {
    //     return response.json();
    // }).then(function (body) {
    //     window.Unity.call(JSON.parse(JSON.stringify(body)).id);
    // });

        let data = `
        <div class="botchat" data-chatidx="` + 1 +`">
        <div class="profile">
          <img src="//placehold.it/50x50">
        </div>

        <div class="chat">
          <span>` + '테스트' + `</span>
          <div class="function">
            <div class="fake"></div>
            <ul class="chatBotSetis">
              <li id="JSchatBotSetisYes">
                <i class="far fa-thumbs-up"></i>
              </li>
              <li id="JSchatBotSetisNo">
                <i class="far fa-thumbs-down"></i>
              </li>
            </ul>
          </div>
        </div>

      </div>
    `;
});