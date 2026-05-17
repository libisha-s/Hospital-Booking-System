package com.hospital.booking_system.service.ServiceImplementation;

import com.hospital.booking_system.dto.doctorCardDto;
import com.hospital.booking_system.dto.doctorRequestDto;
import com.hospital.booking_system.entity.Doctor;
import com.hospital.booking_system.repository.DoctorRepository;
import com.hospital.booking_system.service.AdminService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {
    private final DoctorRepository doctorRepository;

    public AdminServiceImpl(DoctorRepository doctorRepository){
        this.doctorRepository=doctorRepository;
    }
    @Override

    public String addDoctor(doctorRequestDto dto){
        Doctor doctor=new Doctor();
        doctor.setName(dto.name());
        doctor.setDepartment(dto.department());
        doctor.setExperience(
                dto.experience());
        doctor.setRating(
                dto.rating());

        doctor.setConsultingFee(
                dto.consultingFee());

        doctorRepository.save(doctor);

        return "Doctor added successfully";
    }

    public List<doctorRequestDto> getAllDoctor(){
        List<Doctor> doctors =
                doctorRepository.findAll();

        return doctors.stream()
                .map(doctor ->
                        new doctorRequestDto(
                                doctor.getName(),
                                doctor.getDepartment(),
                                doctor.getExperience(),
                                doctor.getRating(),
                                doctor.getConsultingFee()
                        )
                )
                .toList();

    }

    }

