import React from 'react';
import './Card.css';

const Card: React.FC<{ cardContainer: string }> = ({ cardContainer, children }) => <div className={cardContainer}>{children}</div>;
export default Card;
