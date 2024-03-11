const slide = document.querySelector(".slide");
let slideWidth = slide.clientWidth;

const prevBtn = document.querySelector(".slide_prev_button");
const nextBtn = document.querySelector(".slide_next_button");

let slideItems = document.querySelectorAll(".slide_item");
const maxSlide = slideItems.length;

let currSlide = 1;

// 페이지네이션 생성
const pagination = document.querySelector(".slide_pagination");

for (let i = 0; i < maxSlide; i++) {
  if (i === 0) pagination.innerHTML += `<li class="active">•</li>`;
  else pagination.innerHTML += `<li>•</li>`;
}

const paginationItems = document.querySelectorAll(".slide_pagination > li");

// 무한 슬라이드를 위해 start, end 슬라이드 복사하기
const startSlide = slideItems[0];
const endSlide = slideItems[slideItems.length - 1];
const startElem = document.createElement("div");
const endElem = document.createElement("div");

endSlide.classList.forEach((c) => endElem.classList.add(c));
endElem.innerHTML = endSlide.innerHTML;

startSlide.classList.forEach((c) => startElem.classList.add(c));
startElem.innerHTML = startSlide.innerHTML;

// 각 복제한 엘리먼트 추가하기
slideItems[0].before(endElem);
slideItems[slideItems.length - 1].after(startElem);

// 슬라이드 전체를 선택해 값을 변경해주기 위해 슬라이드 전체 선택하기
slideItems = document.querySelectorAll(".slide_item");
//
let offset = slideWidth + currSlide;
slideItems.forEach((i) => {
  i.setAttribute("style", `left: ${-offset}px`);
});

function nextMove() {
  currSlide++;
  // 마지막 슬라이드 이상으로 넘어가지 않게 하기 위해서
  if (currSlide <= maxSlide) {
    // 슬라이드를 이동시키기 위한 offset 계산
    const offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
    // 슬라이드 이동 시 현재 활성화된 pagination 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
  } else {
    // 무한 슬라이드 기능 - currSlide 값만 변경해줘도 되지만 시각적으로 자연스럽게 하기 위해 아래 코드 작성
    currSlide = 0;
    let offset = slideWidth * currSlide;
    slideItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });
    currSlide++;
    offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    setTimeout(() => {
      // 각 슬라이드 아이템의 left에 offset 적용
      slideItems.forEach((i) => {
        // i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset}px`);
      });
    }, 0);
    // // 슬라이드 이동 시 현재 활성화된 pagination 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
  }
}
function prevMove() {
  currSlide--;
  // 1번째 슬라이드 이하로 넘어가지 않게 하기 위해서
  if (currSlide > 0) {
    // 슬라이드를 이동시키기 위한 offset 계산
    const offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
    // 슬라이드 이동 시 현재 활성화된 pagination 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
  } else {
    // 무한 슬라이드 기능 - currSlide 값만 변경해줘도 되지만 시각적으로 자연스럽게 하기 위해 아래 코드 작성
    currSlide = maxSlide + 1;
    let offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });
    currSlide--;
    offset = slideWidth * currSlide;
    setTimeout(() => {
      // 각 슬라이드 아이템의 left에 offset 적용
      slideItems.forEach((i) => {
        // i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset}px`);
      });
    }, 0);
    // 슬라이드 이동 시 현재 활성화된 pagination 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
  }
}

// 버튼 엘리먼트에 클릭 이벤트 추가하기
nextBtn.addEventListener("click", () => {
  // 이후 버튼 누를 경우 현재 슬라이드를 변경
  nextMove();
});
// 버튼 엘리먼트에 클릭 이벤트 추가하기
prevBtn.addEventListener("click", () => {
  // 이전 버튼 누를 경우 현재 슬라이드를 변경
  prevMove();
});

// 브라우저 화면이 조정될 때 마다 slideWidth를 변경하기 위해
window.addEventListener("resize", () => {
  slideWidth = slide.clientWidth;
});

