export const handleGoToSudepClick = event => {
  event.preventDefault();
  window.location.href = process.env.REACT_APP_MAIN_PORTAL;
};
