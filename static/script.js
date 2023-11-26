let songPlayList = [];

async function fetchSongs() {
  try {
    const response = await fetch("/api/songs");
    const data = await response.json();
    // console.log(data);

    songList = document.getElementsByClassName("songList")[0];

    for (const item of data) {
      const name = item.name.toUpperCase();
      const path = item.path;

      const capsule = `<div class="songCapsule">
                <img src="../static/song-icon.png" alt="song">
                <div class="songInfo">
                    <span class="songName">${name}</span>
                    <span class="songLen">03:48</span>
                </div>
                <img src="../static/play.png" class="songListPlay" alt="play-song" id=${item.id}>
            </div>`;

      songList.innerHTML += capsule;
      songPlayList.push(path);
    }

    let songNum = document.querySelector(".lib-div-desc");
    songNum.innerText = ". " + songPlayList.length + " songs";

    let path = "../static/music/escaping gravity.mp3";
    let audioElement = new Audio(`${path}`);

    let masterPlay = document.getElementById("masterPlay");
    let capsulePlay = document.getElementsByClassName("songListPlay");
    audioElement.addEventListener("play", () => {
      masterPlay.classList.remove("play");
      masterPlay.classList.add("pause");

      // capsulePlay.src = '../static/pause.png';
    });

    audioElement.addEventListener("pause", () => {
      masterPlay.classList.remove("pause");
      masterPlay.classList.add("play");

      // capsulePlay.src = '../static/play.png';
      // Arrya.from(capsulePlay).forEach(element=>{
      //     element.src = '../static/play.png';
      // })
      makeAllPlay();
    });

    masterPlay.addEventListener("click", () => {
      if (masterPlay.classList.contains("play")) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    });

    document.addEventListener("keypress", (e) => {
      if (e.key == " " || e.key == "Spacebar" || e.key == "MediaPlayPause") {
        if (audioElement.paused) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      }
    });

    // PROGRESS BAR STUFF
    let progressBar = document.getElementById("myProgressBar");
    let progress;
    audioElement.addEventListener("timeupdate", function (e) {
      progress = (this.currentTime / this.duration) * 100;
      // console.log(typeof progress)
      progressBar.value = progress;
      timer.innerText =
        Math.round((this.duration - this.currentTime) / 60) + "min";
    });

    progressBar.addEventListener("input", function (e) {
      progress = this.value;
      const currentTime = (audioElement.duration * progress) / 100;
      // const currentTime =
      audioElement.currentTime = currentTime;
    });

    let timer = document.getElementsByClassName("duration")[0];

    // Array.from(capsulePlay).forEach((element, i)=>{
    //     element.addEventListener('click', (e)=>{
    //         // console.log(i);
    //         song = songPlayList[i];
    //         progressBar.value = 0;
    //         audioElement.currentTime = 0;
    //         path = song;
    //         audioElement.src = path;
    //         console.log(path);
    //         console.log(audioElement)
    //     })
    // })

    const makeAllPlay = () => {
      Array.from(capsulePlay).forEach((element, i) => {
        element.src = "../static/play.png";
      });
    };

    Array.from(capsulePlay).forEach((element, i) => {
      element.addEventListener("click", (e) => {
        song = songPlayList[i];
        progressBar.value = 0;
        audioElement.currentTime = 0;
        // audioElement.src = song; // Update the audio element's source
        path = song;
        audioElement.src = path;
        audioElement.play(); // Start playing the new song
        // if (i == songPlayList.indexOf(audioElement.src) && audioElement.paused) {
        //     audioElement.play();
        //     element.src = '../static/play.png';
        // } else if (i == songPlayList.indexOf(audioElement.src)) {
        //     audioElement.pause();
        //     element.src = '../static/pause.png';
        // } else {

        // }

        makeAllPlay();

        element.src = "../static/pause.png";
      });

      audioElement.addEventListener("ended", () => {});
    });

    // if (mod.innerHTML == 'Loop all') {
    //     audioElement.addEventListener('ended', ()=>{
    //         // console.log(audioElement.src);
    //         current = songPlayList.indexOf(audioElement.src);
    //         if (current == songPlayList.length - 1) {
    //             audioElement.src = songPlayList[0]
    //         } else {
    //             audioElement.src = songPlayList[current+1]
    //         }
    //         progressBar.value = 0;
    //         audioElement.currentTime = 0;
    //         audioElement.play();
    //     })
    // }

    audioElement.addEventListener("play", () => {
      makeAllPlay();
      const currentSongIndex = songPlayList.indexOf(path);
      Array.from(capsulePlay).forEach((element, i) => {
        if (i == currentSongIndex) {
          element.src = "../static/pause.png";
        }
      });
      let songNames =
        document.getElementsByClassName("songName")[currentSongIndex];
      let playingSongName = document.getElementsByClassName("songPlayInfo")[0];
      playingSongName.innerHTML = songNames.innerText;
    });

    // Array.from(capsulePlay).forEach((element,i)=>{
    //     if (element.src = '../static/pause.png') {
    //         songNameIndex = i;

    //         let songNames = document.getElementsByClassName('songName')[songNameIndex];
    //         let playingSongName = document.getElementsByClassName('songPlayInfo')[0];
    //         playingSongName.innerHTML = songNames.innerText;
    //     }
    // })

    let modList = document.getElementsByClassName("modeList");
    let songSettings = document.getElementsByClassName("songSettings")[0];
    songSettings.addEventListener("click", () => {
      let mod = document.querySelector(".mode");
      mod.classList.toggle("heightExtend");
      Array.from(modList).forEach((element) => {
        element.classList.toggle("hidden");
      });
    });

    const removeSelectedMode = () => {
      Array.from(modList).forEach((element) => {
        if (element.classList.contains("selectedMode")) {
          element.classList.remove("selectedMode");
        }
      });
    };

    Array.from(modList).forEach((element) => {
      element.addEventListener("click", () => {
        let selectedModeList = Array.from(
          document.getElementsByClassName("selectedMode")
        );
        selectedModeList.forEach((eleyoment) => {
          eleyoment.classList.remove("selectedMode");
        });
        element.classList.add("selectedMode");
      });
    });

    let selectedMod = document.querySelector(".selectedMode");
    audioElement.addEventListener("ended", () => {
      let modeNow = document.querySelector(".selectedMode");
      const currentSongIndex = songPlayList.indexOf(path);
      if (modeNow.innerHTML === "Loop all") {
        // Find the index of the current song in the playlist

        // Check if the current song is the last one in the playlist
        if (currentSongIndex === songPlayList.length - 1) {
          // If it's the last song, loop back to the first song
          path = songPlayList[0];
        } else {
          // Otherwise, play the next song in the playlist
          path = songPlayList[currentSongIndex + 1];
        }

        // Update the audio element's source with the new path
        audioElement.src = path;

        // Reset the progress bar and play the next song
        progressBar.value = 0;
        audioElement.currentTime = 0;
        audioElement.play();
        // console.log('Next song:', audioElement.src);
        // Array.from(capsulePlay).forEach((element, i)=>{
        //     makeAllPlay();
        //     // console.log(path);
        //     // console.log(songPlayList.indexOf(path));
        //     // if (songPlayList.indexOf(path) == i) {
        //     //     element.src = '../static/pause.png'
        //     // } else {
        //     //     element.src = '../static/play.png'
        //     // }
        // })
      } else if (modeNow.innerHTML == "Shuffle") {
        let randomIndex = Math.floor(Math.random() * songPlayList.length);
        path = songPlayList[randomIndex];
        audioElement.src = path;
        progressBar.value = 0;
        audioElement.currentTime = 0;
        audioElement.play();
      } else if (modeNow.innerHTML == "Loop one") {
        progressBar.value = 0;
        audioElement.currentTime = 0;
        audioElement.play();
      }
    });

    let nexSong = document.getElementById("masterNext");

    nexSong.addEventListener("click", () => {
      let modeNow = document.querySelector(".selectedMode");
      const currentSongIndex = songPlayList.indexOf(path);
      if (modeNow.innerHTML == "Loop all" || modeNow.innerHTML == "Loop one") {
        // Check if the current song is the last one in the playlist
        if (currentSongIndex === songPlayList.length - 1) {
          // If it's the last song, loop back to the first song
          path = songPlayList[0];
        } else {
          // Otherwise, play the next song in the playlist
          path = songPlayList[currentSongIndex + 1];
        }

        // Update the audio element's source with the new path
        audioElement.src = path;

        // Reset the progress bar and play the next song
        progressBar.value = 0;
        audioElement.currentTime = 0;
        audioElement.play();
      } else if (modeNow.innerHTML == "Shuffle") {
        let randomIndex = Math.floor(Math.random() * songPlayList.length);
        path = songPlayList[randomIndex];
        audioElement.src = path;
        progressBar.value = 0;
        audioElement.currentTime = 0;
        audioElement.play();
      }
    });

    let previousSong = document.getElementById("masterPrevious");

    previousSong.addEventListener("click", () => {
      let modeNow = document.querySelector(".selectedMode");
      const currentSongIndex = songPlayList.indexOf(path);
      if (modeNow.innerHTML == "Loop all" || modeNow.innerHTML == "Loop one") {
        // Check if the current song is the last one in the playlist
        if (currentSongIndex === 0) {
          // If it's the last song, loop back to the first song
          path = songPlayList[songPlayList.length - 1];
        } else {
          // Otherwise, play the next song in the playlist
          path = songPlayList[currentSongIndex - 1];
        }

        // Update the audio element's source with the new path
        audioElement.src = path;

        // Reset the progress bar and play the next song
        progressBar.value = 0;
        audioElement.currentTime = 0;
        audioElement.play();
      } else if (modeNow.innerHTML == "Shuffle") {
        let randomIndex = Math.floor(Math.random() * songPlayList.length);
        path = songPlayList[randomIndex];
        audioElement.src = path;
        progressBar.value = 0;
        audioElement.currentTime = 0;
        audioElement.play();
      }
    });
  } catch (error) {
    console.error("Error fetching songs data:", error);
  }
}

// Call fetchSongs function to load data when the page loads
fetchSongs();
