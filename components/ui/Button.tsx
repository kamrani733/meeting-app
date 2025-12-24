import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "purple";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
    secondary:
      "bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 focus:ring-gray-400",
    purple:
      "bg-purple-400 border border-purple-500 text-purple-900 hover:bg-purple-500 focus:ring-purple-400",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

