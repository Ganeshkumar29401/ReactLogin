import { Fragment } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import classes from "./Modal.module.css";

const Bacdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCancel} />;
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Bacdrop onCancel={props.onCancel} />,
        document.getElementById("overlay")
      )}
      {ReactDOM.createPortal(
        <Card>
           {props.children}
        </Card>,
        document.getElementById("overlay")
      )}
    </Fragment>
  );
};

export default Modal;
