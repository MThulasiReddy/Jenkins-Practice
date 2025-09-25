package com.klef.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.dev.entity.Prisoner;

@Repository
public interface PrisonerRepository extends JpaRepository<Prisoner, Integer> {
    Prisoner findByContact(String contact);
}
