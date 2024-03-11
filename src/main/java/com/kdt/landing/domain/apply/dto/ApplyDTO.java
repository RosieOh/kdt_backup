package com.kdt.landing.domain.apply.dto;

import com.kdt.landing.global.cosntant.Course;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
public class ApplyDTO {

    private Long no;

    @Column(length = 100)
    private String name;

    @Column(length = 100)
    private String tel;

    @Column(length = 100)
    private String email;

    @Enumerated(EnumType.STRING)
    private Course course;

    private LocalDateTime regDate;
    private LocalDateTime modDate;


}