// 각 페이지네이션 클릭 시 해당 슬라이드로 이동하기
for (let i = 0; i < maxSlide; i++) {
  // 각 페이지네이션마다 클릭 이벤트 추가하기
  paginationItems[i].addEventListener("click", () => {
    // 클릭한 페이지네이션에 따라 현재 슬라이드 변경해주기(currSlide는 시작 위치가 1이기 때문에 + 1)
    currSlide = i + 1;
    // 슬라이드를 이동시키기 위한 offset 계산
    const offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
    // 슬라이드 이동 시 현재 활성화된 pagination 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
  });
}

// 드래그(스와이프) 이벤트를 위한 변수 초기화
let startPoint = 0;
let endPoint = 0;

// PC 클릭 이벤트 (드래그)
slide.addEventListener("mousedown", (e) => {
  startPoint = e.pageX; // 마우스 드래그 시작 위치 저장
});

slide.addEventListener("mouseup", (e) => {
  endPoint = e.pageX; // 마우스 드래그 끝 위치 저장
  if (startPoint < endPoint) {
    // 마우스가 오른쪽으로 드래그 된 경우
    prevMove();
  } else if (startPoint > endPoint) {
    // 마우스가 왼쪽으로 드래그 된 경우
    nextMove();
  }
});

// 모바일 터치 이벤트 (스와이프)
slide.addEventListener("touchstart", (e) => {
  startPoint = e.touches[0].pageX; // 터치가 시작되는 위치 저장
});
slide.addEventListener("touchend", (e) => {
  endPoint = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
  if (startPoint < endPoint) {
    // 오른쪽으로 스와이프 된 경우
    prevMove();
  } else if (startPoint > endPoint) {
    // 왼쪽으로 스와이프 된 경우
    nextMove();
  }
});

// 기본적으로 슬라이드 루프 시작하기
let loopInterval = setInterval(() => {
  nextMove();
}, 3000);

// 슬라이드에 마우스가 올라간 경우 루프 멈추기
slide.addEventListener("mouseover", () => {
  clearInterval(loopInterval);
});

// 슬라이드에서 마우스가 나온 경우 루프 재시작하기
slide.addEventListener("mouseout", () => {
  loopInterval = setInterval(() => {
    nextMove();
  }, 3000);
});

const slide_a = document.querySelector(".slide_a");
let slide_aWidth = slide_a.clientWidth;

const prevBtn_a = document.querySelector(".slide_a_prev_button");
const nextBtn_a = document.querySelector(".slide_a_next_button");

let slide_aItems = document.querySelectorAll(".slide_a_item");
const maxslide_a = slide_aItems.length;

let currslide_a = 1;

// 페이지네이션 생성
const pagination_a = document.querySelector(".slide_a_pagination_a");

for (let i = 0; i < maxslide_a; i++) {
  if (i === 0) pagination_a.innerHTML += `<li class="active">•</li>`;
  else pagination_a.innerHTML += `<li>•</li>`;
}

const pagination_aItems_a = document.querySelectorAll(
  ".slide_a_pagination_a > li",
);

// 무한 슬라이드를 위해 start, end 슬라이드 복사하기
const startslide_a = slide_aItems[0];
const endslide_a = slide_aItems[slide_aItems.length - 1];
const startElem_a = document.createElement("div");
const endElem_a = document.createElement("div");

endslide_a.classList.forEach((c) => endElem_a.classList.add(c));
endElem_a.innerHTML = endslide_a.innerHTML;

startslide_a.classList.forEach((c) => startElem_a.classList.add(c));
startElem_a.innerHTML = startslide_a.innerHTML;

slide_aItems[0].before(endElem_a);
slide_aItems[slide_aItems.length - 1].after(startElem_a);

slide_aItems = document.querySelectorAll(".slide_a_item");
let offset_a = slide_aWidth + currslide_a;
slide_aItems.forEach((i) => {
  i.setAttribute("style", `left: ${-offset_a}px`);
});

