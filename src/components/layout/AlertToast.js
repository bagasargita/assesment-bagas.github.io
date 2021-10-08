import React from "react";
import { ToastContainer, toast } from "react-toastify";


const AlertToast = () => {
  const notify = () =>
    toast.success("This is an alert message. This is an alert message.");

  return (
    <div>
      <button onClick={notify}>Notify !</button>
      
    </div>
  );
};

export default AlertToast;