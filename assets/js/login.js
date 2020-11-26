$(function () {
    $("#user").click(function () {
        $(".logon").show();
        $(".login").hide();
    })
    $("#logon").click(function () {
        $(".login").show();
        $(".logon").hide();
    })

    //表单验证 
    var form = layui.form;
    var layer = layui.layer;
   

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repassword: function (value) {
            if (value !== $("input[name=password]").val()) {
                return '两次密码不一致';
            }
        }
    })

    $(".logon").on("submit", function (e) {
        e.preventDefault();
        var username = $(".logon [name=username]").val();
        var password = $(".logon [name=password]").val();
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: {
                username,
                password
            },
           
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                } else {
                    layer.msg(res.message)
                    $("#logon").click()
                }
            }
        });

    })

    $("#logins").on("submit", function (e) {
        e.preventDefault();
        var forms = $(this).serialize();
       
      $.ajax({
            type: "post",
            url: "/api/login",
            data:forms,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                location.href = 'index.html';
              }
        }) 

      })


})