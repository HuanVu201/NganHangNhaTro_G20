$(document).ready(function () {

    var locationIdCurrent = "01"; //default
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
                        "<span class='collapse collapsible' data-loaded='false' pid='" + ele.id + "'  style='display: inline;'>(+)   </span>"
                        + "<span idLocation='" + ele.id + "'  id='LocationName' style='cursor: pointer;'>" + ele.name + "</span>"
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
                                    "<span class='collapse collapsible' data-loaded='false' pid='" + value.id + "' style='display: inline;'>(+)   </span>"
                                    + "<span idLocation='" + value.id + "' id='LocationName' style='cursor: pointer;'> " + value.name + "</span>"
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

        locationIdCurrent = $(this).attr('idLocation');
        var requestID = {
            locationId: locationIdCurrent
        };



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
                        return "<a href='' id='btnDetail' idHouse='" + data.Id + "'  style='margin: 10px;cursor: pointer;'><i class='fas fa-info-circle'></i></a>"
                            + "<a href='' id='btnEdit' idHouse='" + data.Id + "' style='margin: 10px;cursor: pointer;'><i class='fas fa-edit'></i></a>"
                            + "<a href='' id='btnDelete' idHouse='" + data.Id + "' style='margin: 10px;cursor: pointer;'><i class='fas fa-trash'></i></a>";
                    }
                },

            ]
        });
    });



    //=====================================================================================================
    //MODAL CREAT
    $(document).on('click', '.btnThemMoi', function (e) {
        e.preventDefault();
        $('#myModalCRUD').modal('show');

        $('.modal-title').html('Thêm mới nhà trọ');
        $('.modal-footer').html(
            "<button type='button' class='btn btn-primary' id='btnAdd'>Thêm mới</button>"
            + "<button type = 'button' class='btn btn-default' data-dismiss='modal' > Đóng</button >"
        )

        $('#HouseTitle').val("");
        $('#OfLocationId').val(locationIdCurrent);
        $('#Address').val("");
        $('#Acreage').val("");
        $('#Price').val("");
        $('#Desciption').val("");
        $('#HouseType').val("");
        $('#HouseStatus').val("");
        $('#OwnerName').val("");
        $('#OwnerPhone').val("");
        $('#ImageCategory').val("");

        $('#HouseTitle').attr("readonly", false);
        $('#OfLocationId').attr("readonly", true);
        $('#Address').attr("readonly", false);
        $('#Acreage').attr("readonly", false);
        $('#Price').attr("readonly", false);
        $('#Desciption').attr("readonly", false);
        $('#HouseType option:not(:selected)').attr("disabled", false);
        $('#HouseStatus option:not(:selected)').attr("disabled", false);
        $('#OwnerName').attr("readonly", false);
        $('#OwnerPhone').attr("readonly", false);
        $('#ImageCategory').attr("readonly", false);

        var newGuid = uuidv4();

        $(document).on('click', '#btnAdd', function (e) {
            var check = formValidate();
            if (check == false) {
                alert("Vui lòng nhập/chọn đủ các trường thông tin!")
                return false;
            }

            var houseObject = {
                id: newGuid,
                houseTitle: $('#HouseTitle').val(),
                ofLocationId: $('#OfLocationId').val(),
                address: $('#Address').val(),
                acreage: $('#Acreage').val(),
                price: $('#Price').val(),
                desciption: $('#Desciption').val(),
                houseType: $('#HouseType').val(),
                houseStatus: $('#HouseStatus').val(),
                ownerName: $('#OwnerName').val(),
                ownerPhone: $('#OwnerPhone').val(),

            };

            var imageCategoryObject = {

                url: $('#ImageCategory').val(),
                houseId: newGuid
            }

            $.ajax({
                url: '/Admin/ThemMoi',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    HouseObject: houseObject,
                    ImageCategoryObject: imageCategoryObject
                }),

                success: function (data) {
                    if (data != 1) {
                        console.log(data.description);
                        alert("Thêm mới thất bại!");
                        return;
                    }

                    $('#myModalCRUD').modal('hide');
                    alert('Thêm mới thành công!');
                },
                error: function (xhr, status, error) {
                    console.error("Lỗi khi thêm mới: " + error);
                    alert("Thêm mới thất bại!");
                }
            });
        });
    });



    $(document).on('click', '.btnThemMoi', function (e) {
        e.preventDefault();
        $('#myModalBookingCalender').modal('show');

        $('.modal-title').html('Đặt lịch xem phòng');
        $('.modal-footer').html(
            "<button type='button' class='btn btn-primary' id='btnAdd'>Book lịch ngay</button>"
            + "<button type = 'button' class='btn btn-default' data-dismiss='modal' > Đóng</button >"
        )

        $('#HouseTitle').val("");

        $('#HouseTitle').attr("readonly", false);

    });




    //=====================================================================================================
    //Generate GUID  
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    //=====================================================================================================
    //Valdidation  
    function formValidate() {
        var isValid = true;
        if ($('#HouseTitle').val().trim() == "") {
            $('#HouseTitle').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#HouseTitle').css('border-color', 'lightgrey');
        }

        if ($('#OfLocationId').val().trim() == "") {
            $('#OfLocationId').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#OfLocationId').css('border-color', 'lightgrey');
        }

        if ($('#Address').val().trim() == "") {
            $('#Address').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Address').css('border-color', 'lightgrey');
        }
        if ($('#Acreage').val().trim() == "") {
            $('#Acreage').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Acreage').css('border-color', 'lightgrey');
        }

        if ($('#Price').val().trim() == "") {
            $('#Price').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Price').css('border-color', 'lightgrey');
        }
        if ($('#Desciption').val().trim() == "") {
            $('#Desciption').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Desciption').css('border-color', 'lightgrey');
        }

        if ($('#HouseType').val() === null) {
            $('#HouseType').css('border-color', 'Red');
            isValid = false;
        } else {
            $('#HouseType').css('border-color', 'lightgrey');
        }
        if ($('#HouseStatus').val() === null) {
            $('#HouseStatus').css('border-color', 'Red');
            isValid = false;
        } else {
            $('#HouseStatus').css('border-color', 'lightgrey');
        }
        if ($('#OwnerName').val().trim() == "") {
            $('#OwnerName').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#OwnerName').css('border-color', 'lightgrey');
        }
        if ($('#OwnerPhone').val().trim() == "") {
            $('#OwnerPhone').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#OwnerPhone').css('border-color', 'lightgrey');
        }
        if ($('#ImageCategory').val().trim() == "") {
            $('#ImageCategory').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#ImageCategory').css('border-color', 'lightgrey');
        }
        return isValid;
    }
});