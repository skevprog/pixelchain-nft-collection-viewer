import React from 'react';

import './styles.css';

interface CardProps {
   imgSource: string;
   name: string;
}

function Card({ imgSource, name }: CardProps): JSX.Element {
  return (
    <div className="card-container">
      <img className="card-img" alt={name} src={imgSource} />
      <p>{name}</p>
    </div>
  );
}

export default Card;
