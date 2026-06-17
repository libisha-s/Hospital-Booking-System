function DoctorCard({doctor}){
    return(
        <div>
            <h1>{doctor.name}</h1>
            <p>{doctor.department}</p>
            <p>Experiance:{doctor.experience}</p>
            <p>Rating: {doctor.rating}</p>

    
        </div>
    );
}

export default DoctorCard;