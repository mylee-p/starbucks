# Starbucks

![starbucks](https://user-images.githubusercontent.com/89143892/209923185-8527e71f-5bde-43f7-9bb6-f2ed8fc5faff.jpg)

---

<br />

## HTML / CSS / JavaScript를 활용해서 스타벅스 페이지 제작하기

<br />

### BEM(Block Element Modifier), HTML 클래스 속성의 작명법 사용하기

```js
<div class="container">
    <div class="name"></div>
    <div class="item">
        <div class="name"></div>
    </div>
</div>

//위의 코드를 Lodash 기호로 요소의 일부분을 표시
//CSS선택자를 통해 요소를 입력할 때 container 후손선택자로 사용할 경우
//item의 자식요소인 name도 같이 선택될 수 있기 때문에 정확하게 요소를 지칭

<div class="container">
    <div class="container__name"></div>
    <div class="item">
        <div class="item__name"></div>
    </div>
</div>
```

### lodash CDN, 스크롤할 때 생성되는 함수의 갯수 제어 <br />

-   head 태그에 script를 작성

```js
<script
    src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"
    integrity="sha512-WFN04846sdKMIP5LKNphMaWzU7YpMyCU245etK3g/2ARYbPK9Ub18eG+ljU96qKRCWh+quCY7yefSmlkQw1ANQ=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
></script>
```

-   \_.throttle(함수, 시간)을 이용해서 스크롤 과부하를 방지한다.

```js
window.addEventListener(
    "scroll",
    _.throttle(function () {
        console.log(window.scrollY);
        if (window.scrollY > 500) {
            badgeEl.style.display = "none";
        } else {
            badgeEl.style.display = "block";
        }
    }, 300)
);
```

### gsap CDN, 자바스크립트의 애니메이션 <br />

-   head 태그에 script를 작성

```js
<script
    src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"
    integrity="sha512-VEBjfxWUOyzl0bAwh4gdLEaQyDYPvLrZql3pw1ifgb6fhEvZl9iDDehwHZ+dsMzA0Jfww8Xt7COSZuJ/slxc4Q=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
></script>
```

-   gsap.to(요소, 지속시간, 옵션)으로 애니메이션 동작시키기 <br />

```js
window.addEventListener('scroll' , _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    gsap.to(badgeEl, .6, {
      opacity: 0
			display: 'none'
    });
  } else {
    badgeEl.style.display = 'block';
  }
}, 300));
```

### fade-in, 시간차 애니메이션 <br />

```css
/* css */
.visual .fade-in {
    opacity: 0;
}
```

```js
//js
const fadeEls = document.querySelectorAll(".visual .fade-in");
fadeEls.forEach(function (fadeEl, index) {
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * 0.7,
        //0.7, 1.4, 2.1, 2.7 순차적으로 더해져서 반복
        opacity: 1,
    });
});
```

### Swiper(slide), 자바스크립트 라이브러리 활용 <br />

```js
new Swiper(".notice-line .swiper-container", {
    direction: "vertical", // 수직 슬라이드
    autoplay: true, // 자동 재생 여부
    loop: true, // 반복 재생 여부
});
```

### IFrame Player API, 유튜브 영상 삽입 <br />

-   유트브 영상이 출력될 위치에 요소를 생성한다.

```html
<!-- html -->

<!-- in HEAD -->
<script defer src="./js/youtube.js"></script>

<!-- in BODY -->
<div id="player"></div>
```

-   onYouTubePlayerAPIReady 함수 이름은 Youtube IFrame Player API에서 사용하는 이름이기 때문에 다르게 지정하면 동작하지 않는다.

```js
//js

// Youtube IFrame API를 비동기로 로드
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubePlayerAPIReady() {
    new YT.Player("player", {
        videoId: "An6LvWQuj_8", // 재생할 유튜브 영상 ID
        playerVars: {
            autoplay: true, // 자동 재생 유무
            loop: true, // 반복 재생 유무
            playlist: "An6LvWQuj_8", // 반복 재생할 유튜브 영상 ID 목록
        },
        events: {
            // 영상이 준비되었을 때,
            onReady: function (event) {
                event.target.mute(); // 음소거!
            },
        },
    });
}
```

### 동영상 앞에 움직이는 애니메이션 삽입<br />

```js
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}
function floatingObject(selector, delay, size) {
    gsap.to(
        selector,
        random(1.5, 2.5), //애니메이션 동작 시간
        {
            //옵션
            y: size,
            repeat: -1, //무한반복
            yoyo: true,
            ease: power1.easeInOut,
            delay: ramdom(0, delay), //지연시간
        }
    );
}
floatingObject(".floating1", 1, 15);
floatingObject(".floating2", 0.5, 15);
floatingObject(".floating3", 1.5, 20);
```

### ScrollMagic API <br />

스크롤과 요소의 상호작용을 위한 자바스크립트 라이브러리 활용 <br />

-   head 태그에 script를 작성

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/ScrollMagic.min.js"></script>
```

-   대표적으로 어떤 요소가 현재 화면에 보이는 상태인지를 확인할 때 사용

```js
new ScrollMagic.Scene({
    triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
    triggerHook: 0.8, // 화면의 80% 지점에서 보여짐 여부 감시
})
    .setClassToggle(spyEl, "show") // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()); // 컨트롤러에 장면을 할당(필수!)
```

### Swiper, 다중(이미지) 슬라이드

```js
new Swiper(".awards .swiper-container", {
    autoplay: true,
    loop: true,
    SpaceBetween: 30,
    slidesPerView: 5, //하나의 화면에 몇 개의 슬라이드들이 보일 것인지
    navigation: {
        prevEl: ".awards .swiper-prev",
        nextEl: ".awards .swiper-next",
    },
});
```

### ScrollTo, 페이지 상단으로 이동

```js
const toTopEl = document.querySelector('#to-top');
// window : 브라우저 창, 탭, 윈도우 객체라고 부름. 보고있는 화면 자체
window.addEventListener('scroll' , _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
      .
      .
      .

    //버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });
  } else {
      .
      .
      .
    //버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300));
//_.throttle(함수, 시간)

toTopEl.addEventListener('click', function () {
    /*window객체는 우리가 출력하는 화면 그 자체를 애니메이션 처리*/
  gsap.to(window, .7, {
    scrollTo: 0
  });
});
```
