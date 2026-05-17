package com.hospital.booking_system.service;

import com.hospital.booking_system.dto.doctorRequestDto;

import java.util.List;

public interface AdminService {
    String addDoctor(doctorRequestDto dto);
    List<doctorRequestDto> getAllDoctor();
}
