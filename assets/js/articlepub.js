$(function () {
    initEditor()
    pub()

    function pub() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {

                if (res.status !== 0) return layui.layer.msg(res.message);

                var htmler = template("publisher", res)
                $("[name=cate_id]").html(htmler)
                layui.form.render();
            }
        });
    }

    $("#obtnd").on("click", function () {
        $("#filed").click()
    });

    $("#filed").on("change", function () {
        var fileforms = $(this)[0].files;
        if (fileforms === 0) return;
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(fileforms[0])
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    });

    var state = '已发布';
    $("#backup").on("click", function () {
        state = '草稿';
      })

    $("#publish").on("submit", function (e) {
        e.preventDefault();
        var fd = new FormData(this);
        fd.append("state", state);
         // 4. 将封面裁剪过后的图片，输出为一个文件对象
         $image
             .cropper('getCroppedCanvas', {
                 // 创建一个 Canvas 画布
                 width: 400,
                 height: 280
             })
             .toBlob(function (blob) {
                 // 将 Canvas 画布上的内容，转化为文件对象
                 // 得到文件对象后，进行后续的操作
                 // 5. 将文件对象，存储到 fd 中
                 fd.append('cover_img', blob)
                 // 6. 发起 ajax 数据请求
                 fd.forEach(function (v, k) {
                     console.log(k,v);
                   })
                 addArt(fd)
             })
      
             function addArt(fd) {
                 $.ajax({
                     type: "post",
                     url: "/my/article/add",
                     data: fd,
                     contentType: false,
                     processData: false,
                     success: function (res) {
                         console.log(res);
                         if (res.status !== 0) return layui.layer.msg(res.messgae);

                         layui.layer.msg('发布成功');

                     }
                 });
        };
        
    });

   

})