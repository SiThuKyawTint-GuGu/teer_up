export const copyUrl = () => {
  navigator.clipboard.writeText(window.location.toString());
};
