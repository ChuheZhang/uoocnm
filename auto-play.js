// 每秒检查当前视频播放状态
setInterval(function() {
    // 获取当前页面上的视频元素
    let videoElement = document.querySelector('video');

    if (videoElement && videoElement.paused) {
        videoElement.play();
    }
}, 1000);

// 防止鼠标移出时暂停视频
let events = ['mousemove', 'mouseleave'];
events.forEach(eventType => {
    window.addEventListener(eventType, function(event) {
        event.stopImmediatePropagation();
    }, true);
});

