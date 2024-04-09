$(document).ready(function () {
    console.log('BookingCalenderView')

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
                    return "<span data-toggle='modal'  class='dataRow'>" + data.houseType + "</span>";
                }
            },

            {
                data: null, render: function (data, type, row, meta) {
                    return "<span data-toggle='modal' class='dataRow'>" + data.housePrice + "</span>";
                }

            },
            {
                data: null, render: function (data, type, row, meta) {
                    return "<span data-toggle='modal'  class='dataRow'>" + data.customerName + "</span>";
                }

            },
            {
                data: null, render: function (data, type, row, meta) {
                    return "<span data-toggle='modal'  class='dataRow'>" + data.customerPhone + "</span>";
                }

            },
            {
                data: null, render: function (data, type, row, meta) {
                    console.log(data.customerId)
                    return "<a href='' id='btnDetail' idHouse='" + data.Id + "'  style='margin: 10px;cursor: pointer;'><i class='fas fa-info-circle'></i></a>"
                        + "<a href='' id='btnEdit' idHouse='" + data.Id + "' style='margin: 10px;cursor: pointer;'><i class='fas fa-edit'></i></a>"
                        + "<a href='' id='btnDelete' idHouse='" + data.Id + "' ownerName='" + data.OwnerName + "' ownerPhone='" + data.OwnerPhone + "' style='margin: 10px;cursor: pointer;'><i class='fas fa-trash'></i></a>";
                }
            },

        ]
    });

    //=====================================================================================================
    //MODAL EDIT
    $(document).on('click', '#btnEdit', function (e) {

        e.preventDefault();

        var requestIdBooking = $(this).attr('idBookingCalender');
        var requestIdCustomer = $(this).attr('idCustomer');


        const callAPIDetail = async () => {
            try {

                $.ajax({
                    url: '/BookingCalender/ChiTiet',
                    type: 'GET',
                    data: { bookingCalendersId: requestIdBooking },
                    success: function (data) {
                        $('#myModalCRUD').modal('show');
                        $('.modal-title').html('Cập nhật đặt phòng');
                        $('.modal-footer').html(
                            "<button type='button' class='btn btn-primary' id='btnUpdate'>Đã xử lý</button>"
                            + "<button type = 'button' class='btn btn-default' data-dismiss='modal'>Đóng</button >"
                        );

                        $('#CustomerName').val(data[0].customerName);
                        $('#CustomerPhone').val(data[0].customerPhone);
                        $('#CustomerEmail').val(data[0].customerEmail);
                        $('#Note').val(data[0].bookingNote);
                        $('#OwnerName').val(data[0].ownerName);
                        $('#OwnerPhone').val(data[0].ownerPhone);
                        $('#HouseTitle').val(data[0].houseTitle);
                        $('#LocationName').val(data[0].locationName);
                        $('#Address').val(data[0].address);
                        $('#Acreage').val(data[0].acreage);
                        $('#Price').val(data[0].price);
                        $('#Desciption').val(data[0].description);
                        $('#HouseType').val(data[0].houseType);

                        $('#CustomerName').attr("readonly", true);
                        $('#CustomerPhone').attr("readonly", true);
                        $('#CustomerEmail').attr("readonly", true);
                        $('#Note').attr("readonly", true);
                        $('#OwnerName').attr("readonly", true);
                        $('#OwnerPhone').attr("readonly", true);
                        $('#HouseTitle').attr("readonly", true);
                        $('#LocationName').attr("readonly", true);
                        $('#Address').attr("readonly", true);
                        $('#Acreage').attr("readonly", true);
                        $('#Price').attr("readonly", true);
                        $('#Desciption').attr("readonly", true);
                        $('#HouseType').attr("disabled", true);
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
            let checkAction = 1;
            var answer = confirm("Bạn đã xử lý xong lịch đặt phòng này?");
            if (answer) {

                const callAPIDelete = async () => {
                    try {
                        const response = await fetch(`/BookingCalender/RemoveBookingHouse?bookingCalendersId=${requestIdBooking}&customerId=${requestIdCustomer}`, { method: "POST" });
                        const data = await response.text();
                        if (checkAction == 1) {
                            checkAction = data;
                        }
                    } catch (error) {
                        console.log("(RemoveBookingHouse) Lỗi khi cập nhật: " + error);
                        alert("Xóa thất bại!");

                    }


                    try {
                        const response = await fetch(`/BookingCalender/DeleteConfirmed?bookingCalendersId=${requestIdBooking}`, { method: "POST" });
                        const data = await response.text();
                        if (checkAction == 1) {
                            checkAction = data;
                        }
                    } catch (error) {
                        console.log("(DeleteConfirmed) Lỗi khi cập nhật: " + error);

                    }
                };
                callAPIDelete();


                if (checkAction == 1) {
                    $('#myModalCRUD').modal('hide');
                    alert('Xác nhận xử lý thành công!');
                }
                else {
                    alert("Cập nhật thất bại!");
                }
            };
        });
    });

});