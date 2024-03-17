$(document).on('click', '.dataRow', function (e) {
    e.preventDefault();

    const maTaiKhoan = $(this).attr('maTaiKhoan')
    initPhanQuyen();

    $('#myModalPhanQuyen').modal('show');
    $('#tenCanBo').html($(this).attr('tenCanBo'));
    $('#listVaiTroBlock').html('');
    $('#listQuyenBlock').html('');

    let arrVaiTroChecked = [];
    let arrVaiTroUnChecked = [];
    let arrVaiTro = [];





    //=====================================================================================================
    //Init Phân quyền
    function initPhanQuyen() {
        const urlChucNang = "https://localhost:7088/PhanQuyen/listChucNang";
        const urlListVaiTro = "https://localhost:7088/PhanQuyen/listVaiTro";
        const urlListQuyen = "https://localhost:7088/PhanQuyen/listQuyen";
        const urlCheckedVaiTro = "https://localhost:7088/PhanQuyen/checkVaiTro?maTaiKhoan=" + maTaiKhoan;
        const urlCheckedQuyen = "https://localhost:7088/PhanQuyen/checkQuyen?maTaiKhoan=" + maTaiKhoan;



        const callAPIListChucNang = async () => {
            try {
                const response = await fetch(urlChucNang);
                const data = await response.json();
                if (!response.ok) {
                    console.log("Lấy danh sách chức năng thất bại!")
                    return;
                }

                var html = '';
                html += "<ul>";
                $.each(data, function (index, value) {
                    html +=
                        "<li>"
                        + "<span type='text' id='" + value.maChucNang + "' class='itemChucNang' >" + value.tenChucNang + "</span>"
                    "</li >"
                });
                html += "</ul>";
                $('.navbarProject__content').html(html);
            }
            catch (error) {
                console.log(error)
            }
        }


        const callAPIListVaiTro = async () => {
            try {
                const response1 = await fetch(urlListVaiTro);
                const data1 = await response1.json();
                if (!response1.ok) {
                    console.log("Lấy danh sách vai trò thất bại!")
                    return;
                }


                var html = '';
                html += "<ul>";

                $.each(data1, function (index, value) {
                    html +=
                        "<li class='" + value.maVaiTro + "' style='display: none;'>"
                        + "<input type='checkbox' name='' id='" + value.maVaiTro + "' maChucNang='" + value.maChucNang + "' class='toggleCheckBoxVaiTro'/>"
                        + "<label for='" + value.maVaiTro + "' class='form-check-label'>   " + value.tenVaiTro + "</label>"
                    "</li >"
                });
                html += "</ul>";
                $('#listVaiTroBlock').html(html);
            }
            catch (error) {
                console.log("Error lấy danh sách: " + error);
            }
        }



        const callAPIListQuyen = async () => {
            try {
                const response1 = await fetch(urlListQuyen);
                const data1 = await response1.json();
                if (!response1.ok) {
                    console.log("Lấy danh sách quyền thất bại!")
                    return;
                }


                var html = '';
                html += "<ul>";

                $.each(data1, function (index, value) {
                    var checkDisplay = 0;
                    for (var i = 0; i < arrVaiTro.length; i++) {
                        if (arrVaiTro[i] == value.maVaiTro) {
                            checkDisplay = 1;
                            console.log(value.maVaiTro)
                        }
                    }

                    html +=
                        "<li class='" + value.maQuyen + "' style='display: none;'>"
                        + "<input type='checkbox' name='' id='" + value.maQuyen + "' value='" + value.maVaiTro + "' pid='" + value.maVaiTro + "' class='toggleCheckBoxQuyen' />"
                        + "<label for='" + value.maQuyen + "'>" + value.tenQuyen + "</label>"
                    "</li>"


                });
                html += "</ul>";
                $('#listQuyenBlock').html(html);
            }
            catch (error) {
                console.log("Error lấy danh sách quyền: " + error);
            }
        }



        const callAPICheckedVaiTro = async () => {
            try {
                const response = await fetch(urlCheckedVaiTro);
                const data = await response.json();
                if (!response.ok) {
                    console.log("Checked vai trò thất bại!")
                    return;
                }
                var arrCheckedVaiTro = data.toString().split(',');

                $('#listVaiTroBlock li .toggleCheckBoxVaiTro').each(function (index, value) {
                    var checked = 0;
                    for (var i = 0; i < arrCheckedVaiTro.length; i++) {
                        if (value.getAttribute('id') == arrCheckedVaiTro[i]) {
                            checked = 1;
                        }
                    }

                    if (checked == 1) {
                        $('#' + value.getAttribute('id')).attr('checked', true);
                    }
                });
            }
            catch (error) {
                console.log("Error Checked: " + error);
            }
        }


        const callAPICheckedQuyen = async () => {
            try {
                const response = await fetch(urlCheckedQuyen);
                const data = await response.json();
                if (!response.ok) {
                    console.log("Checked quyền thất bại!")
                    return;
                }
                var arrCheckedQuyen = data.toString().split(',');

                $('#listQuyenBlock li .toggleCheckBoxQuyen').each(function (index, value) {
                    var checked = 0;
                    for (var i = 0; i < arrCheckedQuyen.length; i++) {
                        if (value.getAttribute('id') == arrCheckedQuyen[i]) {
                            checked = 1;
                        }
                    }

                    if (checked == 1) {
                        $('#' + value.getAttribute('id')).attr('checked', true);
                    }
                });
            }
            catch (error) {
                console.log("Error Checked: " + error);
            }
        }



        emptyCSS();
        callAPIListChucNang();
        callAPIListVaiTro();
        callAPIListQuyen();
        callAPICheckedVaiTro();
        callAPICheckedQuyen();
    }







    //=====================================================================================================

    $(document).on('click', '.itemChucNang', function (e) {
        var idChucNang = $(this).attr('id');
        updateCheckedQuyen();

        cssVaiTro();
        arrVaiTro = [];

        $('#listVaiTroBlock li .toggleCheckBoxVaiTro').each(function (index, value) {
            if (value.getAttribute('maChucNang') == idChucNang) {
                $('.' + value.getAttribute('id')).css({
                    "display": "block"
                });
                arrVaiTro.push(value.getAttribute('id'))
            }
            else {
                $('.' + value.getAttribute('id')).css({
                    "display": "none"
                });
            }
        });

        $('#listQuyenBlock li .toggleCheckBoxQuyen').each(function (index, value) {
            var checkDisplay = 0;
            for (var i = 0; i < arrVaiTro.length; i++) {
                if (arrVaiTro[i] == value.getAttribute("pid")) {
                    checkDisplay = 1;
                }
            }

            if (checkDisplay == 1) {
                $('.' + value.getAttribute('id')).css({
                    "display": "block"
                });
            }
            else {
                $('.' + value.getAttribute('id')).css({
                    "display": "none"
                });
            }
        });

    });



    //=====================================================================================================
    //ClickVaiTroBlock
    $(document).on('click', '.contentBlock__heading--vaiTro', function (e) {
        e.preventDefault();
        cssVaiTro();
        arrVaiTroChecked = [];
        arrVaiTroUnChecked = [];

    });





    //=====================================================================================================
    //ClickQuyenBlock
    $(document).on('click', '.contentBlock__heading--quyen', function (e) {
        e.preventDefault();
        cssQuyen();
        updateCheckedQuyen();

    });





    //=====================================================================================================
    //toggleCheckBoxVaiTro
    $(document).on('click', '.toggleCheckBoxVaiTro', function (e) {
        if (this.checked) {
            $(this).attr('checked', true);
            var checkRemove = 0;
            for (var i = 0; i < arrVaiTroUnChecked.length; i++) {
                if (arrVaiTroUnChecked[i] == this.id) {
                    arrVaiTroUnChecked.splice(i, 1);
                    checkRemove = 1;
                }
            }

            if (checkRemove == 0) {
                arrVaiTroChecked.push(this.id);
            }
        }
        else {
            $(this).attr('checked', false);
            var checkRemove = 0;

            for (var i = 0; i < arrVaiTroChecked.length; i++) {
                if (arrVaiTroChecked[i] == this.id) {
                    arrVaiTroChecked.splice(i, 1);
                    checkRemove = 1;
                }
            }

            if (checkRemove == 0) {
                arrVaiTroUnChecked.push(this.id);

            }
        }
    });





    //=====================================================================================================
    //toggleCheckBoxQuyen
    $(document).on('click', '.toggleCheckBoxQuyen', function (e) {
        change = 1;
        if (this.checked) {
            $(this).attr('checked', true);
        }
        else {
            $(this).attr('checked', false);
        }


    });





    //=====================================================================================================
    function updateCheckedQuyen() {
        if (arrVaiTroChecked.length != 0 || arrVaiTroUnChecked.length != 0) {
            $('#listQuyenBlock li .toggleCheckBoxQuyen').each(function (index, value) {
                var idVaiTro = $("#" + value.id).attr("pid");

                for (var i = 0; i < arrVaiTroChecked.length; i++) {
                    if (arrVaiTroChecked[i] == idVaiTro) {
                        $(value).attr('checked', true);
                    }
                }

                for (var i = 0; i < arrVaiTroUnChecked.length; i++) {
                    if (arrVaiTroUnChecked[i] == idVaiTro) {
                        $(value).attr('checked', false);
                    }
                }
            });
        }
    }




    //=====================================================================================================
    //Update Phân Quyền
    $(document).on('click', '#btnUpdatePhanQuyen', function (e) {
        updateCheckedQuyen();

        var txtVaiTroCanBo = '';
        var txtQuyenCanBo = '';
        $('#listVaiTroBlock li .toggleCheckBoxVaiTro').each(function (index, value) {
            if (value.checked) {
                txtVaiTroCanBo += value.id + ',';
            }
        });

        $('#listQuyenBlock li .toggleCheckBoxQuyen').each(function (index, value) {
            if (value.checked) {
                txtQuyenCanBo += value.id + ',';
            }
        });

        txtVaiTroCanBo = txtVaiTroCanBo.slice(0, -1);
        txtQuyenCanBo = txtQuyenCanBo.slice(0, -1);


        var txtPhanQuyen = {};
        const urlChiTiet = "https://localhost:7088/CanBo/ChiTiet?maTaiKhoan=" + maTaiKhoan;
        const urlCapNhat = "https://localhost:7088/CanBo/CapNhat?maTaiKhoan=" + maTaiKhoan;


        const callAPIDetail = async () => {
            try {
                const response = await fetch(urlChiTiet);
                const data = await response.json();
                if (!response.ok) {
                    console.log("Lấy thông tin chi tiết thất bại!")
                    return;
                }
                $.each(data, function (index, value) {
                    var ngaySinh = new Date(value.ngaySinh).toLocaleDateString("vi-VN").split('T')[0];

                    txtPhanQuyen = {
                        maTaiKhoan: value.maTaiKhoan,
                        hoTen: value.hoTen,
                        ngaySinh: value.ngaySinh,
                        gioiTinh: value.gioiTinh,
                        sdt: value.sdt,
                        email: value.email,
                        chucVu: value.chucVu,
                        idCoQuan: value.idCoQuan,
                        vaiTroCanBo: txtVaiTroCanBo,
                        quyenCanBo: txtQuyenCanBo
                    };
                });


                const callAPIUpdate = async () => {
                    try {
                        const response = await fetch(urlCapNhat, {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                            },
                            body: JSON.stringify(txtPhanQuyen),
                        });
                        const data = await response.text();

                        if (data != 1) {
                            console.log(data.description)
                            alert("Cập nhật phân quyền thất bại!");
                            return;
                        }
                        $('#myModalPhanQuyen').modal('hide');
                        console.log('cập nhật quyền và vai trò thành công!');
                    } catch (error) {
                        console.log("Cập nhật phân quyền thất bại!" + error);
                        alert("Cập nhật phân quyền thất bại!");
                    }
                }
                callAPIUpdate();
            }
            catch (error) {
                console.log("Không lấy được thông tin chi tiết để cập nhật phân quyền: " + error);
            }
        }
        callAPIDetail();
    });







    //=====================================================================================================
    function emptyCSS() {
        $(".contentBlock__heading--quyen").css({
            "border": "none",
            "color": "#333"

        });
        $(".contentBlock__heading--vaiTro").css({
            "border": "none",
            "color": "#333"
        });

        $('.contentBlock__body--title').html('')

    }





    //=====================================================================================================
    function cssVaiTro() {
        $(".contentBlock__heading--vaiTro").css({
            "border-bottom": "3px solid #1ba61b",
            "color": "#1ba61b"
        });

        $(".contentBlock__heading--quyen").css({
            "border": "none",
            "color": "#333"
        });

        $('.contentBlock__body--title').html('Danh sách các vai trò')

        $("#listQuyenBlock").css({
            "display": "none"
        });

        $("#listVaiTroBlock").css({
            "display": "block"
        });
    }





    //=====================================================================================================
    function cssQuyen() {
        $(".contentBlock__heading--quyen").css({
            "border-bottom": "3px solid #1ba61b",
            "color": "#1ba61b"
        });

        $(".contentBlock__heading--vaiTro").css({
            "border": "none",
            "color": "#333"
        });

        $('.contentBlock__body--title').html('Danh sách các quyền');

        $("#listVaiTroBlock").css({
            "display": "none"
        });

        $("#listQuyenBlock").css({
            "display": "block"
        });
    }




});




