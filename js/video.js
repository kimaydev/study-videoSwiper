window.onload = function(){
    let swVideo = new Swiper(".sw-video", {
        loop: true,
        pagination: {
            el: ".sw-video-pagination",
            type: "fraction",
            formatFractionCurrent: function (number) {
                if (number < 10){
                    return '0' + number;
                } else{
                    return number;
                }
            },
            formatFractionTotal: function (number){                
                if (number < 10){
                    return '0' + number;
                } else{
                    return number;
                }
            }
        },
        navigation: {
            nextEl: ".sw-video-next",
            prevEl: ".sw-video-prev",
        },
    });
};