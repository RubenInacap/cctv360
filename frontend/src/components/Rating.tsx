import React from 'react';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

interface Props {
  value?: number; // Hacer value opcional
}

function Rating({ value }: Props) {
  if (value === undefined) {
    // Manejar el caso en el que value es undefined
    return <div>No se ha proporcionado un valor de clasificación</div>;
  }

  return (
    <div className="rating text-[#ffc107]">
      {value >= 1 ? (
        <FontAwesomeIcon icon={faStar} />
      ) : value >= 0.5 ? (
        <FontAwesomeIcon icon={faStarHalfAlt} />
      ) : (
        <FontAwesomeIcon icon={farStar} />
      )}

      {value >= 2 ? (
        <FontAwesomeIcon icon={faStar} />
      ) : value >= 1.5 ? (
        <FontAwesomeIcon icon={faStarHalfAlt} />
      ) : (
        <FontAwesomeIcon icon={farStar} />
      )}

      {value >= 3 ? (
        <FontAwesomeIcon icon={faStar} />
      ) : value >= 2.5 ? (
        <FontAwesomeIcon icon={faStarHalfAlt} />
      ) : (
        <FontAwesomeIcon icon={farStar} />
      )}

      {value >= 4 ? (
        <FontAwesomeIcon icon={faStar} />
      ) : value >= 3.5 ? (
        <FontAwesomeIcon icon={faStarHalfAlt} />
      ) : (
        <FontAwesomeIcon icon={farStar} />
      )}

      {value >= 5 ? (
        <FontAwesomeIcon icon={faStar} />
      ) : value >= 4.5 ? (
        <FontAwesomeIcon icon={faStarHalfAlt} />
      ) : (
        <FontAwesomeIcon icon={farStar} />
      )}
    </div>
  );
}

export default Rating;
