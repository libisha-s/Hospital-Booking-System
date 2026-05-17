package com.hospital.booking_system.controller;

import com.hospital.booking_system.dto.doctorRequestDto;
import com.hospital.booking_system.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;
    public AdminController(AdminService adminService){
        this.adminService=adminService;
    }

    @PostMapping("/add")
    public String addDoctor(@RequestBody doctorRequestDto dto){
        return adminService.addDoctor(dto);
    }

    @GetMapping("/doctors")
    public List<doctorRequestDto> getAllDoctor(){
        return adminService.getAllDoctor();
    }


}

