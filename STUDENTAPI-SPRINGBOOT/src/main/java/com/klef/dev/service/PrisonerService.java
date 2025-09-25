package com.klef.dev.service;

import java.util.List;
import com.klef.dev.entity.Prisoner;

public interface PrisonerService {
    Prisoner addPrisoner(Prisoner prisoner);
    List<Prisoner> getAllPrisoners();
    Prisoner getPrisonerById(int id);
    Prisoner updatePrisoner(Prisoner prisoner);
    void deletePrisonerById(int id);
}
