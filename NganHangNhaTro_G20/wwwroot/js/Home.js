﻿$(document).ready(function () {
    $.ajax({
        url: '/Home/GetHouseData',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var contentItems = $('.content-items');
            contentItems.empty();
            $.each(data, function (index, ele) {
                var houseHtml = `
                    <div pid=${ele.id} class="content-item">
                        <div class="row">
                             <div class="ct-title">
                             <a href="House/HouseDetail?id=${ele.id}">
                                 3 phòng đủ tiện nghi ở ${ele.address} cho thuê , Diện
                                 tích :  ${ele.acreage}m2</a
                               >
                             </div>
                             <div class="ct-date">
                               <a href="">Hôm nay</a>
                             </div>
                           </div>
                           <div class="row">
                             <div class="thumbnail">
                               <img src="/images/anhhalinh.jpg" alt="" />
                             </div>
                             <div class="text">
                               <div class="ct-brief">
                                 ${ele.desciption}
                                 <span><a href="House/HouseDetail?id=${ele.id}">...xem chi tiết</a> </span>
                               </div>
                               <div class="square-direct row">
                                 <div class="ct-kt text-bold">
                                   Diện tích:
                                   <span style="font-weight: 100">
                                     ${ele.acreage}
                                     <span>m <sup>2</sup> </span>
                                   </span>
                                 </div>
                                 <div class="ct-kt text-bold">KT: <span>---</span></div>
                                 <div class="ct-direct text-bold">Hướng: <span>_</span></div>
                               </div>
                               <div class="price-dis row">
                                 <div class="ct-price">
                                   <p class="text-bold">
                                     Giá:
                                     <span style="color: red"
                                       > ${ele.price} <span>triệu / tháng</span></span
                                     >
                                   </p>
                                 </div>
                                 <div class="ct-dis">
                                   <a href="">${ele.address},</a>
                                   <a href=""> Phường Ô Chợ Dừa, </a>
                                   <a href=""> Quận Đống Đa, </a>
                                   <a href=""> Hà Nội</a>
                                 </div>
                               </div>
                               <div class="distance">
                                 <i>Cách Học viện Ngân Hàng khoảng 594m</i>
                               </div>
                             </div>
                           </div>
                             </div>
                    `;
                contentItems.append(houseHtml);
            });
        },
        error: function (err) {
            console.log('Đã xảy ra lỗi khi lấy dữ liệu!');
            console.log(err.responseText);
        }
    });

    $.ajax({
        url: '/Home/GetLocations',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var $addressul = $("<ul></ul>");
            $.each(data.locations, function (i, ele) {
                $addressul.append(
                    $("<li></li>").text(ele.name)
                );
            });

            $('.district').empty().append($addressul);

            var $priceUl = $("<ul></ul>");
            $.each(data.houses, function (i, house) {
                $priceUl.append($("<li></li>").text(house.price));
            });
            $('.price').empty().append($priceUl);



            var $acreageUl = $("<ul></ul>");
            $.each(data.houses, function (i, house) {
                $acreageUl.append($("<li></li>").text(house.acreage));
            });
            $('.square').empty().append($acreageUl);
            a();
        },
        error: function (err) {
            console.log('Đã xảy ra lỗi khi lấy dữ liệu!');
            console.log(err.responseText);
        }
    });
    function a() {
        const text_names = document.querySelectorAll(".text-name");
        console.log(text_names)
        const view_districts = document.querySelectorAll(".district li");
        const view_prices = document.querySelectorAll(".price li");
        const view_squares = document.querySelectorAll(".square li");
        const view_directs = document.querySelectorAll(".direct li");
        const views = document.querySelectorAll(".multicolumns .view");
        const texts = document.querySelectorAll(".text-name .text");
        const icloses = document.querySelectorAll(".multicolumns .fa-times");
        const array_views = [
            view_districts,
            view_prices,
            view_squares,
            view_directs,
        ];
        text_names.forEach((item, index) => {
            item.onclick = function () {
                views[index].classList.remove("active-view");
                array_views[index].forEach((item) => {
                    item.onclick = function () {
                        texts[index].innerText = item.innerText;
                        views[index].classList.add("active-view");
                    };
                });
            };
            icloses[index].onclick = function () {
                views[index].classList.add("active-view");
            };
        });
    }

});
