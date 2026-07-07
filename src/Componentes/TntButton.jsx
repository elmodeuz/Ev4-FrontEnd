import React, { useState } from 'react';
import './TntButton.css';

const TntButton = ({ onExplode }) => {
  const [isExploding, setIsExploding] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsExploding(true);

    // EL TIEMPO QUE PARPADEA ANTES DE QUE SE ELIMINE EL USUARIO GUARDADO
    setTimeout(() => {
      onExplode();
      setIsExploding(false);
    }, 1000);
  };

  return (
    <button
      className={`tnt-btn ${isExploding ? 'tnt-active' : ''}`}
      onClick={handleClick}
      disabled={isExploding}
      title="Eliminar usuario con TNT"
    />
  );
};

export default TntButton;