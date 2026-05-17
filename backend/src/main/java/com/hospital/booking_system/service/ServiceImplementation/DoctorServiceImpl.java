package com.hospital.booking_system.service.ServiceImplementation;

import com.hospital.booking_system.dto.doctorCardDto;
import com.hospital.booking_system.entity.Doctor;
import com.hospital.booking_system.repository.DoctorRepository;
import com.hospital.booking_system.service.DoctorService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {
    private final DoctorRepository doctorRepository;

    public DoctorServiceImpl(DoctorRepository doctorRepository){
        this.doctorRepository=doctorRepository;
    }

    @Override
    public List<doctorCardDto> getAllDoctors() {

        List<Doctor> doctors =
                doctorRepository.findAll();

        return doctors.stream()
                .map(doctor ->
                        new doctorCardDto(
                                doctor.getId(),
                                doctor.getName(),
                                doctor.getDepartment().toString(),
                                doctor.getExperience(),
                                doctor.getRating()
                        )
                )
                .toList();
    }
}

