jQuery((function(){class t{constructor(t){this.post=t,this.removePost()}removePost(){let t=$(".post-delete",this.post);$(t[0]).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(this).attr("href")}).done((function(t){console.log($(`#li-${t.data._id}`)),$(`#li-${t.data._id}`).remove(),e(t.message)})).fail((function(t){console.log(t.responseText)}))}))}}let e=function(t){new Noty({type:`${Object.keys(t)[0]}`,layout:"topRight",text:`${t.success}`,theme:"relax",timeout:1500}).show()},n=function(t){return $(`\n            <li id="li-${t._id}">\n                <a class="post-delete"  data-postid="${t._id}>" href="/post/remove/${t._id}">X</a>\n                ${t.content} <br>\n                ${t.user.name}\n                <br>\n                <a class="like-btn" href="/like/toggle/?id=${t._id}&type=post" data-likes="${t.likes.length}" >${t.likes.length} Likes</a>\n            \n            <div class="post-comments">\n                <form action="/comments/create" method="post">\n                    <input type="text" name="content" placeholder="write comments">\n                    <input type="hidden" name="post" value="${t._id}">\n                    <button type="submit">Submit</button>\n                </form>\n            <div class="comments-box">\n                <ul id="ul-comments-${t._id}" ></ul>\n            </div>\n            </div>\n            </li>`)};$("#ol-posts>li").each((function(e,n){new t(n);let o=$(n).attr("id").split("-")[1];new postComment(o)})),$(".like-btn").each((function(t,e){new Likes($(e))})),function(){let o=$("#post-form");o.submit((function(s){s.preventDefault(),$.ajax({type:"POST",url:"/post/create",data:o.serialize()}).done((function(o){$("#post-form textarea").val(""),e(o.message);let s=$("#ol-posts"),i=n(o.data.post);s.prepend(i),new t(i);let l=$(`#li-${o.data.post._id}>.like-btn`);console.log(l),new Likes(l)})).fail((function(t){console.log(t.responseText)}))}))}()}));