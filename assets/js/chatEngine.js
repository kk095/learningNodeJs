class chatEngine{
    constructor(chatboxId,useremail){
        this.chatbox = $(`#${chatboxId}`);
        this.userEmail = useremail;
        this.socket = io.connect("http://127.0.0.1:5000",{
            withCredentials : true
        });
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this
        this.socket.on("connect",function(){
            console.log("connection established using socket!");
            self.socket.emit('join_chat',{
                useremail : self.userEmail,
                chatroom : 'codial'
            })
            self.socket.on("user_joined",function(data){
            })
            $("#chat-submit").click(function(e){
                let newchat = $("#new-chat").val();
                $("#new-chat").val("");
                if(newchat != ""){
                    self.socket.emit("send_message",{
                        msg : newchat,
                        useremail : self.userEmail,
                        chatroom : 'codial'
                    })
                }
            });
            self.socket.on("receive_msg",function(data){
                console.log("receive_msg");
                $.ajax({
                    type : "post",
                    url : `chats/create/?msg=${data.msg}&useremail=${data.useremail}&chatroom=${data.chatroom}`,
                    success : function(data){
                        console.log("chat has been saved ",data);
                    },
                    error : function(err){
                        console.log(err.responseText);
                    }
                })
                let liclass = 'other-msg';
                if(self.userEmail == data.useremail){
                    liclass = "self-msg"
                }
                let newli = `<li class= ${liclass} >
                                ${data.msg}
                                <br>
                                <sub>${data.useremail}</sub>
                            </li>`
                let ul = $("#chat-msg");
                ul.append(newli);
            })
        })
    }
}