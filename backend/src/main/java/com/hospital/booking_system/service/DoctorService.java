package com.hospital.booking_system.service;

import com.hospital.booking_system.dto.doctorCardDto;

import java.util.List;

public interface DoctorService {
    List<doctorCardDto> getAllDoctors();
}
