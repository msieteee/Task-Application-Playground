import styled from "styled-components";

interface ObjectStyle {
  [key: string]: string | number;
}

interface ButtonProps {
  label: string;
  buttonStyles?: ObjectStyle;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}

interface StyledButtonProps {
  styles?: ObjectStyle;
}

const StyledButton = styled.button(({ styles }: StyledButtonProps) => {
  return {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.2s ease-in-out",

    "&:hover": {
      filter: "brightness(0.9)",
    },
    "&:active": {
      filter: "brightness(1.1)",
    },

    ...styles,
  };
});

const Button = ({
  label,
  onClick,
  buttonStyles,
  type = "button",
}: ButtonProps) => {
  return (
    <StyledButton styles={buttonStyles} onClick={onClick} type={type}>
      {label}
    </StyledButton>
  );
};

export default Button;