function nextMove_a() {
  currslide_a++;
  if (currslide_a <= maxslide_a) {
    const offset_a = slide_aWidth * currslide_a;
    slide_aItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset_a}px`);
    });
    pagination_aItems_a.forEach((i) => i.classList.remove("active"));
    pagination_aItems_a[currslide_a - 1].classList.add("active");
  } else {
    currslide_a = 0;
    let offset_a = slide_aWidth * currslide_a;
    slide_aItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset_a}px`);
    });
    currslide_a++;
    offset_a = slide_aWidth * currslide_a;
    setTimeout(() => {
      slide_aItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset_a}px`);
      });
    }, 0);
    pagination_aItems_a.forEach((i) => i.classList.remove("active"));
    pagination_aItems_a[currslide_a - 1].classList.add("active");
  }
}
function prevMove_a() {
  currslide_a--;
  if (currslide_a > 0) {
    const offset_a = slide_aWidth * currslide_a;
    slide_aItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset_a}px`);
    });
    pagination_aItems_a.forEach((i) => i.classList.remove("active"));
    pagination_aItems_a[currslide_a - 1].classList.add("active");
  } else {
    currslide_a = maxslide_a + 1;
    let offset_a = slide_aWidth * currslide_a;
    slide_aItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset_a}px`);
    });
    currslide_a--;
    offset_a = slide_aWidth * currslide_a;
    setTimeout(() => {
      slide_aItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset_a}px`);
      });
    }, 0);
    pagination_aItems_a.forEach((i) => i.classList.remove("active"));
    pagination_aItems_a[currslide_a - 1].classList.add("active");
  }
}

nextBtn_a.addEventListener("click", () => {
  nextMove_a();
});
prevBtn_a.addEventListener("click", () => {
  prevMove_a();
});

window.addEventListener("resize", () => {
  slide_aWidth = slide_a.clientWidth;
});

