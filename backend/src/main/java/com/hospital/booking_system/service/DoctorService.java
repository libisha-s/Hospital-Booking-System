package com.hospital.booking_system.service;

import com.hospital.booking_system.dto.doctorCardDetailsDto;
import com.hospital.booking_system.dto.doctorCardDto;
import com.hospital.booking_system.enums.Department;

import java.util.List;

public interface DoctorService {
    List<doctorCardDto> getAllDoctors();

    doctorCardDetailsDto getDoctorById(Long id);

    List<doctorCardDto> getByDepartment(Department department);

}
