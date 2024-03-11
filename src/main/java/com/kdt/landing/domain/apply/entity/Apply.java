package com.kdt.landing.domain.apply.entity;

import com.kdt.landing.global.cosntant.BaseEntity;
import com.kdt.landing.global.cosntant.Course;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Apply extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long no;

    @Column(nullable = false)
    private String name;                    //신청자 이름

    @Column(nullable = false)
    private String tel;                     //신청자 연락처

    @Column(nullable = false)
    private String email;                   //신청자 이메일

    @Enumerated(EnumType.STRING)
    private Course course;             //신청자 과목



}
