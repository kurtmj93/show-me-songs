// grab HTML elements using JQuery & store them in variables

let searchbarEl = $('#search-bar');
let searchresultsEl = $('#search-results');

// YOUTUBE API CONSTANTS
const youtubeKey = 'AIzaSyATkg7QM97WIyQkUHHEnw1NXMx4dhDruuA';
const searchURL = 'https://youtube.googleapis.com/youtube/v3/search'

// YOUTUBE SEARCH API REQUEST OPTIONS

var playlist;

var optionsYT = {
    q: '',
    part: 'snippet',
    key: youtubeKey,
    maxResults: 1,
    type: 'video',
    videoCategoryId: 10
};

// Chart Lyrics API Fetch URL - no key necessary
const chartLyricsURL = 'https://api.chartlyrics.com/apiv1.asmx/SearchLyricText?lyricText=';

function sendRequest(event) {
  event.preventDefault();
  // encode text entry as HTML to append to chartLyricsURL 
  var playlistName = $('#lyrics').val()
  var encodeSearch = encodeURIComponent(playlistName);
  var searchFetch = chartLyricsURL + encodeSearch;
  // create playlist array to store results
  searchresultsEl.empty();
  $.ajax({
    url: searchFetch,
    dataType: "xml",
    success: function(xml) {
      // for each SearchLyricResult returned, push string of title and into playlist array
      playlist = [];
      $('SearchLyricResult', xml).each(function(){
        var songResult = $('Song', this).text() + " by " + $('Artist', this).text();
        playlist.push(songResult);
      });
      // store array in localStorage with name from search
      localStorage.setItem('playlist', JSON.stringify(playlist));
      localStorage.setItem('name', playlistName);
      showPlaylist();
      },
  })
};

function showPlaylist() {
  // checks if playlist exists in localStorage
  if (localStorage.getItem('playlist') !== null) {
    $('#playlistname').text(localStorage.getItem('name'));
    playlist = JSON.parse(localStorage.getItem('playlist'));
    for (i=0; i<5; i++) {
      optionsYT.q = playlist[i];
      $.getJSON(searchURL, optionsYT, function(data){
          var vidThumb = data.items[0].snippet.thumbnails.medium.url;
          var vidId = data.items[0].id.videoId;
          var vidTitle = data.items[0].snippet.title;
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
  } else {
    return;
  }
};

$('#songlyrics').submit(sendRequest);

// show playlst on ready
$(function(){
  showPlaylist();
});