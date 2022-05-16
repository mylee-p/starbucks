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


const thisYear = document.querySelector('.this-year');
//extContent : 요소가 가지고 있는 글자 내용을 지정(하거나 알아내는 속성) '='기호를 통해 값을 지정.
thisYear.textContent = new Date().getFullYear(); //2022