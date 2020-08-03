export const radioPlayerInit = () => {

	const radio = document.querySelector('.radio');
	const radioCoverImg = document.querySelector('.radio-cover__img');
	const radioHeaderBig = document.querySelector('.radio-header__big');
	const radioNavigation = document.querySelector('.radio-navigation');
	const radioItem = document.querySelectorAll('.radio-item');
	const radioStop = document.querySelector('.radio-stop');
	const radioVolume = document.querySelector('.radio-volume');
	const radioVolumeOff = document.querySelector('.radio-volume-off');
	const radioVolumeOn = document.querySelector('.radio-volume-on');

	const audio = new Audio();
	audio.type = 'audio/aac';

	radioStop.disabled = true;

	const changeIdonPlay = () => {
		if (audio.paused) {
			radio.classList.remove('play');
			radioStop.classList.add('fa-play');
			radioStop.classList.remove('fa-stop');
		} else {
			radio.classList.add('play');
			radioStop.classList.add('fa-stop');
			radioStop.classList.remove('fa-play');
		}
	}

	radioNavigation.addEventListener('change', (event) => {
		const target = event.target;
		const parrent = target.closest('.radio-item');
		const title = parrent.querySelector('.radio-name').textContent;
		radioHeaderBig.textContent = title;

		const urlImg = parrent.querySelector('.radio-img').src;
		radioCoverImg.src = urlImg;
		radioItem.forEach(item => item.classList.remove('select'));
		parrent.classList.add('select');
		radioStop.disabled = false;
		
		audio.src = target.dataset.radioStantion;
		try {
			audio.play();
			changeIdonPlay();
			console.log('audio.src :>> ', audio.src);
		} catch (err) {
			console.error(err);
			window.location.href = 'audio.src';
		}
	});

	radioStop.addEventListener('click', () => {
		if (audio.paused){
			audio.play();
		} else {
			audio.pause();
		}
		changeIdonPlay();
	});


	radioVolume.addEventListener('input', () => {
		audio.volume = radioVolume.value / 100;
		if (audio.volume === 0) {
			return prevAudioVolume = 0.3;
		}
		return prevAudioVolume = audio.volume;
	});
	
	
	let prevAudioVolume = 0.3;
	radioVolumeOff.addEventListener('click', () => {
		if (audio.volume === 0) {
			return;
		}
		prevAudioVolume = audio.volume;
		audio.volume = 0;
		radioVolume.value = audio.volume * 100;
		return prevAudioVolume;
	});

	radioVolumeOn.addEventListener('click',() => {
		audio.volume = prevAudioVolume;
		radioVolume.value = audio.volume * 100;
		return prevAudioVolume = audio.volume;
	});
	
	audio.volume = 0.3;
	radioVolume.value = audio.volume * 100;

}
