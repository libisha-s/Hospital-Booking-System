package com.hospital.booking_system.controller;

import com.hospital.booking_system.dto.doctorCardDetailsDto;
import com.hospital.booking_system.dto.doctorCardDto;
import com.hospital.booking_system.enums.Department;
import com.hospital.booking_system.service.DoctorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:5173")

public class DoctorController {
private final DoctorService doctorService;
public DoctorController(DoctorService doctorService){
    this.doctorService=doctorService;
}

@GetMapping("/all")
    public List<doctorCardDto> getAllDoctors(){
    return doctorService.getAllDoctors();
}

@GetMapping("/{id}")
    public doctorCardDetailsDto getCardDetail(@PathVariable Long id){


    return doctorService.getDoctorById(id);
}

@GetMapping("/dept/{department}")
    public List<doctorCardDto>  getByDepartment(@PathVariable Department department){
     return doctorService.getByDepartment(department);
}

}
