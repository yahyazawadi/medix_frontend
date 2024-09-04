import React from 'react';
import './BackGround.css';
import doctorImage from '../../assets/doctor.png';

function Background({ children, color }) {
    return (
        <div className="backgroundlong-container" style={{ backgroundColor: color }}>
            <img src={doctorImage} alt="Doctor" className="doctor-imagelong" />
            <div className="contentlong">
                {children}
            </div>
        </div>
    );
}

export default Background;
