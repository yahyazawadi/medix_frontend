import React from 'react';
import './BackGround.css';
import doctorImage from '../../assets/doctor.png';

function Background({ children, color }) {
    return (
        <div className="background-container" style={{ backgroundColor: color }}>
            <img src={doctorImage} alt="Doctor" className="doctor-image" />
            <div className="content">
                {children}
            </div>
        </div>
    );
}

export default Background;
