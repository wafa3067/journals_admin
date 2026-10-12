import React from "react";

type Props = {
  text: string;
  boldAfter?: string[]; // list of words — make next word bold after these
  style?: string;
  onTap?: React.MouseEventHandler;
};

const CustomNormalBold = ({ text, boldAfter = [], style, onTap }: Props) => {
  const words = text.split(" ");

  const formattedWords = words.map((word, index) => {
    const prevWord = words[index - 1];
    const shouldBold = boldAfter.includes(prevWord);

    if (shouldBold) {
      return (
        <React.Fragment key={index}>
          <b>{word}</b>{" "}
        </React.Fragment>
      );
    }
    return word + " ";
  });

  return (
    <p onClick={onTap} className={style}>
      {formattedWords}
    </p>
  );
};

export default CustomNormalBold;
