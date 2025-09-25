package com.klef.dev.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "prisoner_table")
public class Prisoner {
    
    @Id
    @Column(name = "prisoner_id")
    private int id;
    
    @Column(name = "prisoner_name", nullable = false, length = 50)
    private String name;
    
    @Column(name = "prisoner_gender", nullable = false, length = 10)
    private String gender; // MALE or FEMALE
    
    @Column(name = "cell_block", nullable = false, length = 20)
    private String cellBlock;
    
    @Column(name = "crime", nullable = false, length = 100)
    private String crime;
    
    @Column(name = "sentence_years", nullable = false)
    private String sentenceYears; // no. of years
    
    @Column(name = "status", nullable = false, length = 20)
    private String status; // ACTIVE or RELEASED
    
    @Column(name = "contact", nullable = false, unique = true, length = 20)
    private String contact;
    
    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    
    public String getCellBlock() { return cellBlock; }
    public void setCellBlock(String cellBlock) { this.cellBlock = cellBlock; }
    
    public String getCrime() { return crime; }
    public void setCrime(String crime) { this.crime = crime; }
    
    public String getSentenceYears() { return sentenceYears; }
    public void setSentenceYears(String sentenceYears) { this.sentenceYears = sentenceYears; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }
    
    @Override
    public String toString() {
        return "Prisoner [id=" + id + ", name=" + name + ", gender=" + gender + 
               ", cellBlock=" + cellBlock + ", crime=" + crime + 
               ", sentenceYears=" + sentenceYears + ", status=" + status + 
               ", contact=" + contact + "]";
    }
}
