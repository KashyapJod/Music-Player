
        new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      showAllSongs: true,
    showFavoriteSongs: false,
      tracks: [
        { name: "Mekanın Sahibi", artist: "Norm Ender", cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg", source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3", url: "https://www.youtube.com/watch?v=z3wAjJXbYzA", favorited: false },
        { name: "Everybody Knows", artist: "Leonard Cohen", cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg", source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3", url: "https://www.youtube.com/watch?v=Lin-a2lTelg", favorited: false },
        { name: "Extreme Ways", artist: "Moby", cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg", source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3", url: "https://www.youtube.com/watch?v=ICjyAe9S54c", favorited: false },
        { name: "Butterflies", artist: "Sia", cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg", source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3", url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y", favorited: false },
        { name: "The Final Victory", artist: "Haggard", cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg", source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3", url: "https://www.youtube.com/watch?v=0WlpALnQdN8", favorited: false },
        { name: "Genius ft. Sia, Diplo, Labrinth", artist: "LSD", cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg", source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3", url: "https://www.youtube.com/watch?v=HhoATZ1Imtw", favorited: false },
        { name: "The Comeback Kid", artist: "Lindi Ortega", cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg", source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3", url: "https://www.youtube.com/watch?v=me6aoX0wCV8", favorited: false},
        { name: "Overdose", artist: "Grandson", cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg", source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3", url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o", favorited: false },
        { name: "Rag'n'Bone Man", artist: "Human", cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg", source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3", url: "https://www.youtube.com/watch?v=L3wKzyIN1yk", favorited: false }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null,
      isShowCover: true,
      favoriteSongs: []
    };
  },
  methods: {
    showAll() {
        this.showAllSongs = true;
        this.showFavoriteSongs = false;
    },
    showFavorites() {
        this.showAllSongs = false;
        this.showFavoriteSongs = true;
    },
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      this.duration = `${durmin < 10 ? "0" + durmin : durmin}:${dursec < 10 ? "0" + dursec : dursec}`;
      this.currentTime = `${curmin < 10 ? "0" + curmin : curmin}:${cursec < 10 ? "0" + cursec : cursec}`;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      this.currentTrackIndex = this.currentTrackIndex > 0 ? this.currentTrackIndex - 1 : this.tracks.length - 1;
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      this.currentTrackIndex = this.currentTrackIndex < this.tracks.length - 1 ? this.currentTrackIndex + 1 : 0;
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        this.isTimerPlaying ? this.audio.play() : this.audio.pause();
      }, 300);
    },
    favorite() {
  this.tracks[this.currentTrackIndex].favorited = !this.tracks[this.currentTrackIndex].favorited;
  if (this.tracks[this.currentTrackIndex].favorited) {
    this.favoriteSongs.push(this.tracks[this.currentTrackIndex]);
  } else {
    this.favoriteSongs = this.favoriteSongs.filter((song) => song !== this.tracks[this.currentTrackIndex]);
  }
}
,
    playTrack(index) {
      this.currentTrackIndex = index;
      this.currentTrack = this.tracks[index];
      this.resetPlayer();
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function () {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function () {
      vm.generateTime();
    };
    this.audio.onended = function () {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };
    // Preload covers (optional)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image";
      document.head.appendChild(link);
    }
  }
});

