package com.kdt.landing.domain.subject.controller;

import com.kdt.landing.domain.subject.dto.SubjectDTO;
import com.kdt.landing.domain.subject.service.SubjectService;
import com.kdt.landing.global.cosntant.Course;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Log4j2
@Controller
@RequestMapping("/subject")
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectService subFullStackService;


    // 풀스택 등록
    //리스트
    @GetMapping("/list")
    public String applyList(Model model) throws Exception{
        List<SubjectDTO> subDTOList = subFullStackService.findAll();
        model.addAttribute("subDTOList", subDTOList);
        return "/sub/list";
    }

    //등록
    @PostMapping("/register")
    public String applyRegister(Model model, Course course, SubjectDTO subDTO)throws Exception{
        subDTO.setCourse(course);
        subFullStackService.register(subDTO);
        return "main/sign/complete_apply";
    }

    //상태변경
    @PostMapping("/statusModify")
    public String applyStatus(Model model, SubjectDTO subDTO) throws Exception{
        subFullStackService.modify(subDTO);
        return "redirect:/";
    }


}