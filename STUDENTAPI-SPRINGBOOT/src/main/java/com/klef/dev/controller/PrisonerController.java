package com.klef.dev.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.klef.dev.entity.Prisoner;
import com.klef.dev.service.PrisonerService;

@RestController
@RequestMapping("/prisonapi/")
@CrossOrigin(origins = "*")
public class PrisonerController {

    @Autowired
    private PrisonerService prisonerService;
    
    @GetMapping("/")
    public String home() {
        return "Prison Management System - API Running";
    }
    
    @PostMapping("/add")
    public ResponseEntity<Prisoner> addPrisoner(@RequestBody Prisoner prisoner) {
        Prisoner savedPrisoner = prisonerService.addPrisoner(prisoner);
        return new ResponseEntity<>(savedPrisoner, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Prisoner>> getAllPrisoners() {
        List<Prisoner> prisoners = prisonerService.getAllPrisoners();
        return new ResponseEntity<>(prisoners, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getPrisonerById(@PathVariable int id) {
        Prisoner prisoner = prisonerService.getPrisonerById(id);
        if (prisoner != null) {
            return new ResponseEntity<>(prisoner, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Prisoner with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updatePrisoner(@RequestBody Prisoner prisoner) {
        Prisoner existing = prisonerService.getPrisonerById(prisoner.getId());
        if (existing != null) {
            Prisoner updatedPrisoner = prisonerService.updatePrisoner(prisoner);
            return new ResponseEntity<>(updatedPrisoner, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Prisoner with ID " + prisoner.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePrisoner(@PathVariable int id) {
        Prisoner existing = prisonerService.getPrisonerById(id);
        if (existing != null) {
            prisonerService.deletePrisonerById(id);
            return new ResponseEntity<>("Prisoner with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Prisoner with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
