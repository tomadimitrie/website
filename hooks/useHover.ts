import { CSSProperties, useState } from "react";

export function useHover(
  styleOnHover: CSSProperties,
  styleOnNotHover: CSSProperties = {},
) {
  const [style, setStyle] = useState(styleOnNotHover);
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setStyle({ ...styleOnNotHover, ...styleOnHover });
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setStyle(styleOnNotHover);
    setIsHovered(false);
  };

  return { props: { style, onMouseEnter, onMouseLeave }, isHovered };
}
