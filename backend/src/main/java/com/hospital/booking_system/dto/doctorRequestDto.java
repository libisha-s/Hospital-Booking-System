package com.hospital.booking_system.dto;

import com.hospital.booking_system.enums.Department;

public record doctorRequestDto(
        String name,
        Department department,
        String experience,
        double rating,
        double consultingFee
) {
}
