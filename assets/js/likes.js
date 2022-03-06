
    class Likes{
        constructor(element){
            this.ele = element;
            this.toggleLike(); 
        }

        toggleLike(){
            this.ele.click(function(e){
                e.preventDefault();
                let self = this
                $.ajax({
                    type : "POST",
                    url : $(self).attr("href"),
                })
                .done(function(data){
                    let likes = parseInt($(self).attr("data-likes"));
                    if(data.data.exits){
                        likes -=1;
                    }
                    else{
                        likes +=1;
                    }
                    $(self).attr("data-likes",likes);
                    $(self).html(`${likes} Likes`);
                })
                .fail(function(err){
                    console.log(err.responseText);
                })
            })
        }
    }
   
