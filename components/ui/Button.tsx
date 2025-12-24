import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "purple" | "purple-filled";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm";
  
  const variantStyles = {
    primary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
    secondary:
      "bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 focus:ring-gray-400 shadow-sm",
    purple:
      "bg-white border focus:ring-primary-400 shadow-sm",
    "purple-filled":
      "focus:ring-primary-400 shadow-sm",
  };

  const purpleStyle = variant === "purple-filled"
    ? { backgroundColor: "#7F56D9", borderColor: "#7F56D9", color: "#FFFFFF" }
    : variant === "purple"
    ? { borderColor: "#7F56D9", color: "#7F56D9" }
    : {};

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={purpleStyle}
      onMouseEnter={(e) => {
        if (variant === "purple-filled") {
          e.currentTarget.style.backgroundColor = "#6945B3";
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "purple-filled") {
          e.currentTarget.style.backgroundColor = "#7F56D9";
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};