for (let i = 0; i < maxslide_a; i++) {
  pagination_aItems_a[i].addEventListener("click", () => {
    currslide_a = i + 1;
    const offset_a = slide_aWidth * currslide_a;
    slide_aItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset_a}px`);
    });
    pagination_aItems_a.forEach((i) => i.classList.remove("active"));
    pagination_aItems_a[currslide_a - 1].classList.add("active");
  });
}

let startPoint_a = 0;
let endPoint_a = 0;

// PC 클릭 이벤트 (드래그)
slide_a.addEventListener("mousedown", (e) => {
  startPoint_a = e.pageX; // 마우스 드래그 시작 위치 저장
});

slide_a.addEventListener("mouseup", (e) => {
  endPoint_a = e.pageX; // 마우스 드래그 끝 위치 저장
  if (startPoint_a < endPoint_a) {
    // 마우스가 오른쪽으로 드래그 된 경우
    prevMove_a();
  } else if (startPoint_a > endPoint_a) {
    // 마우스가 왼쪽으로 드래그 된 경우
    nextMove_a();
  }
});

// 모바일 터치 이벤트 (스와이프)
slide_a.addEventListener("touchstart", (e) => {
  startPoint_a = e.touches[0].pageX; // 터치가 시작되는 위치 저장
});
slide_a.addEventListener("touchend", (e) => {
  endPoint_a = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
  if (startPoint_a < endPoint_a) {
    // 오른쪽으로 스와이프 된 경우
    prevMove_a();
  } else if (startPoint_a > endPoint_a) {
    // 왼쪽으로 스와이프 된 경우
    nextMove_a();
  }
});

// 기본적으로 슬라이드 루프 시작하기
let loopInterval_a = setInterval(() => {
  nextMove_a();
}, 3000);

// 슬라이드에 마우스가 올라간 경우 루프 멈추기
slide_a.addEventListener("mouseover", () => {
  clearInterval(loopInterval_a);
});

// 슬라이드에서 마우스가 나온 경우 루프 재시작하기
slide_a.addEventListener("mouseout", () => {
  loopInterval_a = setInterval(() => {
    nextMove_a();
  }, 3000);
});

const slide_b = document.querySelector(".slide_b");
let slide_bWidth = slide_b.clientWidth;

const prevBtn_b = document.querySelector(".slide_b_prev_button");
const nextBtn_b = document.querySelector(".slide_b_next_button");

let slide_bItems = document.querySelectorAll(".slide_b_item");
const maxslide_b = slide_bItems.length;

let currslide_b = 1;

// 페이지네이션 생성
const pagination_b = document.querySelector(".slide_b_pagination_b");

for (let i = 0; i < maxslide_b; i++) {
  if (i === 0) pagination_b.innerHTML += `<li class="active">•</li>`;
  else pagination_b.innerHTML += `<li>•</li>`;
}

const pagination_bItems_b = document.querySelectorAll(
  ".slide_b_pagination_b > li",
);

// 무한 슬라이드를 위해 start, end 슬라이드 복사하기
const startslide_b = slide_bItems[0];
const endslide_b = slide_bItems[slide_bItems.length - 1];
const startElem_b = document.createElement("div");
const endElem_b = document.createElement("div");

endslide_b.classList.forEach((c) => endElem_b.classList.add(c));
endElem_b.innerHTML = endslide_b.innerHTML;

startslide_b.classList.forEach((c) => startElem_b.classList.add(c));
startElem_b.innerHTML = startslide_b.innerHTML;

slide_bItems[0].before(endElem_b);
slide_bItems[slide_bItems.length - 1].after(startElem_b);

slide_bItems = document.querySelectorAll(".slide_b_item");
let offset_b = slide_bWidth + currslide_b;
slide_bItems.forEach((i) => {
  i.setAttribute("style", `left: ${-offset_b}px`);
});

function nextMove_b() {
  currslide_b++;
  if (currslide_b <= maxslide_b) {
    const offset_b = slide_bWidth * currslide_b;
    slide_bItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset_b}px`);
    });
    pagination_bItems_b.forEach((i) => i.classList.remove("active"));
    pagination_bItems_b[currslide_b - 1].classList.add("active");
  } else {
    currslide_b = 0;
    let offset_b = slide_bWidth * currslide_b;
    slide_bItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset_b}px`);
    });
    currslide_b++;
    offset_b = slide_bWidth * currslide_b;
    setTimeout(() => {
      slide_bItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset_b}px`);
      });
    }, 0);
    pagination_bItems_b.forEach((i) => i.classList.remove("active"));
    pagination_bItems_b[currslide_b - 1].classList.add("active");
  }
}
function prevMove_b() {
  currslide_b--;
  if (currslide_b > 0) {
    const offset_b = slide_bWidth * currslide_b;
    slide_bItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset_b}px`);
    });
    pagination_bItems_b.forEach((i) => i.classList.remove("active"));
    pagination_bItems_b[currslide_b - 1].classList.add("active");
  } else {
    currslide_b = maxslide_b + 1;
    let offset_b = slide_bWidth * currslide_b;
    slide_bItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset_b}px`);
    });
    currslide_b--;
    offset_b = slide_bWidth * currslide_b;
    setTimeout(() => {
      slide_bItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset_b}px`);
      });
    }, 0);
    pagination_bItems_b.forEach((i) => i.classList.remove("active"));
    pagination_bItems_b[currslide_b - 1].classList.add("active");
  }
}

nextBtn_b.addEventListener("click", () => {
  nextMove_b();
});
prevBtn_b.addEventListener("click", () => {
  prevMove_b();
});

window.addEventListener("resize", () => {
  slide_bWidth = slide_b.clientWidth;
});

for (let i = 0; i < maxslide_b; i++) {
  pagination_bItems_b[i].addEventListener("click", () => {
    currslide_b = i + 1;
    const offset_b = slide_bWidth * currslide_b;
    slide_bItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset_b}px`);
    });
    pagination_bItems_b.forEach((i) => i.classList.remove("active"));
    pagination_bItems_b[currslide_b - 1].classList.add("active");
  });
}

