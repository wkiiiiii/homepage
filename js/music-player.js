// Music Player for Forest Gamer's Haven
document.addEventListener('DOMContentLoaded', function() {
    // Create audio element
    const audioPlayer = document.createElement('audio');
    audioPlayer.id = 'background-music';
    audioPlayer.loop = true;
    
    // Create music player container
    const playerContainer = document.createElement('div');
    playerContainer.className = 'music-player';
    
    // Create play/pause button
    const playButton = document.createElement('button');
    playButton.className = 'play-button';
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    
    // Create volume control
    const volumeControl = document.createElement('input');
    volumeControl.type = 'range';
    volumeControl.className = 'volume-slider';
    volumeControl.min = 0;
    volumeControl.max = 100;
    volumeControl.value = 50;
    
    // Create track info
    const trackInfo = document.createElement('div');
    trackInfo.className = 'track-info';
    trackInfo.textContent = 'Forest Ambience';
    
    // Add elements to player container
    playerContainer.appendChild(playButton);
    playerContainer.appendChild(trackInfo);
    playerContainer.appendChild(volumeControl);
    
    // Add player to the body
    document.body.appendChild(audioPlayer);
    document.body.appendChild(playerContainer);
    
    // Music tracks - nature-themed ambient sounds
    const tracks = [
        {
            title: "Forest Ambience",
            src: "https://soundbible.com/mp3/forest_ambience-6941.mp3"
        },
        {
            title: "Gentle Stream",
            src: "https://soundbible.com/mp3/creek-1.mp3"
        },
        {
            title: "Birds Chirping",
            src: "https://soundbible.com/mp3/birds-singing-02.mp3"
        }
    ];
    
    // Set initial track
    let currentTrackIndex = 0;
    loadTrack(currentTrackIndex);
    
    // Function to load a track
    function loadTrack(trackIndex) {
        audioPlayer.src = tracks[trackIndex].src;
        trackInfo.textContent = tracks[trackIndex].title;
        audioPlayer.load();
    }
    
    // Play/Pause functionality
    let isPlaying = false;
    playButton.addEventListener('click', function() {
        if (isPlaying) {
            audioPlayer.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audioPlayer.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
    
    // Volume control
    volumeControl.addEventListener('input', function() {
        audioPlayer.volume = this.value / 100;
    });
    
    // Track cycling - click on track info to change tracks
    trackInfo.addEventListener('click', function() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) {
            audioPlayer.play();
        }
    });
    
    // Set initial volume
    audioPlayer.volume = volumeControl.value / 100;
}); 