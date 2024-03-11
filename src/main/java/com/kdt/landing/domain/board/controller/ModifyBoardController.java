package com.kdt.landing.domain.board.controller;

import com.kdt.landing.domain.board.dto.BoardDTO;
import com.kdt.landing.domain.board.service.BoardService;
import com.kdt.landing.domain.file.dto.FileDTO;
import com.kdt.landing.domain.file.service.FileService;
import com.kdt.landing.domain.member.entity.Member;
import com.kdt.landing.domain.member.repository.MemberRepository;
import com.kdt.landing.domain.member.service.MemberService;
import com.kdt.landing.global.util.MD5Generator;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.File;
import java.nio.file.Files;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/modifyBoard")
public class ModifyBoardController {

    @Value("${upload.path}")
    private String uploadPath;

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final BoardService boardService;
    private final FileService fileService;

    @GetMapping(value = {"/list", "/"})
    public String modifyBoardList(Model model, Principal principal) {
        String boardType = "MODIFY";
        List<BoardDTO> boardList = boardService.findByBoardType(boardType);
        model.addAttribute("boardList", boardList);
        String email = principal.getName();
        Optional<Member> optionalMember = memberRepository.findByEmail2(email);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            String name = member.getName();
            model.addAttribute("name", name);
        }
        model.addAttribute("principal", principal);
        return "admin/modifyBoard/list";
    }

    @GetMapping("/read")
    public String readModifyBoard(Long id, Model model, Principal principal) {
        if (id != null) {
            BoardDTO boardDTO = boardService.findById(id);
            if (boardDTO != null) {
                FileDTO fileDTO = fileService.getFile(boardDTO.getFileId());
                String email = principal.getName();
                Optional<Member> optionalMember = memberRepository.findByEmail2(email);
                if (optionalMember.isPresent()) {
                    Member member = optionalMember.get();
                    String name = member.getName();
                    model.addAttribute("name", name);
                }
                model.addAttribute("principal", principal);
                model.addAttribute("fileList", fileDTO);
                model.addAttribute("boardList", boardDTO);
            } else {
                log.info("fileDTO" + fileService);
            }
        }
        return "admin/modifyBoard/view";
    }



    @GetMapping("/register")
    public String registerForm(Model model, Principal principal) {
        String email = principal.getName();
        Optional<Member> optionalMember = memberRepository.findByEmail2(email);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            String name = member.getName();
            model.addAttribute("name", name);
        }
        return "admin/modifyBoard/register";
    }

    @PostMapping("/register")
    public String modifyBoardRegister(@Valid BoardDTO boardDTO,
                                 BindingResult bindingResult,
                                 RedirectAttributes redirectAttributes,
                                 Model model,
                                 @RequestParam("file") MultipartFile files) {
        try {
            String originFilename = files.getOriginalFilename();
            String filename = new MD5Generator(originFilename).toString();
            String savePath = System.getProperty("user.dir") + "/files/";
            log.info("어디로 가니?  " + savePath);
            if(!new java.io.File(savePath).exists()) {
                try {
                    new java.io.File(savePath).mkdirs();
                }
                catch (Exception e) {
                    e.printStackTrace();
                }
            }
            String filePath = savePath + filename;

            files.transferTo(new File(filePath));

            FileDTO fileDTO = new FileDTO();
            fileDTO.setOriginFileName(originFilename);
            fileDTO.setFileName(filename);
            fileDTO.setFilePath(filePath);

            Long fileId = fileService.saveFile(fileDTO);
            boardDTO.setFileId(fileId);
            boardDTO.setWriter(boardDTO.getWriter());
            boardService.register(boardDTO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("message", "수정 요청 글 작성이 완료되었습니다.");
        model.addAttribute("searchUrl", "/modifyBoard/list");
        return "admin/modifyBoard/message";
    }

    @GetMapping("/modify")
    public String modifyBoardEditForm(Model model, Long id) {
        BoardDTO boardDTO = boardService.getBoard(id);
        model.addAttribute("boardDTO", boardDTO);
        return "admin/modifyBoard/edit";
    }

    @PostMapping("/modify/{id}")
    public String modifyBoardEdit(@PathVariable("id") Long id, @ModelAttribute("boardDTO") BoardDTO boardDTO){
        BoardDTO boardDTO1 = boardService.getBoard(id);
        boardDTO1.setTitle(boardDTO.getTitle());
        boardDTO1.setContent(boardDTO.getContent());
        boardDTO1.setFileId(boardDTO.getFileId());
        boardService.modify(boardDTO1); // 수정된 boardDTO1을 전달해야 합니다.
        return "redirect:/modifyBoard/read?id="+id;
    }

    @RequestMapping(value = "/remove", method = {RequestMethod.GET, RequestMethod.POST})
    public String remove(Long id, RedirectAttributes redirectAttributes) {
        log.info("remove post.. " + id);
        boardService.remove(id);
        redirectAttributes.addFlashAttribute("result", "removed");
        return "redirect:/admin/modifyBoard/list";
    }

    private void removeFiles(List<String> files) {
        for (String fileName:files) {
            Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);
            String resourceName = resource.getFilename();
            try {
                String contentType = Files.probeContentType(resource.getFile().toPath());
                resource.getFile().delete();
                if (contentType.startsWith("image")) {
                    File thumbnailFile = new File(uploadPath + File.separator+"s_"+ fileName);
                    thumbnailFile.delete();
                }
            } catch (Exception e) {
                log.error(e.getMessage());
            }
        }
    }
}
