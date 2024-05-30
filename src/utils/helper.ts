export const copyUrl = (url: string) => {
  navigator.clipboard.writeText(url);
};
export const CapitalizeWord = (params: string) => {
  const firstLetter = params.charAt(0);

  const firstLetterCap = firstLetter.toUpperCase();

  const remainingLetters = params.slice(1);

  return firstLetterCap + remainingLetters;
  // Freecodecamp
};

export const truncateString = (str: string, maxLength: number, useEllipsis = true) => {
  if (str.length <= maxLength) {
    return str;
  }

  const ellipsis = useEllipsis ? "..." : "";
  return str.slice(0, maxLength - ellipsis.length) + ellipsis;
};
