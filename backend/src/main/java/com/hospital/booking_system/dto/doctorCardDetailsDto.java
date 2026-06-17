package com.hospital.booking_system.dto;

public record doctorCardDetailsDto (
        Long id,
        String name,
        String department,
        String experience,
        double rating,
        double consultingFee
){
}
