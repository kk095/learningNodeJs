jQuery(function($){
    let removeLink = $(".post-delete");

    removeLink.click(function(e){
        postRemove(e);
    })

    let notification=function(msg){
        console.log(Object.keys(msg)[0]);
        new Noty({
            type: `${Object.keys(msg)[0]}`,
            layout: 'topRight',
            text: `${msg.success}`,
            theme:"relax",
            timeout:1500
        }).show();
    }

    let postCreate = function(){
        let newForm = $("#post-form");
        newForm.submit(function(e){
            console.log(newForm.serialize())
            e.preventDefault();
            $.ajax({
                type:'POST',
                url:'/post/create',
                data: newForm.serialize(),
                success:function(data){
                    $("#post-form textarea").val("");
                    console.log(data);
                    notification(data.message);
                    let postList = $("#ol-posts");
                    let newList =  newPostDom(data.data.post);
                    console.log("new post detail :",data.data);
                    postList.prepend(newList);
                    $(" .post-delete",newList).click(function(e){
                        postRemove(e);
                    })
                },
                error:function(error){
                   
                }
            })
            
        })
    }
    postCreate();

    let newPostDom = function(post){
        let newDom = $(`
            <li id="li-${post._id}">
                <a class="post-delete"  data-postid="${post._id}>" href="/post/remove/${post._id}">X</a>
                ${post.content} <br>
                ${post.user.name}
            
            <div class="post-comments">
                <form action="/comments/create" method="post">
                    <input type="text" name="content" placeholder="write comments">
                    <input type="hidden" name="post" value="${post._id}">
                    <button type="submit">Submit</button>
                </form>
            <div class="comments-box">
                <p> </p>
            </div>
            </div>
            </li>`
        )
        return newDom;
    }

    let postRemove = function(e){
        e.preventDefault();
        postId = $(e.target).data("postid");
        $.ajax({
            type:'get',
            url: `${$(e.target).prop("href")}`,
            success:function(data){
                console.log(data);
                lstRemove(data.data._id);
                notification(data.message);
            },
            error:function(err){
                console.log(err.responseText);
            }
        })   
    }

    let commentPost = function(){
        let commentForm = $(".comment-form");
            commentForm.submit(function(e){
                e.preventDefault();
                console.log(e.target.content);
                $.ajax({
                    type:"post",
                    url:"/comments/create",
                    data:$(e.target).serialize(),
                    success:function(data){
                        console.log(data);
                        commentDom(data.data);
                        notification(data.message);
                        // $(e.target.content).val("");
                    },
                    error:function(err){
                        console.log(err.responseText);
                        commentPost();
                    }
                })
            })

    }
    commentPost();

    let commentDom = function(data){
        let ul = $(`#li-${data.post} .comments-box ul`);
        console.log(ul);
        const newComment = `
                            <li id="li-${data._id}">
                                <a href="/comments/remove/${data._id}" class="comment-destroy">X</a>
                                ${data.content} <br>    
                               ${data.user.name}
                            </li>
                            <br>
        `

        ul.append(newComment)
    }

    let commentDelete = function(){
        $(".comment-destroy").click(function(e){
            e.preventDefault();
            const url = $(this).attr("href");
            console.log(url);
            $.ajax({
                type:'get',
                url:url,
                success:function(data){
                    console.log(data);
                    lstRemove(data.data._id);
                    notification(data.message);
                }
            })
        })
    }
    commentDelete();

    let lstRemove = function(id){
        console.log(id);
       let lst =  $(`#li-${id}`);
       console.log(lst);
       lst.remove();
    }
    

})