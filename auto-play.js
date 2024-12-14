// 标记是否正在切换视频，防止重复触发
let isSwitchingVideo = false;



// 自动检测并播放下一个未完成的视频
function playNextUnfinishedVideo() {
    if (isSwitchingVideo) {
        console.log("正在切换视频，等待操作完成...");
        return;
    }

    console.log("开始检测未完成的视频...");
    isSwitchingVideo = true; // 标记切换状态，避免重复调用

    // 获取所有视频项
    let videoItems = document.querySelectorAll('.basic.ng-scope'); // 所有视频的 DOM 元素

    // 找到当前正在播放的视频
    let currentVideo = document.querySelector('.basic.ng-scope.active'); // 当前播放的视频项

    if (!videoItems || videoItems.length === 0) {
        console.log("未找到视频列表项，请检查类名是否正确！");
        isSwitchingVideo = false; // 重置状态
        return;
    }

    let foundNext = false;
    for (let i = 0; i < videoItems.length; i++) {
        let videoItem = videoItems[i];

        // 跳过已完成和当前正在播放的视频
        if (videoItem.classList.contains('complete') || videoItem === currentVideo) {
            continue;
        }

        // 找到第一个未完成的视频
        console.log("找到下一个未完成的视频，尝试点击...");
        videoItem.click(); // 模拟点击操作跳转到下一个视频
        foundNext = true;

        // 启动3秒超时机制
        setTimeout(() => {
            if (!document.querySelector('.basic.ng-scope.active') || !document.querySelector('video')) {
                console.log("3秒内视频未成功加载，跳过该视频...");
                alert("跳过一个视频，因为无法成功播放！");
            }
            isSwitchingVideo = false; // 重置切换状态
        }, 3000);

        break;
    }

    if (!foundNext) {
        console.log("未找到更多未完成的视频！");
        alert("所有视频已播放完！");
        isSwitchingVideo = false; // 重置切换状态
    }
}

// 检测视频状态
function checkVideoStatus() {
    let videoElement = document.querySelector('video');

    if (videoElement) {
        // 自动设置静音
        if (!videoElement.muted) {
            videoElement.muted = true;
            console.log("已设置静音");
        }

        // 自动设置2倍速
        if (videoElement.playbackRate !== 2) {
            videoElement.playbackRate = 2;
            console.log("已设置为2倍速播放");
        }

        // 当前视频已结束且未切换
        if (videoElement.ended) {
            console.log("当前视频播放完毕，尝试播放下一个未完成的视频...");
            playNextUnfinishedVideo(); // 当前视频结束时，自动播放下一个视频
        } else if (videoElement.paused && !videoElement.ended) {
            console.log("当前视频暂停，尝试继续播放...");
            videoElement.play(); // 如果视频暂停但未结束，自动继续播放
        }
    } else {
        console.log("未找到视频元素，请检查页面是否正确加载。");
    }
}

// 每3秒检测一次视频状态
setInterval(checkVideoStatus, 3000); // 每3秒检查一次视频状态
