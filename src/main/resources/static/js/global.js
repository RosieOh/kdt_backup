//이메일
var code = "";

function PostEmail() {
  // alert("이메일이 전송중입니다. 잠시만 기다려주세요.")

  let params = { email: $("#email").val() };
  $("#email").attr("readonly", "readonly");
  $(this).css("background-color", "darkgray");

  $.ajax({
    url: "/email", //아이디가 전송되어질 곳
    type: "post",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success: function (mail) {
      code = mail.code;
      alert("인증번호가 전송되었습니다.");
      $("#PostEmailbtn").css("display", "none");
      $(".insubForm").css("display", "block");
    },
    error: function (err) {
      alert("인증번호 전송에 실패하였습니다.");
      $("#email").attr("readonly", false);
      $("#email").focus();
    },
  });
}
function Insub() {
  var insub = $("#insub").val();

  if (insub == code) {
    alert("인증번호가 일치합니다.");
    $("#emailCK").val("Yes");
    $(".insubForm").css("display", "none");
  } else {
    alert("인증번호가 일치하지 않습니다.");
    $("#insub").focus();
  }
}

function Insubreset() {
  $("#PostEmailbtn").css("display", "block");
  $(".insubForm").css("display", "none");
  $("#email").attr("readonly", false);
}

// 회원가입 정보를 서버로 전송하는 함수
function submitForm() {
  // 폼 데이터를 직렬화하여 서버에 전송
  $.ajax({
    url: "${path}/member/joinPro",
    type: "POST",
    data: $("#joinForm").serialize(), // 폼 데이터 직렬화
    success: function (response) {
      // 서버로부터의 응답 처리
      alert("회원가입이 완료되었습니다.");
      // 회원가입이 성공하면 다음 동작을 수행
      // 예) 로그인 페이지로 이동
      window.location.href = "${path}/member/login";
    },
    error: function (xhr, status, error) {
      // 서버로부터의 오류 처리
      alert("회원가입 중 오류가 발생했습니다.");
      console.error(error);
    },
  });
}

// 사전신청 레이아웃 열기/닫기
$(document).ready(function () {
  $("#ban_btn").click(function () {
    $(".sign_form_back").css("display", "block");
  });
  $("#close_btn").click(function () {
    $(".sign_form_back").css("display", "none");
  });
});

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 250) {
      $("#gotop").show();
    } else {
      $("#gotop").hide();
    }
  });
});

// 개인정보 이용 동의 열기/닫기
$(document).ready(function () {
  $(".agree ")
    .off("click")
    .on("click", function () {
      $(this).find(".scroll_wrap").slideToggle();

      if ($(this).find(".toggle").hasClass("open")) {
        $(this).find(".toggle").text("▼ 내용보기").removeClass("open");
      } else {
        $(this).find(".toggle").text("▲ 닫기").addClass("open");
      }
    });
});

// 개인정보 이용 동의 체크
function agree() {
  if ($("#sign_chek:checked").length == 0) {
    alert("개인정보 수집·이용 및 제공에 동의해주세요.");
    return false;
  }
}
// 내용 열기/닫기 및 글자수 제한

// 텍스트 열기/닫기
$(document).ready(function () {
  $(".paper ")
    .off("click")
    .on("click", function () {
      $(this).find(".scroll_wrap").slideToggle();

      if ($(this).find(".toggle").hasClass("open")) {
        $(this).find(".toggle").text("▼ 내용보기").removeClass("open");
      } else {
        $(this).find(".toggle").text("▲ 닫기").addClass("open");
      }
    });
});

//자기 소개서 1

$(document).ready(function () {
  $("#paperText1").keyup(function (e) {
    var content = $(this).val();

    if (content.length == 0 || content == "") {
      $("#paperCount1 span").text("0");
    } else {
      $("#paperCount1 span").text(content.length);
    }
    if (content.length > 250) {
      $(this).val($(this).val().substring(0, 250));
      alert("글자수는 500자까지 입력 가능합니다.");
    }
  });
});

$(document).ready(function () {
  $("#paperText2").keyup(function (e) {
    var content = $(this).val();

    if (content.length == 0 || content == "") {
      $("#paperCount2 span").text("0");
    } else {
      $("#paperCount2 span").text(content.length);
    }
    if (content.length > 250) {
      $(this).val($(this).val().substring(0, 250));
      alert("글자수는 500자까지 입력 가능합니다.");
    }
  });
});

$(document).ready(function () {
  $("#paperText3").keyup(function (e) {
    var content = $(this).val();

    if (content.length == 0 || content == "") {
      $("#paperCount3 span").text("0");
    } else {
      $("#paperCount3 span").text(content.length);
    }
    if (content.length > 250) {
      $(this).val($(this).val().substring(0, 250));
      alert("글자수는 500자까지 입력 가능합니다.");
    }
  });
});

// header burger
(function () {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function () {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

// carousel
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let index = 0;

prevButton.addEventListener('click', () => {
  if (index === 0) return;
  index -= 1;
  carousel.style.transform= `translate3d(-${500 * index}px, 0, 0`;
});

nextButton.addEventListener('click', () => {
  if (index === 2) return;
  index += 1;

  carousel.style.transform= `translate3d(-${500 * index}px, 0, 0`;
});

