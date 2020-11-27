$(function () {
    var form = layui.form;
    var layer = layui.layer;

   
    form.verify({
        nickname: [/^\d{1,6}$/, '昵称长度在1-6之间']
    });

    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
              return layer.msg(res.message)
          }
            form.val('userinfo',res.data)


        }
    });

  })