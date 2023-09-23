const vidWrapper = document.querySelector('div.player');
const myVid = vidWrapper.querySelector('video.player__video');
//const myVol = vidWrapper.querySelector('video.player__button');

// controls
const controlPlayBtn = vidWrapper.querySelector('.player__button');
const controlPlay = vidWrapper.querySelector('.play_hover');
const controlVol = vidWrapper.querySelector('.player__slider[name="volume"]');
const controlVolBtn = vidWrapper.querySelector('.volumeBtn');

//const controlTime = vidWrapper.querySelector('.player__slider[name="time"]');
//const controlSkip = vidWrapper.querySelectorAll('.player__button[data-skip]');
//const controlFullScreen = vidWrapper.querySelector('.player__fullscreen');
const controlProgress = vidWrapper.querySelector('.progress');
const progressBar = vidWrapper.querySelector('.progress__filled');

// events
var drag;
var grap;

myVid.addEventListener('click', toggleVideo);
controlPlay.addEventListener('click', toggleVideo);
controlPlayBtn.addEventListener('click', toggleVideo);

controlVol.addEventListener('change', updateVol);
controlVolBtn.addEventListener('click', mute);


controlProgress.addEventListener('mouseover', function(){drag = true});
controlProgress.addEventListener('mouseout', function(){drag = false; grap = false});
controlProgress.addEventListener('mousedown', function(){grap = drag});
controlProgress.addEventListener('mouseup', function(){grap = false});
controlProgress.addEventListener('click', updateCurrentPos);
controlProgress.addEventListener('mousemove', function(e){ if(drag && grap){updateCurrentPos(e)}});

var progression;

// functions
function toggleVideo() {
  if (myVid.paused) {
    myVid.play();
    controlPlay.classList.add('exitBtn');
    controlPlayBtn.classList.add('pause');
    controlPlay.classList.add('credits_hidden');
    updateProgress();
    progression = window.setInterval(updateProgress, 200);
  } else {
    myVid.pause();
    controlPlay.classList.remove('exitBtn');
    controlPlayBtn.classList.add('credits');
    controlPlay.classList.remove('pause');
    clearInterval(progression);
  };
  
}



function updateVol(){
  var volume = this.value;
  myVid.volume = volume;
}

function mute() {
  if(myVid.muted)   {
    myVid.muted=!myVid.muted;
  document.getElementById("volume").style.backgroundImage = "url('./assets/svg/volume.svg')";
  }else{
    myVid.muted=!myVid.muted;
  document.getElementById("volume").style.backgroundImage = "url('./assets/svg/mute.svg')";
  }
}

function updateProgress() {
  var progress = myVid.currentTime / myVid.duration;
  progressBar.style.flexBasis = Math.floor(progress * 1000) / 10 + '%';
}
function updateCurrentPos(e){
  // offset of the progress bar / video wrapper width
  var newProgress = (e.clientX - vidWrapper.offsetLeft) / vidWrapper.clientWidth;
  progressBar.style.flexBasis = Math.floor(newProgress * 1000) / 10 + '%';
  myVid.currentTime = newProgress * myVid.duration;
}


