export function limitCharacters(text, charLimit) {
  if (text.length > 100 && charLimit) {
    if (text[99] === " ") {
      return text.substring(0, 99) + "...";
    } else {
      return text.substring(0, 100) + "...";
    }
  } else {
    return text;
  }
}
