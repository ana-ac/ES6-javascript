// copy unicode icons https://www.copypastecharacter.com/
(function (w) {
    //variables
    const player = document.querySelector('.player');
    const video = player.querySelector('.viewer');
    const progress = player.querySelector('.progress');
    const progressBar = player.querySelector('.progress__filled');
    const toggle = player.querySelector('.toggle');
    const toggleScreen = player.querySelector('.toggle__screen');
    const skipButtons = player.querySelectorAll('[data-skip]');
    const ranges = player.querySelectorAll('.player__slider');

    // handle private functions
    // throw event to play or paused video cliking on video or icon toggle
    function togglePlay() {
        video[video.paused ? 'play' : 'pause']();
    }
    // toggle icon between pause and play depending of event
    function updateButton(e) {
        const icon = e.type === 'pause' ? '❚❚' : '►';
        toggle.textContent = icon;
    }
    // handle event to advance or delay video
    function skipVideo(e) {
        video.currentTime += parseFloat(this.dataset.skip);
    }
    // handle progress bar with video state
    function handleRangeUpdate() {
        video[this.name] = this.value;
    }
    // progressBar update when video current time is updated
    function handleProgress() {
        const percentage = (video.currentTime / video.duration) * 100;
        progressBar.style.flexBasis = `${percentage}%`;
    }
    // updating video currentTime when progressBar is updated
    function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }
    // toggle full screen style
    function toggleFullScreen(e) {
        if (video.webkitRequestFullScreen) {
            video.webkitRequestFullScreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        }
    }
    // set progress video
    function setCurrentTime(value) {
        video.currentTime = parseFloat(value);
    }
    // get progress video
    function getCurrentTime() {
        return video.currentTime;
    }

    // events
    // video
    video.addEventListener('click', togglePlay);
    toggle.addEventListener('click', togglePlay);
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    // skipping
    skipButtons.forEach(item => item.addEventListener('click', skipVideo));
    // updateing range bars
    ranges.forEach(item => item.addEventListener('change', handleRangeUpdate));
    ranges.forEach(item => item.addEventListener('mousemove', handleRangeUpdate));
    // updateing progress
    video.addEventListener('timeupdate', handleProgress);
    // moving progressBar
    //let mousedown = false;
    progress.addEventListener('click', scrub);
    //progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
    //progressBar.addEventListener('mousedown', () => mousedown = true);
    //progressBar.addEventListener('mouseup', () => mousedown = false);

    // let full screen transfomr
    toggleScreen.addEventListener('click', toggleFullScreen);

    // provide public methods
    w.player = {
        updateProgressVideo : setCurrentTime,
        getProgressVideo : getCurrentTime
    }

})(window);
