import React from 'react';
import './Card.css';

const Card = ({ title, content, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {content && <p>{content}</p>}
      {children && <div className="card-children">{children}</div>}
    </div>
  );
};

export default Card;
