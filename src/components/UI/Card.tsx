import React from 'react';
import './Card.css'

const Card: React.FC<{ class: string }> = (props) => {
  return <div className={props.class}>{props.children}</div>
};

export default Card;
