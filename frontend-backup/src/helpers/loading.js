import React from "react";

export const showLoading = () => (
  <div className="spinner-border  text-info " role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
);

export const loadingButton = () => (
  <button className="btn btn-primary form-control" type="button" disabled>
    <span
      className="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
    Loading...
  </button>
);