let startPoint_b = 0;
let endPoint_b = 0;

// PC 클릭 이벤트 (드래그)
slide_b.addEventListener("mousedown", (e) => {
  startPoint_b = e.pageX; // 마우스 드래그 시작 위치 저장
});

slide_b.addEventListener("mouseup", (e) => {
  endPoint_b = e.pageX; // 마우스 드래그 끝 위치 저장
  if (startPoint_b < endPoint_b) {
    // 마우스가 오른쪽으로 드래그 된 경우
    prevMove_b();
  } else if (startPoint_b > endPoint_b) {
    // 마우스가 왼쪽으로 드래그 된 경우
    nextMove_b();
  }
});

// 모바일 터치 이벤트 (스와이프)
slide_b.addEventListener("touchstart", (e) => {
  startPoint_b = e.touches[0].pageX; // 터치가 시작되는 위치 저장
});
slide_b.addEventListener("touchend", (e) => {
  endPoint_b = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
  if (startPoint_b < endPoint_b) {
    // 오른쪽으로 스와이프 된 경우
    prevMove_b();
  } else if (startPoint_b > endPoint_b) {
    // 왼쪽으로 스와이프 된 경우
    nextMove_b();
  }
});

// 기본적으로 슬라이드 루프 시작하기
let loopInterval_b = setInterval(() => {
  nextMove_b();
}, 3000);

// 슬라이드에 마우스가 올라간 경우 루프 멈추기
slide_b.addEventListener("mouseover", () => {
  clearInterval(loopInterval_b);
});

// 슬라이드에서 마우스가 나온 경우 루프 재시작하기
slide_b.addEventListener("mouseout", () => {
  loopInterval_b = setInterval(() => {
    nextMove_b();
  }, 3000);
});

const slide_d = document.querySelector(".slide_d");
let slide_dWidth = slide_d.clientWidth;

const prevBtn_d = document.querySelector(".slide_d_prev_dutton");
const nextBtn_d = document.querySelector(".slide_d_next_dutton");

let slide_dItems = document.querySelectorAll(".slide_d_item");
const maxslide_d = slide_dItems.length;

let currslide_d = 1;

// 페이지네이션 생성
const pagination_d = document.querySelector(".slide_d_pagination_d");

for (let i = 0; i < maxslide_d; i++) {
  if (i === 0) pagination_d.innerHTML += `<li class="active">•</li>`;
  else pagination_d.innerHTML += `<li>•</li>`;
}

const pagination_dItems_d = document.querySelectorAll(
  ".slide_d_pagination_d > li",
);

// 무한 슬라이드를 위해 start, end 슬라이드 복사하기
const startslide_d = slide_dItems[0];
const endslide_d = slide_dItems[slide_dItems.length - 1];
const startElem_d = document.createElement("div");
const endElem_d = document.createElement("div");

endslide_d.classList.forEach((c) => endElem_d.classList.add(c));
endElem_d.innerHTML = endslide_d.innerHTML;

startslide_d.classList.forEach((c) => startElem_d.classList.add(c));
startElem_d.innerHTML = startslide_d.innerHTML;

slide_dItems[0].before(endElem_d);
slide_dItems[slide_dItems.length - 1].after(startElem_d);

slide_dItems = document.querySelectorAll(".slide_d_item");
let offset_d = slide_dWidth + currslide_d;
slide_dItems.forEach((i) => {
  i.setAttribute("style", `left: ${-offset_d}px`);
});

