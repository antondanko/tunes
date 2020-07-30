export const videoPlayerInit = () => {

	const videoPlayer = document.querySelector('.video-player');
	const videoButtonPlay = document.querySelector('.video-button__play');
	const videoButtonStop = document.querySelector('.video-button__stop');
	const videoProgress = document.querySelector('.video-progress');
	const videoTimePassed = document.querySelector('.video-time__passed');
	const videoTimeTotal = document.querySelector('.video-time__total');
	const videoFullscreen = document.querySelector('.video-fullscreen');
	const videoVolume = document.querySelector('.video-volume');
	const videoVolumeOff = document.querySelector('.video-volume-off');
	const videoVolumeOn = document.querySelector('.video-volume-on');
 
	
	
	const toggleIcon = () => {
		if (videoPlayer.paused) {
			videoButtonPlay.classList.remove('fa-pause');
			videoButtonPlay.classList.add('fa-play');
		} else {
			videoButtonPlay.classList.add('fa-pause');
			videoButtonPlay.classList.remove('fa-play');
		}
	}

	const togglePlay = () => {
		if (videoPlayer.paused){
			videoPlayer.play();
		} else {
			videoPlayer.pause();
		}
		toggleIcon();
	}

	const stopPlay = () => {
		videoPlayer.pause();
		videoPlayer.currentTime = 0;
	}

	const addZero = n => n < 10 ? '0' + n : n;

	videoPlayer.addEventListener('click', togglePlay);
	videoButtonPlay.addEventListener('click', togglePlay);

	// videoPlayer.addEventListener('play', toggleIcon);
	videoPlayer.addEventListener('pause', toggleIcon);

	videoButtonStop.addEventListener('click', stopPlay);

	videoPlayer.addEventListener('timeupdate', () => {
		const currentTime = videoPlayer.currentTime;
		const duration = videoPlayer.duration;
		
		videoProgress.value = (currentTime / duration) * 100 ;
		
		let minutePassed = Math.floor(currentTime / 60);
		let secondsPassed = Math.floor(currentTime % 60);

		let minuteTotal = Math.floor(duration / 60);
		let secondsTotal = Math.floor(duration % 60);
		;
		videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
		videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
		
	});
	
	videoProgress.addEventListener('input', () => {
		const duration = videoPlayer.duration;
		const value = videoProgress.value;
		
		videoPlayer.currentTime = (value * duration) / 100;
	});
	
	videoFullscreen.addEventListener('click', () => {
		videoPlayer.requestFullscreen();
	});
	
	videoVolume.addEventListener('input', () => {
		videoPlayer.volume = videoVolume.value / 100;
		if (videoPlayer.volume === 0) {
			return prevVolume = 0.3;
		}
		return prevVolume = videoPlayer.volume;
	});
	
	
	let prevVolume = 0.3;
	videoVolumeOff.addEventListener('click', () => {
		if (videoPlayer.volume === 0) {
			return;
		}
		prevVolume = videoPlayer.volume;
		videoPlayer.volume = 0;
		videoVolume.value = videoPlayer.volume * 100;
		return prevVolume;
	});

	videoVolumeOn.addEventListener('click',() => {
		videoPlayer.volume = prevVolume;
		videoVolume.value = videoPlayer.volume * 100;
		return prevVolume = videoPlayer.volume;
	});
	
	videoPlayer.volume = 0.3;
	videoVolume.value = videoPlayer.volume * 100;
	
};