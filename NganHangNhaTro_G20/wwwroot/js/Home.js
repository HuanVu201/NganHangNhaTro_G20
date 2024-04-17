$(document).ready(function () {
    function getImg(images, house) {
        $.each(images, function (index, image) {
            console.log(image.houseId)
            console.log(house.id)
            let idhouse = house.id;
            let idimage = image.houseId;

            if (idhouse.toLowerCase() === idimage.toLowerCase()) {
                var imgHtml = `<img src="${image.url}" alt="Thumbnail Image">`;
                $(`.content-item[pid="${house.id}"] .thumbnail`).append(imgHtml);
                return false;
            } else {
                console.log('id ko băng nhau')
            }
        });
    }
    $.ajax({
        url: '/Home/GetHouseData',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var contentItems = $('.content-items');
            contentItems.empty();

            $.each(data.houses, function (index, house) {
                // Chuyển đổi ngày tạo ra đối tượng ngày và định dạng ngày
                var createdAtDate = new Date(house.createdAt);
                var formattedDate = createdAtDate.toLocaleDateString('vi-VN');

                var houseHtml = `
                        <div pid=${house.id} class="content-item">
                            <div class="row">
                                <div class="ct-title">
                                    <a href="House/HouseDetail?id=${house.id}">
                                        ${house.houseTitle} cho thuê, Diện tích: ${house.acreage}m<sup>2</sup>
                                    </a>
                                </div>
                                <div class="ct-date">
                                    <a href="House/HouseDetail?id=${house.id}">${formattedDate}</a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="thumbnail">
                                    <!-- Đây là nơi để append thẻ img -->
                                </div>
                                <div class="text">
                                    <div class="ct-brief">
                                        ${house.desciption}
                                        <span><a href="House/HouseDetail?id=${house.id}">...xem chi tiết</a></span>
                                    </div>
                                    <div class="square-direct row">
                                        <div class="ct-kt text-bold">
                                            Diện tích:
                                            <span style="font-weight: 100">${house.acreage}m<sup>2</sup></span>
                                        </div>
                                        <div class="ct-kt text-bold">KT: <span>---</span></div>
                                        <div class="ct-direct text-bold">Hướng: <span>_</span></div>
                                    </div>
                                    <div class="price-dis ">
                                        <div class="ct-price">
                                            <p class="text-bold">
                                                Giá: <span style="color: red">${house.price} triệu / tháng</span>
                                            </p>
                                        </div>
                                        <div class="ct-dis">
                                            <a href="">${house.address},</a>
                                            <a href=""> Phường Ô Chợ Dừa,</a>
                                            <a href=""> Quận Đống Đa,</a>
                                            <a href=""> Hà Nội</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                contentItems.append(houseHtml);
                getImg(data.images, house)
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
            var pricesAdded = [];
            $.each(data.houses, function (i, house) {
                var price = house.price;

                if (!pricesAdded.includes(price)) {
                    var $li = $("<li></li>").text(price);
                    var $span = $("<span></span>").text(" triệu");
                    $priceUl.append($li.append($span));
                    pricesAdded.push(price);
                }
            });

            $('.price').empty().append($priceUl);


            var $acreageUl = $("<ul></ul>");
            var acreageAdded = [];
            $.each(data.houses, function (i, house) {
                var acreage = house.acreage
                if (!acreageAdded.includes(acreage)) {
                    var $li = $("<li></li>").text(house.acreage);
                    var $span = $("<span></span>").text(" m2");
                    $acreageUl.append($li.append($span));
                    acreageAdded.push(acreage)
                }
            });
            $('.square').empty().append($acreageUl);
            a();
        },
        error: function (err) {
            console.log('Đã xảy ra lỗi khi lấy dữ liệu!');
            console.log(err.responseText);
        }
    });
    let count = 0;
    let textSearch = '';
    function a() {
        const text_names = document.querySelectorAll(".text-name");
        const view_districts = document.querySelectorAll(".district li");
        const view_prices = document.querySelectorAll(".price li");
        const view_squares = document.querySelectorAll(".square li");
        const views = document.querySelectorAll(".multicolumns .view");
        const texts = document.querySelectorAll(".text-name .text");
        const icloses = document.querySelectorAll(".multicolumns .fa-times");
        const array_views = [
            view_districts,
            view_prices,
            view_squares,
        ];
        text_names.forEach((item, index) => {
            item.onclick = function () {
                views[index].classList.remove("active-view");
                array_views[index].forEach((item) => {
                    item.onclick = function () {

                        textSearch += item.innerText + ",";
                        console.log(textSearch)
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
   
    $("#button-search").click(function () {
        var keyword = textSearch + $('.location').val();
        console.log(keyword)
        $.ajax({

            url: "/Home/Search",
            type: "POST",
            data: { keyword: keyword },
            success: function (data) {
                var contentItems = $('.content-items');
                var textSeach = 'Kết quả tìm kiếm : ' + keyword;
                $('.property-type-article').css('border', 'none');
                $('.property-type-article').empty();
                contentItems.empty();

                if (data.error) {
                    $('.body .title p').first().text(data.error);
                    $('.body .title p').eq(1).text(textSeach);
                    var imgElement = $("<img>");
                    imgElement.attr("src", "/images/imageSearchErrorr.png");
                    imgElement.css({
                        "width": "99%",
                        "height": "90%",
                    });
                    contentItems.append(imgElement);
                } else {
                    $('.body .title p').first().text(textSeach);
                    $('.body .title p').eq(1).text('Danh sách kết quả tìm kiếm :');
                    $.each(data.houses, function (index, house) {
                        // Chuyển đổi ngày tạo ra đối tượng ngày và định dạng ngày
                        var createdAtDate = new Date(house.createdAt);
                        var formattedDate = createdAtDate.toLocaleDateString('vi-VN');

                        var houseHtml = `
                            <div pid=${house.id} class="content-item">
                                <div class="row">
                                    <div class="ct-title">
                                        <a href="House/HouseDetail?id=${house.id}">
                                            ${house.houseTitle} cho thuê, Diện tích: ${house.acreage}m<sup>2</sup>
                                        </a>
                                    </div>
                                    <div class="ct-date">
                                        <a href="House/HouseDetail?id=${house.id}">${formattedDate}</a>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="thumbnail">
                                        <!-- Đây là nơi để append thẻ img -->
                                    </div>
                                    <div class="text">
                                        <div class="ct-brief">
                                            ${house.desciption}
                                            <span><a href="House/HouseDetail?id=${house.id}">...xem chi tiết</a></span>
                                        </div>
                                        <div class="square-direct row">
                                            <div class="ct-kt text-bold">
                                                Diện tích:
                                                <span style="font-weight: 100">${house.acreage}m<sup>2</sup></span>
                                            </div>
                                            <div class="ct-kt text-bold">KT: <span>---</span></div>
                                            <div class="ct-direct text-bold">Hướng: <span>_</span></div>
                                        </div>
                                        <div class="price-dis ">
                                            <div class="ct-price">
                                                <p class="text-bold">
                                                    Giá: <span style="color: red">${house.price} triệu / tháng</span>
                                                </p>
                                            </div>
                                            <div class="ct-dis">
                                                <a href="">${house.address},</a>
                                                <a href=""> Phường Ô Chợ Dừa,</a>
                                                <a href=""> Quận Đống Đa,</a>
                                                <a href=""> Hà Nội</a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        `;
                        contentItems.append(houseHtml);
                        getImg(data.images, house)
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    });
});
