import React from "react";
import "./input.styles.scss";

const Input = () => {
  return (
    <div className="input">
      <div className="container">
        <div className="row">
          <input
            className="input-notes bg-light border__radius--big"
            type="text"
            name="notes"
            placeholder="Qeydləri əlavə et"
          />

          <div className="input-items">
              <p className="input-parag txt--error">Sifariş üçün qeydlər əlavə edilməlidir</p>
              <span className="numbers txt--secondary">0/256</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Input;
