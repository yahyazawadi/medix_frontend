// ServicesPage.js
import React from 'react';
import './Courses.css'; 
import backgroundImage from '../../assets/home_pic.png';
import Background from '../BackGround/BackGround';

function Courses() {
    return (
        <Background>
        <header className="masthead vh-100 d-flex align-items-center text-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="blurry-box">
                            <h1 className="display-3 text-white fw-bold">من نحن؟</h1>
                            <ul className="lead text-white mt-3">
                            <li>
                                    <h4>عنوان صفحة الكورسات</h4>
                                    <p className="lead text-white mt-3">نص صفحة الكورسات</p>
                                </li>    
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </header>
        </Background>
    );
}

export default Courses;