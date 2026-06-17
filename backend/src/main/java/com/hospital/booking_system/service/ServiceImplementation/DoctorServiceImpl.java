package com.hospital.booking_system.service.ServiceImplementation;

import com.hospital.booking_system.dto.doctorCardDetailsDto;
import com.hospital.booking_system.dto.doctorCardDto;
import com.hospital.booking_system.entity.Doctor;
import com.hospital.booking_system.enums.Department;
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

    @Override
    public doctorCardDetailsDto getDoctorById(Long id){
        Doctor doctor =
                doctorRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Doctor not found"));
        return new doctorCardDetailsDto(

                doctor.getId(),
                doctor.getName(),
                doctor.getDepartment().toString(),
                doctor.getExperience(),
                doctor.getRating(),
                doctor.getConsultingFee()
        );
    }

    @Override
    public List<doctorCardDto> getByDepartment(Department department) {
            List<Doctor> doctors=doctorRepository.findByDepartment(department);
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

