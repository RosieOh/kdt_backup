package com.kdt.landing.domain.apply.service;

import com.kdt.landing.domain.apply.dto.ApplyDTO;
import com.kdt.landing.domain.apply.entity.Apply;
import com.kdt.landing.domain.apply.repository.ApplyRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Service
@Transactional
public class ApplyServiceImpl implements ApplyService{

    @Autowired
    private ApplyRepository applyRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 리스트
    @Override
    public List<ApplyDTO> findAll() {
        List<Apply> applyList = applyRepository.findAll();
        List<ApplyDTO> applyDTOList = applyList.stream().map(
                        apply -> modelMapper.map(apply, ApplyDTO.class))
                .collect(Collectors.toList());
        return applyDTOList;
    }

    // 조회
    @Override
    public ApplyDTO findById(Long no) {
        Optional<Apply> apply = applyRepository.findById(no);
        ApplyDTO applyDTO = modelMapper.map(apply, ApplyDTO.class);
        return applyDTO;
    }

    // 등록
    @Override
    public void register(ApplyDTO applyDTO) {
        String emailEn = applyDTO.getEmail();
        String telEn = applyDTO.getTel();
        applyDTO.setEmail(emailEn);
        applyDTO.setTel(telEn);
        Apply apply = modelMapper.map(applyDTO, Apply.class);
        applyRepository.save(apply);
    }

    // 수정
    @Override
    public void modify(ApplyDTO applyDTO) {
        Apply apply = modelMapper.map(applyDTO, Apply.class);
        applyRepository.save(apply);
    }

    // 이메일체크
    @Override
    public boolean emailCheck(String email) {
        boolean pass = true;
//        int cnt = applyRepository.countBy(email);
//        if(cnt > 0) pass = false;
        return pass;
    }
}
