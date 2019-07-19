const songs = {
    id: [1, 2, 3, 4, 5, 6, 7, 8],
    title: [
        'The Art of Walking',
        'Fame Boozers Lullaby',
        'Do Ya Thing',
        'Milieu',
        'Cinders',
        'Butcher Pete (Part 1)',
        '1000 BPM',
        'Voyager'
    ],
    artist: [
        'Blockhead',
        'Tokimonsta',
        'Gorillaz',
        'Beats Antique',
        'Matt and Kim',
        'Roy Brown',
        'Beck',
        'Daft Punk',
    ],
    feat: [
        null, 'Feat. Rucyl', 'Feat. Andre 3000 & James Murphy', null, null, null, null, null
    ],
    album: [
        'Downtown Science',
        'Fame Boozer',
        'Do Ya Thing',
        'Collide',
        'Grand',
        'DeLuxe 3301',
        'The Information',
        'Discovery'
    ],
    date: [2005, 2012, 2012, 2008, 2009, 1949, 2006, 2001],
    url: [
        'https://ninjatune.net/artist/blockhead',
        'https://tokimonsta.com',
        'https://www.gorillaz.com',
        'https://www.beatsantique.com',
        'https://mattandkim.com',
        'https://en.wikipedia.org/wiki/Roy_Brown_(blues_musician)',
        'https://beck.com',
        'https://daftpunk.com'
    ],
    spotify: [
        'https://spoti.fi/2FGwUkQ',
        'https://bit.ly/2RJCNTq',
        'https://bit.ly/2LlgD8K',
        'https://spoti.fi/2X94RAz',
        'https://spoti.fi/2X6AtH7',
        'https://spoti.fi/2X7QgFl',
        'https://spoti.fi/31WzaxY',
        'https://spoti.fi/2KIJmEQ'
    ]
}


// SONG ASSET PATHS
const tune = 'assets/tunes/';
const img = 'assets/img/';



// =======  MINIHUB EQALIZER ANIMATION  ========== //
const cb = document.getElementsByClassName("colorBlocks")
const colorEqualizerOn = () => {
    var x = document.getElementsByClassName('colorBlocks')
    var cbClass = x[0].className
    if (cbClass.includes("equalizer")) {
        return true;
    } else {
        return false;
    }
}
const toggleColors = () => {
    i = 0;
    for (i = 0; i < cb.length; i++) {
        cb[i].classList.toggle("equalizer");
    }
}



// =======  C R E A T E   &   A D D  ========== //
// ====== P L A Y L I S T   S O N G S ========= //

const createSongList = () => {
    const list = document.createElement('ol');
    for (let i = 0; i < songs.id.length; i++) {
        const item = document.createElement('li');
        item.setAttribute("name", songs.title[i]);
        item.setAttribute("id", songs.id[i]);
        item.appendChild(document.createTextNode(songs.title[i]));

        const itemArtist = document.createElement('span')
        itemArtist.appendChild(document.createTextNode(songs.artist[i]))
        item.appendChild(itemArtist);
        list.appendChild(item);
    }
    return list;
}
document.getElementById('songList').append(createSongList());




// //  S O N G L I S T   C L I C K    // //
// ===================================== //

// Get mp3 sources and the song's name for playlist: 
songList.onclick = (e) => {
    console.log(e)
    const clickedSong = e.target.getAttribute("id");
    const clickedSongName = e.target.getAttribute("name");

    const source = document.getElementById('source');
    const tunePath = tune + 'song-0' + clickedSong + '.mp3';
    source.src = tunePath;

    document.getElementById('currentlyPlayingSong').innerText = "Currently Playing: ";
    document.getElementById('currentSong').innerText = clickedSongName;


    // activate colors on play (assuming they aren't already on)
    player.load()
    player.play()
    if (!colorEqualizerOn()) {
        toggleColors();
    }


    // Get extra song info and display in SongInfo panel
    const cs = clickedSong
    document.getElementById('albumArtPic').src = img + 'art-0' + cs + '.jpg'
    document.getElementById('albumTitle').innerHTML = songs.album[cs - 1]
    document.getElementById('albumYear').innerHTML = songs.date[cs - 1]
    document.getElementById('artistUrl').setAttribute('href', songs.url[cs - 1])
    document.getElementById('artistLogo').src = img + 'logo-0' + cs + '.png'
    document.getElementById('spotifyUrl').setAttribute('href', songs.spotify[cs - 1])
    // If song has featured artist, display featured artist div
    console.log(songs.feat[cs - 1])
    if (songs.feat[cs - 1] != null) {
        document.getElementById('feat').style.display = "block"
        document.getElementById('feat').innerHTML = songs.feat[cs - 1]
    } else {
        document.getElementById('feat').style.display = "none"
    }

}



// //     P L A Y   &  P A U S E      // //
// ===================================== //

const playAudio = () => {
    // play when the audio is loaded
    if (player.readyState) {
        player.play()
    }
    if (!colorEqualizerOn() && player.duration > player.currentTime > 0) {
        toggleColors();
    }
}

const pauseAudio = () => {
    player.pause()
    if (colorEqualizerOn() && player.duration > player.currentTime > 0) {
        toggleColors();
    }
}



// //   V O L U M E   C O N T R O L S // //
// ===================================== //

const slider = document.getElementById('volumeSlider')
slider.oninput = (e) => {
    console.log(e);
    const volume = e.target.value;
    player.volume = volume;
}

const updateProgress = () => {
    const progressBar = document.getElementById('progress');
    console.log(progressBar);
    progressBar.value = (player.currentTime / player.duration) * 100
}