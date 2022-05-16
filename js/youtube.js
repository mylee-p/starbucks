// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  // <div id="player"></div>
  new YT.Player('player', {
    videoId: 'An6LvWQuj_8', //최초 재생할 유튜브 영상 ID
    playerVars: { //영상을 재생하기 위한 여러가지 변수들
      autoplay: true, // 자동 재생 유무
      loop: true, // 반복 재생 유무
      playlist: 'An6LvWQuj_8' // 반복 재생할 유튜브 영상 ID 목록
    },
    events: { // 객체데이터 내부에 함수데이터가 할당되어 있는 것 : 메소드
      onReady: function (event) { //onReady라는 메소드가 실행되면 어떻게 처리 할 것인가, 함수내에서 event라는 매개변수의 이름으로 받아서 함수 내부에서 활용해서 사용.
        event.target.mute() //음소거
      }
    }
  });
}