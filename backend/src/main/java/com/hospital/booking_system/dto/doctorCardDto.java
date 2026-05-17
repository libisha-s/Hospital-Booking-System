package com.hospital.booking_system.dto;

public record doctorCardDto (
         Long id,
         String name,
         String department,
         String experience,
         double rating
){
}
