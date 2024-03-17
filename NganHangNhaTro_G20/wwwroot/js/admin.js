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

    //=====================================================================================================
    //MODAL CREAT
    $(document).on('click', '.btnThemMoi', function (e) {
        e.preventDefault();
        $('#myModalCRUD').modal('show');

        console.log('opne')

        $('.modal-title').html('Thêm mới cán bộ');
        $('.modal-footer').html(
            "<button type='button' class='btn btn-primary' id='btnAdd'>Thêm mới</button>"
            + "<button type = 'button' class='btn btn-default' data-dismiss='modal' > Đóng</button >"
        )

        //$('#maTaiKhoan').val("");
        //$('#ten').val("");
        //$('#ngaySinh').val("");
        //$('#gioiTinh').val("");
        //$('#soDienThoai').val("");
        //$('#email').val("");
        //$('#chucVu').val("");
        //$('#maCoQuan').val("");

        //$("#maTaiKhoan").attr("readonly", false);
        //$("#ten").attr("readonly", false);
        //$("#ngaySinh").attr("readonly", false);
        //$('#gioiTinh option:not(:selected)').attr("disabled", false);
        //$("#soDienThoai").attr("readonly", false);
        //$("#email").attr("readonly", false);
        //$("#chucVu").attr("readonly", false);
        //$("#maCoQuan").attr("readonly", false);

        //const urlThemMoi = "https://localhost:7088/CanBo/ThemMoi";

        //$(document).on('click', '#btnAdd', function (e) {

        //    var check = formValidate();
        //    if (check == false) {
        //        return false;
        //    }

        //    var canBoObject = {
        //        maTaiKhoan: $('#maTaiKhoan').val(),
        //        hoTen: $('#ten').val(),
        //        ngaySinh: $('#ngaySinh').val(),
        //        gioiTinh: $('#gioiTinh').val(),
        //        sdt: $('#soDienThoai').val(),
        //        email: $('#email').val(),
        //        chucVu: $('#chucVu').val(),
        //        idCoQuan: $('#maCoQuan').val()
        //    };

        //    const callAPICreat = async () => {
        //        try {
        //            const response = await fetch(urlThemMoi, {
        //                method: "POST",
        //                headers: {
        //                    "content-type": "application/json",
        //                },
        //                body: JSON.stringify(canBoObject),
        //            });
        //            const data = await response.text();

        //            if (data != 1) {
        //                console.log(data.description);
        //                alert("Thêm mới thất bại!");
        //                return;
        //            }

        //            $('#myModalCRUD').modal('hide');
        //            console.log('Thêm mới thành công!');
        //        } catch (error) {
        //            console.log("Thêm mới thất bại!" + error);
        //            alert("Thêm mới thất bại!");

        //        }
        //    }

        //    callAPICreat();
        //});
    });



    //=====================================================================================================
    //MODAL EDIT
    $(document).on('click', '#btnEdit', function (e) {

        e.preventDefault();

        var requestID = $(this).attr('maTaiKhoan');

        const urlChiTiet = "https://localhost:7088/CanBo/ChiTiet?maTaiKhoan=" + requestID;
        const urlCapNhat = "https://localhost:7088/CanBo/CapNhat?maTaiKhoan=" + requestID;


        const callAPIDetail = async () => {
            try {
                const response = await fetch(urlChiTiet);
                const data = await response.json();
                if (!response.ok) {
                    console.log("Lấy thông tin chi tiết thất bại!")
                    return;
                }

                $('#myModalCRUD').modal('show');
                $('.modal-title').html('Cập nhật thông tin cán bộ');
                $('.modal-footer').html(
                    "<button type='button' class='btn btn-primary' id='btnUpdate'>Cập nhật</button>"
                    + "<button type = 'button' class='btn btn-default' data-dismiss='modal'>Đóng</button >"
                );

                $.each(data, function (index, value) {
                    var ngaySinh = new Date(value.ngaySinh).toLocaleDateString('en-GB').split('')[0];

                    $('#maTaiKhoan').val(value.maTaiKhoan);
                    $('#ten').val(value.hoTen);
                    $('#ngaySinh').val(ngaySinh);
                    $('#gioiTinh').val(value.gioiTinh);
                    $('#soDienThoai').val(value.sdt);
                    $('#email').val(value.email);
                    $('#chucVu').val(value.chucVu);
                    $('#maCoQuan').val(value.idCoQuan);

                    $("#maTaiKhoan").attr("readonly", true);
                    $("#ten").attr("readonly", false);
                    $("#ngaySinh").attr("readonly", false);
                    $('#gioiTinh option:not(:selected)').attr("disabled", false);
                    $("#soDienThoai").attr("readonly", false);
                    $("#email").attr("readonly", false);
                    $("#chucVu").attr("readonly", false);
                    $("#maCoQuan").attr("readonly", false);
                });
            }
            catch (error) {
                console.log("Error detail: " + error);
            }
        }
        callAPIDetail();



        $(document).on('click', '#btnUpdate', function (e) {
            var check = formValidate();
            if (check == false) {
                return false;
            }

            var canBoObject = {
                maTaiKhoan: $('#maTaiKhoan').val(),
                hoTen: $('#ten').val(),
                ngaySinh: $('#ngaySinh').val(),
                gioiTinh: $('#gioiTinh').val(),
                sdt: $('#soDienThoai').val(),
                email: $('#email').val(),
                chucVu: $('#chucVu').val(),
                idCoQuan: $('#maCoQuan').val()
            };

            const callAPIUpdate = async () => {
                try {
                    const response = await fetch(urlCapNhat, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(canBoObject),
                    });
                    const data = await response.text();

                    if (data != 1) {
                        console.log(data.description)
                        alert("Cập nhật thất bại!");
                        return;
                    }

                    $('#myModalCRUD').modal('hide');
                    console.log('Cập nhật thành công!');
                } catch (error) {
                    console.log("Cập nhật thất bại!" + error);
                    alert("Cập nhật thất bại!");
                }
            }
            callAPIUpdate();


        });
    });

    //=====================================================================================================
    //MODAL DETAIL
    $(document).on('click', '#btnDetail', function (e) {
        e.preventDefault();

        var requestID = $(this).attr('maTaiKhoan');

        const url = "https://localhost:7088/CanBo/ChiTiet?maTaiKhoan=" + requestID;

        const callAPIDetail = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (!response.ok) {
                    console.log("Lấy thông tin chi tiết thất bại!")
                    return;
                }

                $('#myModalCRUD').modal('show');
                $('.modal-title').html('Thông tin cán bộ');
                $('.modal-footer').html(
                    "<button type = 'button' class='btn btn-default' data-dismiss='modal' > Đóng</button >"
                );

                $.each(data, function (index, value) {
                    var ngaySinh = new Date(value.ngaySinh).toLocaleDateString('en-GB').split('')[0];

                    $('#maTaiKhoan').val(value.maTaiKhoan);
                    $('#ten').val(value.hoTen);
                    $('#ngaySinh').val(ngaySinh);
                    $('#gioiTinh').val(value.gioiTinh);
                    $('#soDienThoai').val(value.sdt);
                    $('#email').val(value.email);
                    $('#chucVu').val(value.chucVu);
                    $('#maCoQuan').val(value.idCoQuan);

                    $("#maTaiKhoan").attr("readonly", true);
                    $("#ten").attr("readonly", true);
                    $("#ngaySinh").attr("readonly", true);
                    $('#gioiTinh option:not(:selected)').attr("disabled", true);
                    $("#soDienThoai").attr("readonly", true);
                    $("#email").attr("readonly", true);
                    $("#chucVu").attr("readonly", true);
                    $("#maCoQuan").attr("readonly", true);
                });
            }
            catch (error) {
                console.log("Error detail: " + error);
            }
        }
        callAPIDetail();


    });




    //=====================================================================================================
    //DELETE FUNCTION
    $(document).on('click', '#btnDelete', function (e) {
        e.preventDefault();
        var requestID = $(this).attr('maTaiKhoan');

        const url = "https://localhost:7088/CanBo/DeleteConfirmed?maTaiKhoan=" + requestID;


        var tenCanBo = $(this).attr('ten');
        var answer = confirm("Bạn có chắc muốn xóa cán bộ " + tenCanBo + " không?");
        if (answer) {
            const callAPIDelete = async () => {
                try {
                    const response = await fetch(url, { method: "POST" });
                    const data = await response.text();

                    if (data != 1) {
                        console.log(data.description)
                        alert("Xóa thất bại!");
                        return;
                    }

                    console.log('Xóa thành công!');
                } catch (error) {
                    console.log("Xóa thất bại!" + error);
                    alert("Xóa thất bại!");

                }
            }
            callAPIDelete();

        }
    });


    //=====================================================================================================
    //Valdidation  
    function formValidate() {
        var isValid = true;
        if ($('#maTaiKhoan').val().trim() == "") {
            $('#maTaiKhoan').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#maTaiKhoan').css('border-color', 'lightgrey');
        }

        if ($('#ten').val().trim() == "") {
            $('#ten').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#ten').css('border-color', 'lightgrey');
        }

        if ($('#ngaySinh').val().trim() == "") {
            $('#ngaySinh').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#ngaySinh').css('border-color', 'lightgrey');
        }
        if ($('#chucVu').val().trim() == "") {
            $('#chucVu').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#chucVu').css('border-color', 'lightgrey');
        }

        if ($('#maCoQuan').val().trim() == "") {
            $('#maCoQuan').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#maCoQuan').css('border-color', 'lightgrey');
        }
        return isValid;
    }

    $(document).on('click', '.datarow', function (e) {
        e.preventDefault();
        $('#myModalCRUD').modal('show');
    });

});










