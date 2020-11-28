$(function () {

    $("#obtn").on("click", function () {
        $("#files").click();

    });

    $("#files").on("change", function (e) {
        if (e.target.files.length <= 0) return;
        var files = e.target.files[0];
        var newurl = URL.createObjectURL(files);
        console.log(newurl);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newurl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
       
    })

    $("#btns").on("click", function () {
        console.log(2);
         var dataURL = $image
             .cropper('getCroppedCanvas', {
                 // 创建一个 Canvas 画布
                 width: 100,
                 height: 100
             }).toDataURL('image/png');
         $.ajax({
             type: "post",
             url: "/my/update/avatar",
             data: {
                 avatar: dataURL
             },
             success: function (res) {
                 if (res.status !== 0) return layui.layer.msg(res.message);
                 layui.layer.msg(res.message);
                 window.parent.arr();
             }
         });
      })


})