class postComment{
    constructor(postId){
        this.postId = postId;
        this.createComment(postId);
        let self = this;
        $(`#ul-comments-${postId}>li`).each(function(idx,comment){
            self.removeComment(comment);
        })
    }

    createComment(postId){
        let pself = this;
        let commentForm = $(`#commentform-${postId}`);
        $(commentForm).submit(function(e){
            e.preventDefault();
            $.ajax({
                type:"post",
                url:"/comments/create",
                data:$(e.target).serialize(),
            })
            .done(function(data){
                let dom = pself.commentDom(data.data);
                let ul = $(`#ul-comments-${pself.postId}`);
                ul.append(dom);
                let newComment = $(`#li-${data.data._id}`);
                pself.removeComment(newComment);
                pself.notification(data.message);
                let commentLike = $(`#li-${data.data._id}>.like-btn`);
                new Likes(commentLike);
                $(e.target.content).val("");
            })
            .fail(function(err){
                console.log(err.responseText);
            })
        })
    }
    commentDom(comment){
        return`
        <li id="li-${comment._id}">
            <a href="/comments/remove/${comment._id}" class="comment-destroy">X</a>
            ${comment.content} <br>    
            ${comment.user.name}
            <br>
            <a class="like-btn" href="/like/toggle/?id=${comment._id}&type=Comments" data-likes="${comment.likes.length}">${comment.likes.length} Likes</a>
            </li>
            <br>
        `
    }

    notification(msg){
        new Noty({
            type: `${Object.keys(msg)[0]}`,
            layout: 'topRight',
            text: `${msg.success}`,
            theme:"relax",
            timeout:1500
        }).show();
    }

    removeComment(comment){
        let pself = this;
        $(".comment-destroy",comment).click(function(e){
            e.preventDefault();
            const url = $(this).attr("href");
            $.ajax({
                type:'get',
                url:url,
            })
            .done(function(data){
                $(comment).remove();
                pself.notification(data.message);
            })
        })
    }
}