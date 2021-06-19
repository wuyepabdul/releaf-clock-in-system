import React from "react";

export const showSuccessMessage = (msg) => (
  <div className="alert alert-success alert-dismissible fade show" role="alert">
    {msg}
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
);

export const showErrorMessage = (msg) => (
  <div className="alert alert-danger alert-dismissible fade show" role="alert">
    {msg}
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
);

export const showInfoError = (msg) => (
  <div className="alert alert-warning alert-dismissible fade show" role="alert">
    {msg}
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
);
