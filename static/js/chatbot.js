window.addEventListener('DOMContentLoaded', function(){
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
    }
});