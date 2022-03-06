console.log("hello");

jQuery(function($){
    $("#update-avatar").change(function(e){
        const file = this.files[0];
        if(file){
            const reader = new FileReader();
            reader.addEventListener("load",function(){
                $("#preview-pic").attr("src",this.result);
            })
            reader.readAsDataURL(file);
        }else{
            console.log("no..")
        }
    })
    $("#add-friend-btn").click(function(e){
        e.preventDefault();
        $.ajax({
            type : "post",
            url : $("#add-friend-btn").attr("href"),
            success : function(data){
                console.log(data);
                console.log("friendship setup!");
            },
            error : function(err){
                console.log(err.responseText);
            } 
        })
    })
})