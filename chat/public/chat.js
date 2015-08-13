window.onload = function() {

    var messages = [];

    var socket = io.connect('http://localhost:3700');

    var field = document.getElementById("field");

    var sendButton = document.getElementById("send");

    var content = document.getElementById("content");
    var name = document.getElementById("Name");


    socket.on('message', function (data) {

        if(data.message) {
            if(data.usename==null){
                data.usename="游客";
            }
            messages.push(data.usename+" : "+data.message);

            var html = '';

            for(var i=0; i<messages.length; i++) {

                html += messages[i] + '<br />';

            }

            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;

        } else {

            console.log("出了一点问题：", data);

        }

    });


    sendButton.onclick = function() {

        var text = field.value;
        if (Name.value==null) {
            alert("请输入用户名");
            return ;
        };
        socket.emit('send', { message: text,usename:Name.value});
        field.value="";
        Name.value = "";
    };
    field.addEventListener("keypress",entryE,true);
    function entryE(e){
        if(e.keyCode ==13){
            socket.emit('send', { message: field.value,usename:Name.value});
            field.value="";
            Name.value = "";
        }
    }
}
