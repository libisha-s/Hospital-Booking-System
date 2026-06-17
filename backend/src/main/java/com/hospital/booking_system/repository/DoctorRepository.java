package com.hospital.booking_system.repository;

import com.hospital.booking_system.entity.Doctor;
import com.hospital.booking_system.enums.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findByDepartment(Department department);

}
