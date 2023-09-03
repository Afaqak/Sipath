import React from 'react';

const Toast = ({ icon, message }) => (
  <div style={{ display: 'flex', alignItems: 'center', color: 'black' }}>
    <span style={{ marginRight: '0.5rem' }}>{icon}</span>
    <span>{message}</span>
  </div>
);

export default Toast;
