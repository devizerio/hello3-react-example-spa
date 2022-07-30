import React from "react";

import "./Button.css";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button: React.FC<Props> = (props) => {
  const { children, onClick } = props;
  return (
    <div onClick={onClick} className="button">
      {children}
    </div>
  );
};
