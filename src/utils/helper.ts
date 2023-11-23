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
