package com.klef.dev.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.dev.entity.Prisoner;
import com.klef.dev.repository.PrisonerRepository;

@Service
public class PrisonerServiceImpl implements PrisonerService {

    @Autowired
    private PrisonerRepository prisonerRepository;

    @Override
    public Prisoner addPrisoner(Prisoner prisoner) {
        return prisonerRepository.save(prisoner);
    }

    @Override
    public List<Prisoner> getAllPrisoners() {
        return prisonerRepository.findAll();
    }

    @Override
    public Prisoner getPrisonerById(int id) {
        Optional<Prisoner> opt = prisonerRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Prisoner updatePrisoner(Prisoner prisoner) {
        return prisonerRepository.save(prisoner);
    }

    @Override
    public void deletePrisonerById(int id) {
        prisonerRepository.deleteById(id);
    }
}
