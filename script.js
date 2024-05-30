document.addEventListener('DOMContentLoaded',function(){
    const socket = io();

    const messageInput = document.getElementById('message-Input');
    const SendButton = document.getElementById('send-Button');
    const chatOutput = document.getElementById('chat-Output');

    SendButton.addEventListener('click',sendMessage);

    socket.on('chat-message', function (data){
        displayMessage(data);
    });
    
    
    function sendMessage(){
        const message = messageInput.value.trim();
        // console.log(message);
          if (message !==''){
            socket.emit('chat-message',{
            user: 'you',
            message: message,
            server1: 'AI',
            messageAI: serverfunction(message),
        });

        messageInput.value = '';
    }
    }

    function serverfunction(message){
        const keyword = ['price','display','os','ram','camera'];
        //console.log(keywords);
        const messageWords = message.split(' ');
        console.log(messageWords);
        let ans = '';
        let keywordFound = false;
        
        for(let i = 0; i < messageWords.length; i++) {
            const keywordIndex = keywords.indexOf(messageWords[i].toLowerCase());

            if (keywordIndex !== -1 && !keywordFound){

                 ans = generateAnswer(keywords[keywordIndex]) + ' ';
                 keywordFound = true;
            }else if (!keywordFound){
                ans += 'Ask a correct question. ';
            }
        }
        return ans.trim();
    }

    function generateAnswer(keyword){
        switch(keyword){
            case 'price':
                return 'price of product is $100';
                break;
            case 'display':
                    return 'display of product is LED 45 INCHES';
            case 'os':
                    return 'the operating system of the product is kitkat';
            case 'ram':
                    return  'the RAM of the product is 2GB';
            case 'camera':
                    return 'the camera resolution of the product is 128px';
            default:
                return 'ask a correct question';        


        }
    }

    function displayMessage(data) {
        
        const messageElement = document.createElement('div');
        // const timestamp = new Date().toLocaleTimeString();

        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${data.user}:</strong> ${data.message}<br> 
                    <strong>${data.server1}</strong>:${data.messageAI}<br>
                    <span class="timestamp">${timestamp}</span>`;
        chatOutput.appendChild(messageElement);

        // Scroll to the bottom of the chat
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
});