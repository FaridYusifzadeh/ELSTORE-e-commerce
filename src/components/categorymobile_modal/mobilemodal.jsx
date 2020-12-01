import React from "react";
import "./modal.css";
import PropTypes from "prop-types";

export default class MobileModal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div class="modal" id="modal">
          
        <h2>Categories <button class="toggle-button" onClick={this.onClose}>
            close
          </button></h2>
        
        <div class="content">{this.props.children}</div>
        
      </div>
    );
  }
}
MobileModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};