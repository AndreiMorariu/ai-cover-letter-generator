function trimString(string) {
  const paragraphs = string.split("\n");
  let trimmedString = "";

  for (const paragraph of paragraphs) {
    const trimmedParagraph = paragraph.trim();
    if (trimmedParagraph !== "") {
      trimmedString += trimmedParagraph + "\n";
    }
  }

  return trimmedString;
}

export default trimString;
