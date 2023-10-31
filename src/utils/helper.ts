export const copyToClipboard = () => {
  navigator.clipboard.writeText(window.location.toString());
};
