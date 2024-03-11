var code = "";

function PostEmail(){
    // alert("이메일이 전송중입니다. 잠시만 기다려주세요.")

    let params = {"email" : $("#email").val()};
    $("#email").attr("readonly","readonly");
    $(this).css("background-color","darkgray")

    $.ajax({
        url:"/email",	//아이디가 전송되어질 곳
        type:"post",
        data:JSON.stringify(params),
        dataType:"json",
        contentType:"application/json",
        success : function(mail) {
            code = mail.code;
            alert("인증번호가 전송되었습니다.");
            $("#PostEmailbtn").css("display", "none")
            $(".insubForm").css("display", "block");
        }, error : function (err) {
            alert("인증번호 전송에 실패하였습니다.");
            $("#email").attr("readonly", false);
            $("#email").focus();

        }
    });
}
function Insub() {

    var insub = $("#insub").val();

    if(insub == code){
        alert("인증번호가 일치합니다.")
        $("#emailCK").val("Yes")
        $(".insubForm").css("display", "none");
    } else {
        alert("인증번호가 일치하지 않습니다.")
        $("#insub").focus();
    }
}

function Insubreset(){
    $("#PostEmailbtn").css("display", "block")
    $(".insubForm").css("display", "none");
    $("#email").attr("readonly", false);
}

    // 회원가입 정보를 서버로 전송하는 함수
    function submitForm() {
    // 폼 데이터를 직렬화하여 서버에 전송
    $.ajax({
        url: "/member/joinPro",
        type: "POST",
        data: $("#joinForm").serialize(), // 폼 데이터 직렬화
        success: function(response) {
            // 서버로부터의 응답 처리
            alert("회원가입이 완료되었습니다.");
            // 회원가입이 성공하면 다음 동작을 수행
            // 예) 로그인 페이지로 이동
            window.location.href = "/member/login";
        },
        error: function(xhr, status, error) {
            // 서버로부터의 오류 처리
            alert("회원가입 중 오류가 발생했습니다.");
            console.error(error);
        }
    });
}