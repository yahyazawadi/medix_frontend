import React from 'react';
import './Masthead.css';
import Background from '../../BackGround/BackGround';

function Masthead() {
  return (
    <Background>
    <div className="masthead">
      <div className='welcome'>welcome to ClimaMedix</div>
       <div className='healthcare'>Healthcare Teams United For Creating a Sustainable and Greener Future</div></div>
    <div className='challenge'>We are dedicated to engaging young healthcare professionals in addressing one of the greatest challenges our planet faces—climate change. The well-being of humanity is intricately linked to the health of the Earth. By empowering them, we ensure they play a crucial role in tackling this global crisis. </div>
    </Background>
  );
}

export default Masthead;
