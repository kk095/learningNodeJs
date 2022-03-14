module.exports.chatSocket = function(chatServer){
    let io = require('socket.io')(chatServer,{
        cors : {
            origin : "http://54.234.64.30",
            credentials : true
        }
    });
    io.sockets.on("connection",function(socket){
        console.log("new connection is requested  : ",socket.id);

        socket.on('join_chat',function(data){
            socket.join(data.chatroom);
            io.in(data.chatroom).emit("user_joined",data);
        })

        socket.on("send_message",function(data){
            console.log("send_message");
            io.in(data.chatroom).emit("receive_msg",data);
        })

        socket.on("disconnect",function(){
            console.log("socket disconnected!");
        })
    })
}