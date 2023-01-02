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
    maxResults: 1,
    type: 'video',
    videoCategoryId: 10
}

/*

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

*/

// Lyrics Search Fetch URL

const chartLyricsURL = 'http://api.chartlyrics.com/apiv1.asmx/SearchLyricText?lyricText=';

function sendRequest(event) {
  event.preventDefault();
  var searchVal = encodeURIComponent($('#song').val());
  var searchFetch = chartLyricsURL + searchVal;
  var playlist = [];
  $.ajax({
    url: searchFetch,
    dataType: "xml",
    success: function(xml) {
      $('SearchLyricResult', xml).each(function(){
        var songResult = $('Song', this).text() + " by " + $('Artist', this).text();
        playlist.push(songResult);
      })
    },
  });
};

$('#songtitle').submit(sendRequest);