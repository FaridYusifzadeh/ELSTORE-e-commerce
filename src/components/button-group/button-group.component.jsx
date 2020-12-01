import React from "react";
import Logo from "./Bag.svg";
import './button-group.styles.scss';

const ButtonGroup = (props) => {
  return (
    <div className="btn-group">
           {props.children}
          {/* <div className="add-basket">
            <img
              className="add-basket-icon display__inline-block"
              src={Logo}
              alt="icon"
            />
            <p className="add-basket-p txt--secondary  display__inline-block">
              12 nəfər səbətə əlavə edib
            </p>
          </div> */}
        </div>
  );
};
export default ButtonGroup;
