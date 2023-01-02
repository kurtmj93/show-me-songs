// grab HTML elements using JQuery & store them in variables

let searchbarEl = $('#search-bar');
let searchresultsEl = $('#search-results');

// YOUTUBE API CONSTANTS
const youtubeKey = 'AIzaSyATkg7QM97WIyQkUHHEnw1NXMx4dhDruuA';
const searchURL = 'https://youtube.googleapis.com/youtube/v3/search'

// YOUTUBE SEARCH API REQUEST OPTIONS
var optionsYT = {
    q: '',
    part: 'snippet',
    key: youtubeKey,
    maxResults: 1,
    type: 'video',
    videoCategoryId: 10
}

// Lyrics Search Fetch URL

const chartLyricsURL = 'http://api.chartlyrics.com/apiv1.asmx/SearchLyricText?lyricText=';

function sendRequest(event) {
  event.preventDefault();
  // encode text entry as HTML to append to chartLyricsURL 
  var searchVal = encodeURIComponent($('#song').val());
  var searchFetch = chartLyricsURL + searchVal;
  // create playlist array to store results
  var playlist = [];
  searchresultsEl.empty();
  $.ajax({
    url: searchFetch,
    dataType: "xml",
    success: function(xml) {
      // for each SearchLyricResult returned, push string of title and into playlist array
      $('SearchLyricResult', xml).each(function(){
        var songResult = $('Song', this).text() + " by " + $('Artist', this).text();
        playlist.push(songResult);
      });
      for (i=0; i<5; i++) {
          optionsYT.q = playlist[i];
          $.getJSON(searchURL, optionsYT, function(data){
              var vidThumb = data.items[0].snippet.thumbnails.medium.url;
              var vidTitle = data.items[0].snippet.title;
              var vidId = data.items[0].id.videoId;
              console.log(vidTitle);
              searchresultsEl.append(`
                  <article class="video" data-key="${vidId}">
                  <a href="https://www.youtube.com/watch?v=${vidId}">
                  <img src="${vidThumb}" class="thumb">
                  <div class="info">
                  <h3>${vidTitle}</h3></a>
                  </div>
                  </article>
              `);});
      };
  },});
};

$('#songtitle').submit(sendRequest);