$(function () {
    console.log(1);
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        psw: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        old: function (val) {
            if (val == $("[name=oldPwd]").val()) {
                return '新旧密码不能相同';
            }
        },
        new: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return '新密码不一致'
            }
        }
    });
    //修改密码模板
    $("#formpsw").on("submit", function (e) {
        e.preventDefault();
        var data = $(this).serialize()
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
               layer.msg("密码更新成功")
            }
        });
      })

})