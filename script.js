// grab HTML elements using JQuery & store them in variables

let searchbarEl = $('#search-bar');
let searchresultsEl = $('#search-results');

// YOUTUBE API CONSTANTS
const youtubeKey = 'AIzaSyBwJo04Cg2kxSrYJ9gVy4S-3JQqDIHkqZ8';
const searchURL = 'https://youtube.googleapis.com/youtube/v3/search'

// MusixMatch API Constants
const musixMatchKey = '4bf14d6e04db8041bfd1bcad66b37a84'
const getURL = 'https://api.musixmatch.com/ws/1.1/'

// YOUTUBE SEARCH API REQUEST OPTIONS
let options = {
    q: '',
    part: 'snippet',
    key: youtubeKey,
    maxResults: 10,
    type: 'video',
    videoCategoryId: 10
}

function sendRequest(event) {
    event.preventDefault();
    options.q = $('#song').val();
    console.log(options);
    $.getJSON(searchURL, options, function(data){
        searchresultsEl.empty();
        console.log(data);
        requestLoop(data);
    })
  }

  function requestLoop(data) {

    $.each(data.items, function(i, item){
        var vidThumb = item.snippet.thumbnails.medium.url;
        var vidTitle = item.snippet.title;
        var vidDesc = item.snippet.description.substring(0, 200);
        var vidId = item.id.videoId;

        searchresultsEl.append(`
            <article class="video" data-key="${vidId}">
            <a href="https://www.youtube.com/watch?v=${vidId}">
            <img src="${vidThumb}" class="thumb">
            <div class="info">
            <h3>${vidTitle}</h3></a>
            <p>${vidDesc}</p>
            </div>
            </article>
        `);
    });
  }

  $('#songtitle').submit(sendRequest);


// MusixMatch lyrics search
$.ajax({
    url: getURL,
    key: musixMatchKey,
    method: 'GET',
    q_lyrics: '',
  }).then(function (response) {
    console.log('Ajax Reponse \n-------------');
    console.log(response);
  });

// Search bar event listener

var searcher = document.querySelector('#search-bar')

  searcher.addEventListener('submit', function() {
    event.preventDefault();
    searchValue =searcher.value;
});

async function searchSong(searchValue){
    const searchResult = await fetch(`${url}/suggest/${sea}`)
    const data = await searchResult.json();
    
    showData(data)
}