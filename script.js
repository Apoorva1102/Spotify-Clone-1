document.addEventListener("DOMContentLoaded", () => {
fetchSongs();

/*song data*/
async function fetchSongs(){
    try{
       const response = await fetch(
            "https://itunes.apple.com/search?term=taylor&entity=song&limit=20"
);
        const data=await response.json();
        console.log(data);
        songs=data.results.map(song=> ({
            title: song.trackName,
            artist: song.artistName,
            img: song.artworkUrl100.replace("100x100","600x600"),
            file: song.previewUrl
        })
        );
        renderSongs();
        
    }
    catch(error){
        console.error(error);
    }
}
let songs=[];


/*artist data*/
const artists=[
    {
    name:"Arijit Singh",
    img:"arijitsingh.jpg"
    },
    {
    name:"Taylor Swift",
    img:"taylorswift.jpg"
    },
    {
    name:"Justin Bieber",
    img:"justinbieber.jpg"
    },
    {
    name:"Jubin Nautiyal",
    img:"jubinnautiyal.jpg"
    },
];

/*render songs */


function renderSongs(){
    const songcontainer=document.getElementById("songs");
    songcontainer.innerHTML="";
    songs.forEach(song=>{
        songcontainer.innerHTML+=`
        <div class="card">
        <img src="${song.img}">
        <div class="playbtn">
        <i class="fa-solid fa-play"></i>
        </div>
        <p>${song.title}</p>
        <small>${song.artist}</small>
        </div>
         `;
    });
    attachSongListeners();
}

/*render artists */
const artistcontainer=document.getElementById("artists");
artists.forEach(artist=> {
    artistcontainer.innerHTML +=`
    <div class="artist">
    <img src="${artist.img}">
    <p>${artist.name}</p>
    </div>

    `;
})

let currentsong= new Audio();

const playerimg=document.getElementById("playerimg");
const playertitle=document.getElementById("playertitle");
const playerartist=document.getElementById("playerartist");

let isplaying= false;
/*play song when card clicked */
function attachSongListeners(){
    const cards= document.querySelectorAll(".card");
    cards.forEach((card,index)=>{
        card.addEventListener("click",()=>{
            currentsong.src=songs[index].file;
            currentsong.play();
            playerimg.src=songs[index].img;
            playertitle.innerText=songs[index].title;
            playerartist.innerText=songs[index].artist;
            playpausebtn.innerText="⏸";
        });
    });
}


const playpausebtn=document.getElementById("playpause");
playpausebtn.addEventListener("click", () => {
    if(!currentsong.src){
        console.log("No song selected");
        return;
    }
    if(currentsong.paused){
        currentsong.play();
        playpausebtn.innerText = "⏸";
    } else {
        currentsong.pause();
        playpausebtn.innerText = "▶";
    }

});


const progress=document.getElementById("progress");
currentsong.addEventListener("timeupdate",()=>{
    if(currentsong.duration){
        const percent=(currentsong.currentTime/currentsong.duration)*100;
        progress.value=percent 
        
        progress.style.setProperty('--progress',percent +'%');
    }
});

progress.addEventListener("input", ()=>{
    currentsong.currentTime=(progress.value/100)*currentsong.duration;
});
const currentTimeEl = document.getElementById("currentTime");

currentsong.addEventListener("timeupdate", () => {

    let minutes = Math.floor(currentsong.currentTime / 60);
    let seconds = Math.floor(currentsong.currentTime % 60);

    if(seconds < 10) seconds = "0" + seconds;

    currentTimeEl.innerText = `${minutes}:${seconds}`;

});
});

/* Search Bar */

const searchInput = document.querySelector(".search input");

searchInput.addEventListener("keypress", async (e) => {

    if (e.key === "Enter") {

        try {

            const query = searchInput.value;

            const response = await fetch(
             "https://itunes.apple.com/search?term=taylor&entity=song&limit=20"
);

            const data = await response.json();

            songs = data.result.map(song => ({
                title: song.trackName,
                artist: song.artistName,
                img: song.artworkUrl100,
                file: song.previewUrl
            }));

            renderSongs();

        } catch (error) {

            console.error(error);

        }

    }

});

