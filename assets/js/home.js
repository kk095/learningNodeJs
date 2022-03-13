jQuery(function(){
    class PostOperations{
        constructor(post){
            this.post = post;
            this.removePost();
        }
        removePost(){
            let removeBtn = $(".post-delete",this.post);
            $(removeBtn[0]).click(function(e){
                e.preventDefault();
                $.ajax({
                    type:'get',
                    url: $(this).attr("href"),
                })
                .done(function(data){
                    console.log($(`#li-${data.data._id}`));
                    $(`#li-${data.data._id}`).remove()
                    notification(data.message);

                }) 
                .fail(function(err){
                    console.log(err.responseText);
                })
            })
        }
    }


    let postCreate = function(){
        let newForm = $("#post-form");
        newForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'POST',
                url:'/post/create',
                data: newForm.serialize(),
            })
            .done(function(data){
                $("#post-form textarea").val("");
                notification(data.message);
                let postList = $("#ol-posts");
                let newList =  newPostDom(data.data.post);
                postList.prepend(newList);
                new PostOperations(newList);
                let postLike = $(`#li-${data.data.post._id}>.like-btn`);
                console.log(postLike);
                new Likes(postLike);
            })
            .fail(function(err){
                console.log(err.responseText);
            })
        })
    }

    let notification=function(msg){
        new Noty({
            type: `${Object.keys(msg)[0]}`,
            layout: 'topRight',
            text: `${msg.success}`,
            theme:"relax",
            timeout:1500
        }).show();
    }
    
    // to create new list for new post
    let newPostDom = function(post){
        let newDom = $(`
            <li id="li-${post._id}">
                <a class="post-delete"  data-postid="${post._id}>" href="/post/remove/${post._id}">X</a>
                ${post.content} <br>
                ${post.user.name}
                <br>
                <a class="like-btn" href="/like/toggle/?id=${post._id}&type=post" data-likes="${post.likes.length}" >${post.likes.length} Likes</a>
            
            <div class="post-comments">
                <form action="/comments/create" method="post">
                    <input type="text" name="content" placeholder="write comments">
                    <input type="hidden" name="post" value="${post._id}">
                    <button type="submit">Submit</button>
                </form>
            <div class="comments-box">
                <ul id="ul-comments-${post._id}" ></ul>
            </div>
            </div>
            </li>`
        )
        return newDom;
    }



   

    let commentDelete = function(){
       
    }
    commentDelete();

   


// loop over all the exiting posts
let home = function(){
    let posts = $("#ol-posts>li");
    posts.each(function(idx,post){
        new PostOperations(post);
        let postId = $(post).attr("id").split("-")[1];
            new postComment(postId);
            
            
    });

    $(".like-btn").each(function(idx,ele){
        new Likes($(ele));
    });
}
home();
postCreate(); 
});