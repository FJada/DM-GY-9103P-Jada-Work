import React from 'react';

const Alert = ({ type, message }) => {

  let bgColor, textColor;
  switch (type) {
    case 'success':
      bgColor = 'bg-green-500';
      textColor = 'text-white';
      break;
    case 'warning':
      bgColor = 'bg-yellow-500';
      textColor = 'text-black';
      break;
    case 'error':
      bgColor = 'bg-red-500';
      textColor = 'text-white';
      break;
    default:
      bgColor = 'bg-blue-500';
      textColor = 'text-white';
  }

  return (
    <div className={`rounded p-4 ${bgColor} ${textColor} mb-4`}>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
