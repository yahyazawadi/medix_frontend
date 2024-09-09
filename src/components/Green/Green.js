import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../BackGround/BackGround';
import doctorImage from '../../assets/doctor.png'; // Path to your doctor image

function ServicesPage() {
    const navigate = useNavigate();
    const [adminIn, setAdminIn] = useState(() => localStorage.getItem('acces') === '2');

    useEffect(() => {
        if (!adminIn) {
            // Redirect non-admin users to a different page, e.g., home or error page
            navigate('/login'); // or navigate('/login');
        }
    }, [adminIn, navigate]);

    if (!adminIn) {
        // Show a message or redirect logic is handled above, but you can also return a simple message here.
        return <div>Unauthorized access. You do not have permission to view this page.</div>;
    }

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
