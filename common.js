const info1 = document.querySelector('.info1');
const info2 = document.querySelector('.info2');
const gifimg = document.querySelector('.gifimg');
const btn = document.querySelector('.btn');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const listCon = document.querySelector('.listCon');
let pageNo1;
let pageNo2;
let totalCount = 1;
// 곱하는 값이 0이면 항상 0이 나오기 때문에 1로 변경

// https://www.culture.go.kr/data/openapi/openapiView.do?id=594&category=D&gubun=A
const API_KEY = '8cf78c0b-0cc4-46a7-afd5-592bd909f94e';
// const API_KEY = 'd4024342-9c73-413a-b5d3-29bc0a7b03c1';

// 랜덤뽑기
btn.addEventListener('click', async () => {
  const h2Elements = document.querySelectorAll('h2');
  h2Elements.forEach((h2) => {
    h2.style.display = 'none';
  });

  const img3Element = document.querySelector('.img3');
  if (img3Element) {
    img3Element.parentNode.removeChild(img3Element);
  }
  const img4Element = document.querySelector('.img4');
  if (img4Element) {
    img4Element.parentNode.removeChild(img4Element);
  }

  pageNo1 = Math.floor(Math.random() * totalCount) + 1;
  getRandomData1(pageNo1);
  pageNo2 = Math.floor(Math.random() * totalCount) + 1;
  getRandomData2(pageNo2);
  const htmlimg = ` 
  <img class="gif1" src="./img/chungif.gif" alt="이미지1" />
  <img class="gif2" src="./img/chungif2.gif" alt="이미지2" />`;
  gifimg.innerHTML = htmlimg;
});

const getRandomData1 = async () => {
  try {
    const url = new URL(
      `http://api.kcisa.kr/openapi/API_TOU_052/request?serviceKey=${API_KEY}&numOfRows=1&pageNo=${pageNo1}`
    );

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    const data = await response.json();
    totalCount = Number(data.response.body.totalCount);
    const dataList = data.response.body.items.item;

    if (data.response.header.resultMsg !== 'OK') {
      throw new Error(data.response.header.resultMsg);
    }

    renderList1(dataList);
  } catch (error) {
    getRandomData1(pageNo1);
  }
};

const getRandomData2 = async () => {
  try {
    const url = new URL(
      `http://api.kcisa.kr/openapi/API_TOU_052/request?serviceKey=${API_KEY}&numOfRows=1&pageNo=${pageNo2}`
    );

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    const data = await response.json();
    totalCount = Number(data.response.body.totalCount);
    const dataList = data.response.body.items.item;

    if (data.response.header.resultMsg !== 'OK') {
      throw new Error(data.response.header.resultMsg);
    }

    renderList2(dataList);
  } catch (error) {
    getRandomData2(pageNo2);
  }
};

const renderList1 = (dataList) => {
  const storelist = dataList.map((data) => createHtml(data)).join('');
  info1.innerHTML = storelist;
};

const renderList2 = (dataList) => {
  const storelist = dataList.map((data) => createHtml(data)).join('');
  info2.innerHTML = storelist;
};

const createHtml = (data) => {
  let tel = data.tel || '연락처없음';
  let title = data.title || '자료없음';
  let category2 = data.category2 || '자료없음';
  let address = data.address || '자료없음';

  return `
         <p class="emph"><strong>음식점</strong> <span>${title}</span></p>
         <p><strong>종&nbsp&nbsp&nbsp류</strong> <span>${category2}</span></p>
         <p><strong>주&nbsp&nbsp&nbsp소</strong> <span>${address}</span></p>
         <p><strong>연락처</strong> <span>${tel}</span></p>
    `;
};

// 리스트

const getLatestlist = async () => {
  try {
    const pageNo3 = Math.floor(Math.random() * totalCount);
    const url = new URL(
      `http://api.kcisa.kr/openapi/API_TOU_052/request?serviceKey=${API_KEY}&numOfRows=10&pageNo=${pageNo3}`
    );
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    let RecommendList = data.response.body.items.item;
    renderData(RecommendList);
    // console.log(RecommendList);
  } catch (error) {
    getLatestlist(); //추가
  }
};

const renderData = (RecommendList) => {
  if (Array.isArray(RecommendList)) {
    const listHtml = RecommendList.map(
      (data) => `      
          <div class="swiper-slide slides">
          <p class="emph"><strong>음식점</strong><span>&nbsp${data.title}</span></p>
          <p><strong>종&nbsp&nbsp&nbsp류</strong><span>&nbsp${data.category2}</span></p>
          <p><strong>주&nbsp&nbsp&nbsp소</strong><span>&nbsp${data.address}</span></p>
          <p><strong>연락처</strong><span>&nbsp${data.tel}</span></p>
          </div>
      `
    ).join('');
    document.querySelector('.listCon').innerHTML = listHtml;
  }
};
getLatestlist();

//지도
// window.initMap = function () {
//   const map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: 37.5400456, lng: 126.9921017 },
//     zoom: 10,
//   });
// };

// 모달
var openModalBtn = document.getElementById('openModal');
var closeModalBtn = document.querySelector('.close i');
var modal = document.querySelector('.modal');

openModalBtn.onclick = function () {
  modal.style.display = 'block';
};
closeModalBtn.onclick = function (event) {
  event.stopPropagation();
  modal.style.display = 'none';
  document.documentElement.style = 'overflow : hidden';
};

//모달 외부클릭
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

//스와이퍼
var swiper = new Swiper('.mySwiper', {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

window.addEventListener('resize', function () {
  if (window.innerWidth <= 649) {
    swiper.params.slidesPerView = 2;
    swiper.update();
  } else {
    swiper.params.slidesPerView = 3;
    swiper.update();
  }
});
