$(function () {
    var form = layui.form;
    var layer = layui.layer;

   
    form.verify({
        nickname: [/^\w{1,6}$/, '昵称长度在1-6之间']
    });
exports()
    function exports() {

         $.ajax({
             type: "get",
             url: "/my/userinfo",
             success: function (res) {
                 if (res.status !== 0) {
                     return layer.msg(res.message)
                 }
                 form.val('userinfo', res.data)


             }
         });

      }
   

    $("#reset").on("click", function (e) { 
        e.preventDefault();
        exports();
     })

    $('#formuser').on("submit", function (e) {
         
        e.preventDefault();
        data = $(this).serialize();
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data,
            success: function (response) {
                if (response.status !== 0) return layer.msg(response.message);
               
               window.parent.arr();
            }
        });
        
       })
       

  })