function nextMove_d() {
  currslide_d++;
  if (currslide_d <= maxslide_d) {
    const offset_d = slide_dWidth * currslide_d;
    slide_dItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset_d}px`);
    });
    pagination_dItems_d.forEach((i) => i.classList.remove("active"));
    pagination_dItems_d[currslide_d - 1].classList.add("active");
  } else {
    currslide_d = 0;
    let offset_d = slide_dWidth * currslide_d;
    slide_dItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset_d}px`);
    });
    currslide_d++;
    offset_d = slide_dWidth * currslide_d;
    setTimeout(() => {
      slide_dItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset_d}px`);
      });
    }, 0);
    pagination_dItems_d.forEach((i) => i.classList.remove("active"));
    pagination_dItems_d[currslide_d - 1].classList.add("active");
  }
}
function prevMove_d() {
  currslide_d--;
  if (currslide_d > 0) {
    const offset_d = slide_dWidth * currslide_d;
    slide_dItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset_d}px`);
    });
    pagination_dItems_d.forEach((i) => i.classList.remove("active"));
    pagination_dItems_d[currslide_d - 1].classList.add("active");
  } else {
    currslide_d = maxslide_d + 1;
    let offset_d = slide_dWidth * currslide_d;
    slide_dItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset_d}px`);
    });
    currslide_d--;
    offset_d = slide_dWidth * currslide_d;
    setTimeout(() => {
      slide_dItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset_d}px`);
      });
    }, 0);
    pagination_dItems_d.forEach((i) => i.classList.remove("active"));
    pagination_dItems_d[currslide_d - 1].classList.add("active");
  }
}

nextBtn_d.addEventListener("click", () => {
  nextMove_d();
});
prevBtn_d.addEventListener("click", () => {
  prevMove_d();
});

window.addEventListener("resize", () => {
  slide_dWidth = slide_d.clientWidth;
});

for (let i = 0; i < maxslide_d; i++) {
  pagination_dItems_d[i].addEventListener("click", () => {
    currslide_d = i + 1;
    const offset_d = slide_dWidth * currslide_d;
    slide_dItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset_d}px`);
    });
    pagination_dItems_d.forEach((i) => i.classList.remove("active"));
    pagination_dItems_d[currslide_d - 1].classList.add("active");
  });
}

let startPoint_d = 0;
let endPoint_d = 0;

// PC 클릭 이벤트 (드래그)
slide_d.addEventListener("mousedown", (e) => {
  startPoint_d = e.pageX; // 마우스 드래그 시작 위치 저장
});

slide_d.addEventListener("mouseup", (e) => {
  endPoint_d = e.pageX; // 마우스 드래그 끝 위치 저장
  if (startPoint_d < endPoint_d) {
    // 마우스가 오른쪽으로 드래그 된 경우
    prevMove_d();
  } else if (startPoint_d > endPoint_d) {
    // 마우스가 왼쪽으로 드래그 된 경우
    nextMove_d();
  }
});

// 모바일 터치 이벤트 (스와이프)
slide_d.addEventListener("touchstart", (e) => {
  startPoint_d = e.touches[0].pageX; // 터치가 시작되는 위치 저장
});
slide_d.addEventListener("touchend", (e) => {
  endPoint_d = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
  if (startPoint_d < endPoint_d) {
    // 오른쪽으로 스와이프 된 경우
    prevMove_d();
  } else if (startPoint_d > endPoint_d) {
    // 왼쪽으로 스와이프 된 경우
    nextMove_d();
  }
});

// 기본적으로 슬라이드 루프 시작하기
let loopInterval_d = setInterval(() => {
  nextMove_d();
}, 3000);

// 슬라이드에 마우스가 올라간 경우 루프 멈추기
slide_d.addEventListener("mouseover", () => {
  clearInterval(loopInterval_d);
});

// 슬라이드에서 마우스가 나온 경우 루프 재시작하기
slide_d.addEventListener("mouseout", () => {
  loopInterval_d = setInterval(() => {
    nextMove_d();
  }, 3000);
});
