const searchEl = document.querySelector('.search'); //document=HTML
const searchInputEl = searchEl.querySelector('input'); //앞에서 명시한 searchEl안에서 input요소를 찾음

searchEl.addEventListener('click', function () {
  //Logic.. 입력
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색'); 
  //searchInputEl부분에 어떤HTML속성을 지정한다.
  //첫번째 인수에는 속성이름을 두번째 인수에는 값을 지정.
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', ''); 
  //fous가 해제(블러)되면 placeholder에 빈문자값을 지정.
});


const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
// window : 브라우저 창, 탭, 윈도우 객체라고 부름. 보고있는 화면 자체
window.addEventListener('scroll' , _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    //배지숨기기
    //gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    //버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });
  } else {
    //배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    //버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300));
//_.throttle(함수, 시간)

toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, { /*window객체는 우리가 출력하는 화면 그 자체를 애니메이션 처리*/ 
    scrollTo: 0
  }); 
});


const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  //gsap.to(요소, 지속시간, 옵션);
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //0.7, 1.4, 2.1, 2.7 순차적으로 더해져서 반복
    opacity: 1
  });
});


//new키워드 = 생성자(클래스), 자바스크립트 문법으로 swiper라는 함수를 추가한다는 뜻
// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // 수직 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true // 반복 재생 여부
});
new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한 번에 보여줄 슬라이드 개수
  SpaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데에 보이기
  loop: true,
  // autoplay: {
  //   delay: 5000 //0.5초
  // }
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true //사용자의 페이지 번호 요소 제어
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});
new Swiper('.awards .swiper-container', {
  // direction: 'horizontal' 기본값으로 입력되어있어 따로 입력하지 않아도 됨.
  autoplay: true,
  loop: true,
  SpaceBetween: 30,
  slidesPerView: 5, //하나의 화면에 몇 개의 슬라이드들이 보일 것인지
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion //!뒷쪽의 값을 반대가 되게 만들어라, 특성 변수의 값을 지속적으로 반대값으로 변환.
  if (isHidePromotion) {
    //숨김 처리
    promotionEl.classList.add('hide');
  } else {
    //보임 처리
    promotionEl.classList.remove('hide');
  }
});


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject (selector, delay, size) {
  // gsap.to(요소, 지속시간, 옵션);
  gsap.to(
    selector, //선택자
    random(1.5, 2.5), //애니메이션 동작 시간
    { //옵션
    y: 20,
    repeat: -1, //무한반복
    yoyo: true,
    ease: Power1.easeInOut,
    delay: random(0, delay) //몇 초 뒤에 애니메이션을 실행하겠다. 지연시간
  });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy'); //section이라는 태그가 있는데 그 안에 scroll-spy라는 클래스가 들어있다면 찾아서 spyEls변수에 할당.
spyEls.forEach(function (spyEl) { //forEach라는 메소드로 각각의 요소들을 반복할 것이다. 반복될 때 실행된 함수를 지정. 익명함수 부분에 각각의 반복되는 spyEl를 가지고 뭔가를 할 것이다.
  new ScrollMagic //new라는 키워드 : 생성자 함수로 JavaScript에 있는 명령.
    .Scene({
      triggerElement: spyEl, //보여짐의 여부를 감시할 요소를 지정
      triggerHook: .8 //뷰포트가 어디에서 시작(0)해서 어디에서 끝나는지(1), 뷰포트의 0.8부분에 Hook이 걸려있기 때문에 해당 부분이 걸리면 setClassToggle()메소드가 실행.
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});
//Scene() 메소드 추가, ScrollMagic이라는 자바스크립트 라이브러리를 통해서 특정한 요소를 감시하는 옵션을 지정해주는 메소드.
//화면을 위, 아래로 스크롤 하면서 우리가 제어하려고 하는 특정한 섹션들이 지금 화면에 보아는지, 보이지 않는지를 이 라이브러리의 도움을 받아서 감시해야됨. 그 옵션들을 Scene()이라는 메소드에 추가
//메소드 체이닝을 통해 setClassToggle()이라는 메소드를 추가적으로 뒤에 붙여줄 수 있다.
//set(무엇인가를 지정할 것이다)Class(그것은 클래스다)Toggle(어떤 클래스를 넣었다 뺐다 제어해주는 역할)
//addTo() : ScrollMagic이라는 자바스크립트 라이브러리가 필요한 컨트롤러라는 개념의 내용을 추가하기 위해 해당 메소드를 사용해야 함.


const thisYear = document.querySelector('.this-year');
//extContent : 요소가 가지고 있는 글자 내용을 지정(하거나 알아내는 속성) '='기호를 통해 값을 지정.
thisYear.textContent = new Date().getFullYear(); //2022
