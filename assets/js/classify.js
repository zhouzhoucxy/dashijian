$(function () {
    var layer = layui.layer;
    var form = layui.form;
    addexports()
    //渲染页面
    function addexports() {

        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message);
                var htmls = template('extends', res);
                $("tbody").html(htmls)
            }
        });

    }
    //点击添加按钮显示弹框
    var index;
    $("#obtns").on("click", function (e) {
        index = layui.layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '300px'],
            content: $('#add').html() //这里content是一个普通的String
        });
    })
    //添加按钮模板
    $("body").on("submit", "#addform", function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layui.layer.msg(res.message);

                layui.layer.msg(res.message);
                addexports();
                layui.layer.close(index);
            }
        });
    });

    //点击编辑按钮把内容填充到弹框中
    var editindex;
    $("body").on("click", '.edit', function (e) {
        var id = $(this).data("id");
        editindex = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '300px'],
            content: $("#formedit").html(),
        });
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {

                if (res.status !== 0) return layui.layer.msg(res.message);

                form.val("editform", res.data)
            }
        });
    })


    //修改按钮模板
    $("body").on("submit", "#editform", function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);

                layer.msg(res.message);
                layer.close(editindex);
                addexports();
            }
        });
    })


    //删除按钮模板
    var removes;
    $("body").on("click", "#remove", function (e) {
        e.stopPropagation();
        
        console.log(1);
        var id = $(this).siblings().data("id");
      removes =  layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
             
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg(res.message);
                    layer.msg('删除成功');
                    addexports();
                    layer.close(removes);
                }
            });
            
            
              
        });
       
      })
})