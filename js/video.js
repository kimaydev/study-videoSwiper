window.onload = function(){
    // sw-video slide option
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
    // 슬라이드가 움직일 때 기능이 실행된다.
    swVideo.on("slideChange", function(){
        playIndex = this.realIndex;
        playVideo();
    });
    
    let videos = document.querySelectorAll(".sw-video .swiper-slide video");    
    // console.log(videos.length);
    // 각 비디오들의 재생시간을 배열에 저장
    let videosArr = [];

    for(let i = 0; i < videos.length; i++){
        // console.dir(videos[i]);
        videos[i].addEventListener("loadedmetadata", function(){
            // 각 비디오들의 duration(재생시간) 값을 불러온다.
            // console.log(videos[i].duration);

            // 재생시간 소숫점을 올림처리한다.
            let time = Math.ceil(this.duration);
            videosArr[i] = time;
            // console.log(videosArr[i]);
        });
        // 비디오들은 0초에서 시작되어야 한다.
        videos[i].currentTime = 0;
        videos[i].pause();
    }
    // 현재 상단의 for문으로 가져온 비디오들의 재생시간이 playVideo 함수가 실행되기 전에 배열에 저장되어 undefinded가 출력되는 현상이 발생하여 재생시간을 수동으로 저장함.
    videosArr = [17, 19, 17, 24];

    let playIndex = 0;
    let playTimer;

    function playVideo() {
        // 비디오는 0초에서 실행된다.
        videos[playIndex].currentTime = 0;
        videos[playIndex].play();

        // setTimeout의 이벤트 중첩 방지
        clearTimeout(playTimer);
        // 비디오의 재생시간이 끝나면 다음 슬라이드로 넘어간다.
        playTimer = setTimeout(function(){
            swVideo.slideNext();
        }, videosArr[playIndex] * 1000)
    }
    // 비디오가 순차적으로 재생되며, playVideo 함수도 실행된다.
    videos[playIndex].play();
    playVideo();
    
};