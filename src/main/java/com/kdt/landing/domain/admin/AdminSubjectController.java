package com.kdt.landing.domain.admin;

import com.kdt.landing.domain.subject.dto.SubjectDTO;
import com.kdt.landing.domain.subject.service.SubjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Log4j2
@Controller
@RequestMapping("/adminSubject")
@RequiredArgsConstructor
public class AdminSubjectController {

    private final SubjectService subFullStackService;

    // 풀스택 등록
    //리스트
    @GetMapping("/list")
    public String applyList(Model model) throws Exception{
        List<SubjectDTO> adminSubDTOList = subFullStackService.findAll();
        model.addAttribute("adminSubDTOList", adminSubDTOList);
        return "admin/sub/list";
    }

    //상태변경
    @PostMapping("/statusModify")
    public String applyStatus(Model model, SubjectDTO adminSubDTO) throws Exception{
        subFullStackService.modify(adminSubDTO);
        return "redirect:/";
    }

    @GetMapping("/read")
    public String readAdminSub(Long no, Model model) throws Exception {
        SubjectDTO subjectDTO = subFullStackService.findById(no);
        model.addAttribute("adminSubDTOList", subjectDTO);
        return "admin/sub/view";
    }
}
