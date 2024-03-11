package com.kdt.landing.domain.subject.service;

import com.kdt.landing.domain.subject.dto.SubjectDTO;
import com.kdt.landing.domain.subject.entity.Subject;
import com.kdt.landing.domain.subject.repository.SubjectRepository;
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
public class SubjectServiceImpl implements SubjectService {

    @Autowired
    private SubjectRepository subFullStackRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<SubjectDTO> findAll() throws Exception {
        List<Subject> subFullStackList = subFullStackRepository.findAll();
        List<SubjectDTO> subFullStackDTOList = subFullStackList.stream().map(
                        subFullStack -> modelMapper.map(subFullStack, SubjectDTO.class))
                .collect(Collectors.toList());
        return subFullStackDTOList;
    }

    @Override
    public SubjectDTO findById(Long no) throws Exception {
        Optional<Subject> subFullStack = subFullStackRepository.findById(no);
        // passencoder 다시 뺴줘야함
        SubjectDTO subFullStackDTO = modelMapper.map(subFullStack, SubjectDTO.class);
        return subFullStackDTO;
    }

    @Override
    public void register(SubjectDTO subFullStackDTO) throws Exception {
        String emailEn = passwordEncoder.encode(subFullStackDTO.getEmail());
        String telEn = passwordEncoder.encode(subFullStackDTO.getTel());
        subFullStackDTO.setEmail(emailEn);
        subFullStackDTO.setTel(telEn);
        Subject subFullStack = modelMapper.map(subFullStackDTO, Subject.class);
        subFullStackRepository.save(subFullStack);
    }

    @Override
    public void modify(SubjectDTO subFullStackDTO) throws Exception {
        Subject subFullStack = modelMapper.map(subFullStackDTO, Subject.class);
        subFullStackRepository.save(subFullStack);
    }

    @Override
    public boolean emailCheck(String email) throws Exception {
        return false;
    }

}
