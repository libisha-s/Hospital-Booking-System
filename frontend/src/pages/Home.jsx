import { useEffect, useState } from "react";
import axios from "axios"
import DoctorCard from "../components/DoctorCard";

function Home(){
    const[doctors,setDoctors]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8080/api/doctors/all")
        .then((response)=>{
            setDoctors(response.data)
        })
        .catch((error)=>{
            console.log(error);
        });

    },[]);
    return (
        <div>
            <h1>Our Doctors</h1>
            {
                doctors.map((doctor =>(
                    <DoctorCard key={doctor.id} doctor={doctor}/>

                )))
            }
        </div>
    )
}export default Home;