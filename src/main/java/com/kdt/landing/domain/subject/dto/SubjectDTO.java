package com.kdt.landing.domain.subject.dto;

import com.kdt.landing.global.cosntant.Course;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
public class SubjectDTO {

    private Long no;

    @Enumerated(EnumType.STRING)
    private Course course;                            //신청 과목

    @Column(length = 20)
    private String name;                              //신청자 이름

    @Column(length = 2)
    private String age;                              //신청자 나이

    @Column(length = 100)
    private String tel;                              //신청자 연락처

    @Column(length = 255)
    private String email;                            //신청자 이메일

    @Column(length = 100)
    private String recomment;                        //추천 전형

    @Column(length = 100)
    private String degree;                          //최종학력

    @Column(length = 100)
    private String graduation_degree;               //학교 및 전공명

    @Column(length = 30)
    private String studen_card;                     // 내일배움카드 여부

    @Column(length = 30)
    private String workup;                          // 국민취업제도 참여 경험

    @Column(length = 25)
    private String kdt_process;                    // KDT 과정 수강이력

    @Column(length = 100)
    private String coding_experience;               // 코딩 경험 여부

    @Column(length = 1000)
    private String paper1;                          // 자기소개서 1

    @Column(length = 1000)
    private String paper2;                          // 자기소개서 2

    @Column(length = 1000)
    private String paper3;                          // 자기소개서 3

    @Column(length = 50)
    private String route;                           // 인입 경로

    private LocalDateTime regDate;
    private LocalDateTime modDate;


}
