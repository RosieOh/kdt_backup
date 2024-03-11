package com.kdt.landing.domain.subject.entity;

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
public class Subject extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long no;

    @Enumerated(EnumType.STRING)
    private Course course;                            //신청 과목


    @Column(nullable = true)
    private String name;                              //신청자 이름

    @Column(nullable = true)
    private String age;                              //신청자 나이

    @Column(nullable = true)
    private String tel;                              //신청자 연락처

    @Column(nullable = true)
    private String email;                            //신청자 이메일

    @Column(nullable = true)
    private String recomment;                        //추천 전형

    @Column(nullable = true)
    private String degree;                           //최종학력

    @Column(nullable = true)
    private String graduation_degree;               //학교 및 전공명

    @Column(nullable = true)
    private String studen_card;                     // 내일배움카드 여부

    @Column(nullable = true)
    private String workup;                          // 국민취업제도 참여 경험

    @Column(nullable = true)
    private String kdt_process;                    // KDT 과정 수강이력

    @Column(nullable = true)
    private String coding_experience;               // 코딩 경험 여부

    @Column(nullable = true)
    private String paper1;                          // 자기소개서 1

    @Column(nullable = true)
    private String paper2;                          // 자기소개서 2

    @Column(nullable = true)
    private String paper3;                          // 자기소개서 3

    @Column(nullable = true)
    private String route;                           // 인입 경로


}
