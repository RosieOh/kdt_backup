package com.kdt.landing.domain.subject.repository;

import com.kdt.landing.domain.subject.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    @Query("select s from Subject s where s.course = :course")
    List<Subject> findBySubjectCourse(@Param("course") String course);

    @Query("select s from Subject s where s.no = :no")
    Optional<Subject> findById(@Param("no") Long no);
}
