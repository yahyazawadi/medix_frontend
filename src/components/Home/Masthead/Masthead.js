import React from 'react';
import './Masthead.css';
import backgroundImage from '../../../assets/home_pic.png'; 
import Background from '../../BackGround/BackGround';

function Masthead() {
  return (
    <Background>
    <header className="masthead vh-100 d-flex align-items-center text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="display-3 text-black fw-bold">MedixPlus</h1>
            <h1 className="display-3 text-black fw-bold">لأجل مستقبل طبي أفضل</h1>
            <p className="lead text-white mt-3"></p>
          </div>
        </div>
         
      </div>
       
    </header>
    </Background>
  );
}

export default Masthead;
