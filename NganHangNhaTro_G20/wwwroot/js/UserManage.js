$(document).ready(function () {

    //=====================================================================================================
    //LOAD DATATABLES

    $('.contentBlock__content2').html('');

    var html = '';
    html +=
        "<table id='table' class='display'>"
        + "<thead>"
        + "<tr>"
        + "<th class='stt'>STT</th>"
        + "<th class='owner''>Tên</th>"
        + "<th class='price''>Số điện thoại</th>"
        + "<th class='description'>Giới tính</th>"
        + "<th class='status'>Quyền</th>"
        + "<th class='action'>Thao tác</th>"
        + "</tr>"
        + "</thead>"
        + "<tbody>"

        + "</tbody>"
        + "</table>";
    $('.contentBlock__content2').append(html);

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
            url: "/User/GetListUser",
            type: "GET",
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
                    return "<span data-toggle='modal'  class='dataRow'>" + data.Name + "</span>";
                }
            },

            {
                data: null, render: function (data, type, row, meta) {
                    return "<span data-toggle='modal' class='dataRow'>" + data.PhoneNumber + "</span>";
                }

            },
            {
                data: null, render: function (data, type, row, meta) {
                    return "<span data-toggle='modal'  class='dataRow'>" + data.Gender + "</span>";
                }

            },
            {
                data: null, render: function (data, type, row, meta) {
                    return "<span data-toggle='modal'  class='dataRow'>" + data.RoleId + "</span>";
                }

            },
            {
                data: null, render: function (data, type, row, meta) {
                    return "<a href='' id='btnListBooking' idUser='" + data.Id + "' style='margin: 10px; cursor: pointer;'><i class='fas fa-clinic-medical'></i></a>"
                        + "<a href='' id='btnDetail' idUser='" + data.Id + "' style='margin: 10px; cursor: pointer;'><i class='fas fa-info-circle'></i></a>"
                        + "<a href='' id='btnEdit' idUser='" + data.Id + "' style='margin: 10px;cursor: pointer;'><i class='fas fa-edit'></i></a>"
                        + "<a href='' id='btnDelete' idUser='" + data.Id + "' userName='" + data.Name + "' style='margin: 10px;cursor: pointer;'><i class='fas fa-trash'></i></a>";
                }
            },

        ]
    });


    //=====================================================================================================
    //MODAL EDIT
    $(document).on('click', '#btnEdit', function (e) {

        e.preventDefault();

        var requestID = $(this).attr('idUser');


        const callAPIDetail = async () => {
            try {

                $.ajax({
                    url: '/User/ChiTiet',
                    type: 'GET',
                    data: { userId: requestID },
                    success: function (data) {
                        $('#myModalCRUD').modal('show');
                        $('.modal-title').html('Cập nhật thông tin người dùng');
                        $('.modal-footer').html(
                            "<button type='button' class='btn btn-primary' id='btnUpdate'>Cập nhật</button>"
                            + "<button type = 'button' class='btn btn-default' data-dismiss='modal'>Đóng</button >"
                        );

                        $('#Name').val(data[0].name);
                        $('#PhoneNumber').val(data[0].phoneNumber);
                        $('#Email').val(data[0].email);
                        $('#Password').val(data[0].password);
                        $('#Gender').val(data[0].gender);
                        $('#Role').val(data[0].roleId);

                        $('#Name').attr("readonly", true);
                        $('#PhoneNumber').attr("readonly", true);
                        $('#Email').attr("readonly", false);
                        $('#Password').attr("readonly", false);
                        $('#Gender').attr("disabled", false);
                        $('#Role').attr("disabled", false);
                    },
                    error: function (xhr, status, error) {
                        console.error("Lỗi khi lấy chi tiết: " + error);
                    }
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
                alert("Vui lòng điền đầy đủ thông tin!");
                return false;
            }

            var userObject = {
                id: requestID,
                name: $('#Name').val(),
                phoneNumber: $('#PhoneNumber').val(),
                email: $('#Email').val(),
                password: $('#Password').val(),
                gender: $('#Gender').val(),
                roleId: $('#Role').val()

            };

            $.ajax({
                url: '/User/CapNhat',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(userObject),

                success: function (data) {
                    if (data != 1) {
                        console.log(data.description);
                        alert("Cập nhật thất bại!");
                        return;
                    }

                    $('#myModalCRUD').modal('hide');
                    alert('Cập nhật thành công!');
                },
                error: function (xhr, status, error) {
                    console.error("Lỗi khi cập nhật: " + error);
                    alert("Cập nhật thất bại!");
                }
            });


        });
    });


    //=====================================================================================================
    //MODAL DETAIL
    $(document).on('click', '#btnDetail', function (e) {
        e.preventDefault();

        var requestID = $(this).attr('idUser');

        const callAPIDetail = async () => {
            try {

                $.ajax({
                    url: '/User/ChiTiet',
                    type: 'GET',
                    data: { userId: requestID },
                    success: function (data) {
                        $('#myModalCRUD').modal('show');
                        $('.modal-title').html('Thông tin người dùng');
                        $('.modal-footer').html("<button type = 'button' class='btn btn-default' data-dismiss='modal'>Đóng</button >");

                        $('#Name').val(data[0].name);
                        $('#PhoneNumber').val(data[0].phoneNumber);
                        $('#Email').val(data[0].email);
                        $('#Password').val(data[0].password);
                        $('#Gender').val(data[0].gender);
                        $('#Role').val(data[0].roleId);

                        $('#Name').attr("readonly", true);
                        $('#PhoneNumber').attr("readonly", true);
                        $('#Email').attr("readonly", true);
                        $('#Password').attr("readonly", true);
                        $('#Gender').attr("disabled", true);
                        $('#Role').attr("disabled", true);

                    },
                    error: function (xhr, status, error) {
                        console.error("Lỗi khi lấy chi tiết: " + error);
                    }
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
        var requestID = $(this).attr('idUser');

        const url = "/User/DeleteConfirmed?userId=" + requestID;


        var userName = $(this).attr('userName');
        var answer = confirm("Bạn có chắc muốn xóa người dùng " + userName + " không?");
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

                    alert(`Xóa thành công ${userName}!`);
                } catch (error) {
                    console.log("Xóa thất bại!" + error);
                    alert("Xóa thất bại!");

                }
            }
            callAPIDelete();

        }

    });


    //=====================================================================================================
    //MODAL DETAIL List Booking
    $(document).on('click', '#btnListBooking', function (e) {
        console.log('click');
        e.preventDefault();
        var requestID = {
            userId: $(this).attr('idUser')
        };

        $('#myModalListBooking').modal('show');
        $('.modal-title').html('Thông tin phòng chờ xem');
        $('.modal-footer').html("<button type = 'button' class='btn btn-default' data-dismiss='modal'>Đóng</button >");

        $('.bodyModalView').html('');
        var html = '';
        html +=
            "<table id='tableModal' class='display' style='width: 100%;' >"
            + "<thead>"
            + "<tr>"
            + "<th class='stt'>STT</th>"
            + "<th class='houseType'>Loại phòng</th>"
            + "<th class='price''>Giá</th>"
            + "<th class='customerName'>Khu vực</th>"
            + "<th class='customerPhone'>Địa chỉ chi tiết</th>"
            + "<th class='customerPhone'>Trạng thái</th>"
            + "<th class='action'>Xem chi tiết</th>"
            + "<th class='action'>Thao tác</th>"
            + "</tr>"
            + "</thead>"
            + "<tbody>"

            + "</tbody>"
            + "</table>";
        $('.bodyModalView').append(html);

        $("#tableModal").dataTable({
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
                url: "/User/getDataTablesWithUserId",
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
                        return "<span data-toggle='modal'  class='dataRow'>" + data.houseType + "</span>";
                    }
                },

                {
                    data: null, render: function (data, type, row, meta) {
                        return "<span data-toggle='modal' class='dataRow'>" + data.price + "</span>";
                    }

                },
                {
                    data: null, render: function (data, type, row, meta) {
                        return "<span data-toggle='modal'  class='dataRow'>" + data.locationName + "</span>";
                    }

                },

                {
                    data: null, render: function (data, type, row, meta) {
                        return "<span data-toggle='modal'  class='dataRow'>" + data.address + "</span>";
                    }

                },
                {
                    data: null, render: function (data, type, row, meta) {
                        return "<span data-toggle='modal'  class='dataRow'>" + data.houseStatus + "</span>";
                    }

                },
                {
                    data: null, render: function (data, type, row, meta) {
                        return "<a href='/House/HouseDetail?id=" + data.id + "' target='_blank'  style='margin: 10px;cursor: pointer;'><i class='fas fa-external-link-alt'></i></a>";
                    }
                },
                {
                    data: null, render: function (data, type, row, meta) {
                        return "<a href='' id='btnDeleteOfModal' idUser='" + requestID.userId + "' idBooking='" + data.idBooking + "'   style='margin: 10px; cursor: pointer;'><i class='fas fa-trash'></i></a>";
                    }
                },

            ]
        });


    });


    //=====================================================================================================
    //DELETE Booking of User FUNCTION
    $(document).on('click', '#btnDeleteOfModal', function (e) {
        e.preventDefault();
        var requestIdUser = $(this).attr('idUser');
        var requestIdBooking = $(this).attr('idBooking');

        let checkAction = 1;
        var answer = confirm("Bạn muốn xóa lịch đặt phòng này?");
        if (answer) {

            const callAPIDelete = async () => {
                try {
                    const response = await fetch(`/BookingCalender/DeleteConfirmed?bookingCalendersId=${requestIdBooking}`, { method: "POST" });
                    const data = await response.text();
                    if (data != 1) {
                        checkAction = data;
                    }
                } catch (error) {
                    console.log("(RemoveBookingHouse) Lỗi khi cập nhật: " + error);
                    alert("Xóa thất bại1!");

                }
            };
            callAPIDelete();
            if (checkAction == 1) {
                $('#myModalCRUD').modal('hide');
                alert('Xác nhận xóa thành công!');
            }
            else {
                alert("Xóa thất bại2!");
            }
        };
    });

    //=====================================================================================================
    //Valdidation  
    function formValidate() {
        var isValid = true;
        if ($('#Name').val().trim() == "") {
            $('#Name').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Name').css('border-color', 'lightgrey');
        }

        if ($('#PhoneNumber').val().trim() == "") {
            $('#PhoneNumber').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#PhoneNumber').css('border-color', 'lightgrey');
        }

        if ($('#Email').val().trim() == "") {
            $('#Email').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Email').css('border-color', 'lightgrey');
        }
        if ($('#Gender').val().trim() == "") {
            $('#Gender').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Gender').css('border-color', 'lightgrey');
        }

        if ($('#Role').val().trim() == "") {
            $('#Role').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Role').css('border-color', 'lightgrey');
        }

        return isValid;
    }
});