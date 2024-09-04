import React from 'react';
import Background from '../BackGround/BackGround';
import doctorImage from '../../assets/doctor.png'; // Path to your doctor image

function ServicesPage() {
    return (
        <Background image={doctorImage} color="#cfe7f1"> 
            <div className="blurry-box">
                <h1 className="display-3 text-white fw-bold">مستقبل أخضر</h1>
                <ul className="lead text-white mt-3">
                    <li>
                        <h4>عنوان صفحة مستقبل أخضر</h4>
                        <p className="lead text-white mt-3">نص صفحة مستقبل أخضر</p>
                    </li>    
                </ul>
            </div>
        </Background>
    );
}

export default ServicesPage;
