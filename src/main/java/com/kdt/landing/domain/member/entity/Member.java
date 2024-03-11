package com.kdt.landing.domain.member.entity;

import com.kdt.landing.domain.member.dto.MemberJoinDTO;
import com.kdt.landing.global.cosntant.BaseEntity;
import com.kdt.landing.global.cosntant.Role;
import com.kdt.landing.global.cosntant.Status;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "roleSet")
//@ToString(exclude = "roleSet")
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String pw;

    @Column(nullable = true)
    private String name;

    @Column(unique = true, nullable = true)
    private String email;

    private String tel;

    @Enumerated(EnumType.STRING)
    private Status status;      //회원 활동상태

    @CreatedDate
    private LocalDateTime loginAt;  //최종 로그인시간

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Role> roleSet = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Role role = Role.STUDENT; // 디폴트로 USER 권한을 갖도록 초기화

    public void change(MemberJoinDTO memberJoinDTO) {
        this.tel = memberJoinDTO.getTel();
    }



    public void stateUpdate(MemberJoinDTO memberJoinDTO) {
        this.status = memberJoinDTO.getStatus();
    }

    public void roleUpdate(MemberJoinDTO memberJoinDTO) {
        this.role = memberJoinDTO.getRole();
    }
}