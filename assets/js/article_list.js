$(function () {
    var layer = layui.layer;
    var lists = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }
    exported();
    template.defaults.imports.dataForm = function (date) {
        var dates = new Date(date);
        var y = dates.getFullYear()
        var m = dates.getMonth()
        var d = dates.getDate();
        var h = dates.getHours();
        var min = dates.getMinutes();
        var s = dates.getSeconds();
        return `${y}-${m}-${d}  ${h}-${min}-${s}`
    };

    function exported() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: lists,

            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);

                var htmls = template("list", res);

                $("tbody").html(htmls);

                layui.laypage.render({
                    elem: 'pag' //注意，这里的 test1 是 ID，不用加 # 号
                        ,
                    count: res.total,
                    limit: lists.pagesize,
                    curr: lists.pagenum,
                    limits: [2, 3, 5, 10],
                    layout: ['count',
                        'limit'
                        , 'prev', 'page', 'next', 'skip'],
                    jump: function (obj, first) {
                        //obj包含了当前分页的所有参数，比如：
                        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        // console.log(obj.limit); //得到每页显示的条数
                        lists.pagenum = obj.curr;
                        lists.pagesize = obj.limit;
                        //首次不执行
                        if (!first) {
                            //do something
                            exported()
                        }
                        }
                       
                     //数据总数，从服务端得到
                });


            }
        });


    }
    classity()
    function classity() {

        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                };
                var html = template("classity", res);
                $("[name=cate_id]").html(html);
                layui.form.render();
            }
        });

    }

    $("body").on("submit", "#dress", function (e) {
        e.preventDefault();
        console.log(1);
        var fds = new FormData(this);
        lists.cate_id = fds.get("cate_id");
        lists.state = fds.get("state");

        nums();
    })

    function nums() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: lists,
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message);
                var htmls = template("list", res);
                $("tbody").html(htmls);
            }
        });

    }

    $("body").on("click", '.removes',function () { 
        var id = $(this).data("id");
        $.ajax({
            type: "get",
            url: "/my/article/delete/" + id,
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message);
                layui.layer.msg(res.message);
                exported();
            }
        });
     })
    $("body").on("click", '.edits', function () {
        var id = $(this).data("id");
        console.log(window.parent.document.querySelector("iframe").src = 'articlelist/art.html'+'?'+id);
       


     })
})