$(document).ready(function () {
    console.log('Run Project');
    //=====================================================================================================
    //LOAD TREEVIEW ROOTS
    $.ajax({
        url: "RootsTreeView",
        type: 'POST',
        dataType: "json",
        success: function (root) {
            var $ul = $("<ul></ul>");
            $.each(root, function (i, ele) {
                $ul.append(
                    $("<li></li>").append(
                        "<span class='collapse collapsible' data-loaded='false' pid='" + ele.id + "'  style='display: inline;'>+   </span>"
                        + "<span idLocation='" + ele.id + "'  id='LocationName' style='cursor: pointer;'><i class='fa - solid fa - sitemap'></i>" + ele.name + "</span>"
                    )
                )
            });

            $('.treeview').append($ul);
        },

        error: function (err) {
            console.log('Không có dữ liệu!');
            console.log(err.responseText);
        }
    });

    //=====================================================================================================
    //LOAD TREEVIEW EXPAND
    $(document).on('click', '.collapsible', function (e) {
        e.preventDefault();

        var this1 = $(this);
        var data = {
            pid: $(this).attr('pid')
        };

        var isLoaded = $(this1).attr('data-loaded');

        if (isLoaded == "false") {
            $(this1).addClass('loadingP');
            $(this1).removeClass('collapse');

            $.ajax({
                url: "GetTreeView",
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    $(this1).removeClass('loadingP');

                    if (data.length > 0) {
                        var $ul = $("<ul></ul>");
                        $.each(data, function (index, value) {
                            $ul.append(
                                $("<li></li>").append(
                                    "<span class='collapse collapsible' data-loaded='false' pid='" + value.id + "' style='display: inline;'>+   </span>"
                                    + "<span idLocation='" + value.id + "' id='LocationName' style='cursor: pointer;'><i class='fa - solid fa - sitemap''></i>  " + value.name + "</span>"
                                )
                            )
                        });

                        $(this1).parent().append($ul);
                        $(this1).addClass('collapse');
                        $(this1).toggleClass('collapse expand');
                        $(this1).closest('li').children('ul').slideDown();
                    }
                    else {
                        $(this1).css({ 'display': 'inline-block', 'width': '15px' });
                    }

                    $(this1).attr('data-loaded', true);
                },

                error: function () {
                    alert('Không có dữ liệu!');
                }
            });
        }
        else {
            $(this1).toggleClass("collapse expand");
            $(this1).closest('li').children('ul').slideToggle();
        }
    });


    //=====================================================================================================
    //LOAD DATATABLES
    $(document).on('click', '#LocationName', function loadDataTables(e) {
        e.preventDefault();
        $('.contentBlock__content').html('');

        var html = '';
        html +=
            "<table id='table' class='display'>"
            + "<thead>"
            + "<tr>"
            //+ "<th class='checkbox'>"
            //+ "<input type='checkbox' name='' id=''>"
            //+ "</th>"
            + "<th class='stt'>STT</th>"
            + "<th class='owner''>Loại phòng</th>"
            + "<th class='price''>Giá</th>"
            + "<th class='description'>Mô tả</th>"
            + "<th class='status'>Trạng thái</th>"
            + "<th class='action'>Thao tác</th>"
            + "</tr>"
            + "</thead>"
            + "<tbody>"

            + "</tbody>"
            + "</table>";
        $('.contentBlock__content').append(html);

        var requestID = {
            locationId: $(this).attr('idLocation')
        };
        console.log(requestID)


        $("#table").dataTable({
            processing: true,
            serverSide: false,
            filter: true,
            orderMulti: true,
            language: {
                info: "",
                emptyTable: "Không có dữ liệu!",
                paginate: {
                    previous: "Trang trước",
                    next: "Trang sau",
                    first: "Trang đầu",
                    last: "Trang cuối",
                    search: "Tìm kiếm:"
                },
            },

            ajax: {
                url: "getDataTables",
                type: "POST",
                data: requestID,
                datatype: "json"
            },

            columns: [
                {
                    data: null, render: function (data, type, row, meta) {
                        return meta.row + 1;
                    }
                },
                {
                    data: null, render: function (data, type, row, meta) {
                        return "<span data-toggle='modal' TypeId='" + data.OwnerId + "' class='dataRow'>" + data.HouseType + "</span>";
                    }
                },

                {
                    data: null, render: function (data, type, row, meta) {
                        return "<span data-toggle='modal' price='" + data.Price + "' class='dataRow'>" + data.Price + "</span>";
                    }

                },
                {
                    data: null, render: function (data, type, row, meta) {
                        return "<span data-toggle='modal' des='" + data.Desciption + "' class='dataRow'>" + data.Desciption + "</span>";
                    }

                },
                {
                    data: null, render: function (data, type, row, meta) {
                        return "<span data-toggle='modal' status='" + data.HouseStatusId + "' class='dataRow'>" + data.HouseStatus + "</span>";
                    }

                },
                {
                    data: null, render: function (data, type, row, meta) {
                        return "<a href='' id='btnEdit' idHouse='" + data.Id + "' style='margin: 10px;cursor: pointer;'><i class='fa-solid fa-pen-to-square'></i></a>"
                            + "<a href='' id='btnDelete' idHouse='" + data.Id + "' ten='" + data.HoTen + "' style='margin: 10px;cursor: pointer;'><i class='fa-solid fa-trash'></i></a>"
                            + "<a href='' id='btnDetail' idHouse='" + data.Id + "'  style='margin: 10px;cursor: pointer;'><i class='fa-solid fa-ellipsis'></i></a>";
                    }
                },

            ]
        });
    });
});