import React, { forwardRef } from 'react';

import './styles.css';

interface CardProps {
   imgSource: string;
   name: string;
   [x: string]: any;
}

const Card = forwardRef(({ imgSource, name, ...props }: CardProps, ref: any): JSX.Element => (
  <div ref={ref} {...props}>
    <img className="card-img" alt={name} src={imgSource} />
    <p>{name}</p>
  </div>
));

export default Card;
