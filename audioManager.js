class AudioManager {
    constructor(audioSrc) {
        this.audioSrc = audioSrc;
        this.audio = new Audio(this.audioSrc);
        this.audio.loop = true;
        this.isPlaying = false;

        window.addEventListener("load", () => {
            this.initializeAudio();
        });

        window.addEventListener("beforeunload", () => {
            this.persistAudioState();
        });

        document.addEventListener('click', () => {
            if (!this.isPlaying) {
                this.play();
            }
        });
    }

    initializeAudio() {
        const volume = localStorage.getItem("volume");
        if (localStorage.getItem("isPlaying") === "true") {
            this.audio.currentTime = localStorage.getItem("currentTime") || 0;
            this.audio.volume = volume ? volume : 0.5;
            this.audio.play();
            this.isPlaying = true;
        } else {
            this.audio.volume = volume ? volume : 0.5;
        }

        this.audio.addEventListener("timeupdate", () => {
            localStorage.setItem("currentTime", this.audio.currentTime);
        });
    }

    persistAudioState() {
        localStorage.setItem("isPlaying", this.isPlaying);
        localStorage.setItem("currentTime", this.audio.currentTime);
    }

    play() {
        this.audio.play();
        this.isPlaying = true;
        localStorage.setItem("isPlaying", true);
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        localStorage.setItem("isPlaying", false);
    }

    setVolume(volume) {
        this.audio.volume = volume / 100;
        localStorage.setItem("volume", this.audio.volume);
    }

    setSoundType(type) {
        console.log('Tipo de sonido cambiado a:', type);
    }
}

const audioManager = new AudioManager('audio/pokedanceInst.mp3');
