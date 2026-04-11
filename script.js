document.addEventListener("DOMContentLoaded", () => {


/*song data*/
const songs=[
    {
    title:"Run Down The City",
    artist:"Reble, Shashwat Sachdeva, Asha Bhosle",
    img:"dhurandhar.jpg",
    file:"rundownthecity.mpeg"
    },
    {
    title:"Balam Pichkari",
    artist:"Pritam",
    img:"balampichkari.jpg",
    file: "balampichkari.mpeg"
    },
    {
    title:"Blank Space",
    artist:"Taylor Swift",
    img:"blankspace.jpg",
    file:"blankspace.mpeg"
    },
    {
    title:"Vaari Jawan",
    artist:"Jasmine Sandlas, Jyoti Nooran, Reble",
    img:"dhurandhar2.jpg",
    file:"vaarijawan.mpeg"
    },
    {
    title:"Aari Aari",
    artist:"Shashwat Sachdeva, Reble, Jasmine Sandlas",
    img:"dhurandhar2.jpg",
    file:"dhurandhar1.mpeg"
    },
    
    {
    title:"Bad Blood",
    artist:"Taylor Swift",
    img:"reputation.jpg",
    file:"badblood.mpeg"
    }
];

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
const songcontainer=document.getElementById("songs");
songs.forEach(song=> {
    songcontainer.innerHTML += `
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
let isplaying= false;
/*play song when card clicked */
const cards=document.querySelectorAll(".card");
cards.forEach((card,index)=>{
    card.addEventListener("click",()=>{
        currentsong.src=songs[index].file;
        currentsong.play();

        isplaying=true;
        document.getElementById("playpause").innerText="⏸";
    });
});

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
        progress.value=(currentsong.currentTime/currentsong.duration)*100;
        
        progress.style.setProperty('--progress',percent +'%');
    }
});

progress.addEventListener("input", ()=>{
    currentsong.currentTime=(progress.value/100)*currentsong.duration;
});
const currentTimeEl = document.getElementById("currentTime");

currentSong.addEventListener("timeupdate", () => {

    let minutes = Math.floor(currentsong.currentTime / 60);
    let seconds = Math.floor(currentsong.currentTime % 60);

    if(seconds < 10) seconds = "0" + seconds;

    currentTimeEl.innerText = `${minutes}:${seconds}`;

});
});