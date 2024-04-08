const imgSmalls = document.querySelectorAll('.imageDetailSmall');
const imgBigs = document.querySelectorAll('.imageDetail');

imgSmalls.forEach((item, index) => {
    item.onclick = function () {
        console.log('1');
        document.querySelector('.imageDetail.imageDetailActive').classList.remove('imageDetailActive');
        document.querySelector('.imageDetailSmall.imageDetailSmallActive').classList.remove('imageDetailSmallActive');
        imgBigs[index].classList.add('imageDetailActive');
        item.classList.add('imageDetailSmallActive');
    };
});

$(document).ready(function () {
    $("#book_room").click(function () {
        $("#bookingModal").modal('show');
    });
    $("#Xacnhandatphong").click(function () {
        $("#bookingModal").modal('hide');
        setTimeout(function () {
        alert("Đã Đặt Phòng");
        }, 1000);
    });

    
    setInterval(function () {
        $('#houseDetail_login').toggleClass('color-changing');
    }, 1000); 

});
