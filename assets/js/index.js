$(function () {

    var layer = layui.layer;
    
    $("#remove").on("click", function () {
       layer.confirm('确定要退出?', {
           icon: 3,
           title: '提示'
       }, function (index) {
           //do something
               localStorage.removeItem("token");
               location.href = "login.html"
           layer.close(index);
       });
      })
     
    
    arr = function get() { 

    $.ajax({
        type: "get",
        url: "/my/userinfo",
        /* headers: {
            Authorization: localStorage.getItem("token")
        }, */
        success: function (res) {
            if (res.status !== 0) return console.log(res.message);
           
            var name = res.data.nickname || res.data.username;
            $(".userd").html("欢迎&nbsp;" + name);
            if (res.data.user_pic == null) {
                $(".use").show().html(name[0].toUpperCase());
                $(".layui-nav-img").hide()
            } else {
                $(".use").hide()
                $(".layui-nav-img").prop("src", res.data.user_pic).show()
            }
        }
    });
        

 }
arr();

})