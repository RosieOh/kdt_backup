package com.kdt.landing.domain.subject.service;


import com.kdt.landing.domain.subject.dto.SubjectDTO;

import java.util.List;

public interface SubjectService {


    public List<SubjectDTO> findAll() throws Exception;
    public SubjectDTO findById(Long no) throws Exception;
    public void register(SubjectDTO subFullStackDTO) throws Exception;
    public void modify(SubjectDTO subFullStackDTO) throws Exception;
    public boolean emailCheck(String email) throws Exception;


}
