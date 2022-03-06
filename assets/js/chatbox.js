$("#chat-box-cancel").click(function(e){
    e.preventDefault();
    let chatbox = $(".chat-box");
    console.log(chatbox);
    chatbox.toggleClass("chat-box-cancel");
    if($(this).html() == "X"){
        $(this).html('&#8593').css({
            "font-size":"2rem",
            "top":"-100%",
        });
    }
    else{
        $(this).html("X").css({
            "top":"-5%",
            "font-size":"1rem"
        });
    }

})