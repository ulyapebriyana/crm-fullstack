import React from "react";

const Subtitle = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  return <h3 className={`text-lg font-bold ${className}`}>{name}</h3>;
};

export default Subtitle;
