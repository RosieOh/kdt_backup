package com.kdt.landing.domain.home;

import com.kdt.landing.domain.member.repository.MemberRepository;
import com.kdt.landing.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;


@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeController {
    private final MemberRepository memberRepository;
    private final MemberService memberService;



    //jsp index
    public String home(Principal principal,Model model) {
        memberService.createAdminMember(); // 관리자 회원 생성 메서드 호출
        return "/index";
    }

    @GetMapping("/subSign")
    public String subSign(Model model) {
        return "main/sign/subSign";
    }

    @GetMapping("/java")
    public String fullStack(Model model) {
        return "sub/fullstack";
    }
<<<<<<< HEAD:src/main/java/com/kdt/landing/global/Rest/HomeController.java
    @GetMapping("/bigdata")
    public String bigdata(Model model) {
        return "sub/bigdata";
    }
    @GetMapping("/pm")
    public String pm(Model model) {
=======

    @GetMapping("/data")
    public String subBigData(Model model) {
        return "sub/bigdata";
    }

    @GetMapping("/pm")
    public String subPm(Model model) {
>>>>>>> 85b3abeceedf8dd274f9a110029fe667be9b1e37:src/main/java/com/kdt/landing/domain/home/HomeController.java
        return "sub/pm";
    }
}