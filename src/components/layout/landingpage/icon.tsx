// import { icons } from "lucide-react";
import * as icons from "lucide-react";


export const Icon = ({
  name,
  color,
  size,
  className,
}: {
  name: keyof typeof icons;
  color: string;
  size: number;
  className?: string;
}) => {
  const LucideIcon = icons[name as keyof typeof icons] as React.ElementType;

  return <LucideIcon color={color} size={size} className={className} />;
};
