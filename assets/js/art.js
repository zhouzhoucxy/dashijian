$(function () {
    console.log(1);
    var id = location.search.slice(1);
    /* $("body").on("click", ".layui-unselect", function (e) {
        e.stopPropagation();
        console.log(222);
        $(this).attr("name", "cate_id")
    }); */
    $(".layui-unselect").click();
    $.ajax({
        type: "get",
        url: "/my/article/" + id,
        success: function (res) {
            
            
            layui.form.val("publish", res.data);
           
        }
    });

})