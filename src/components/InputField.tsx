import styled from "styled-components";

interface ObjectStyle {
  [key: string]: string | number;
}

interface InputFieldProps {
  inputRef: React.RefObject<HTMLInputElement>;
  type: string;
  defaultValue?: string;
  label?: string;
  onChange?: (e) => void;
  placeholder: string;
  inputStyles?: ObjectStyle;
  isError?: boolean;
  maxLength?: number;
}

interface InputProps {
  styles?: ObjectStyle;
  isError?: boolean;
}

const StyledInput = styled.input(({ styles, isError = false }: InputProps) => {
  const errorStyles = isError
    ? {
        borderColor: "#D55B5B",
        boxShadow: `0 0 0 2px #F8E7E7`,
      }
    : {};

  return {
    padding: "8px 12px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#fff",
    outline: "none",
    transition: "all 0.2s ease-in-out",
    "box-sizing": "border-box",

    height: "40px",
    width: "100%",

    "&:focus": {
      borderColor: "#1877f2",
      boxShadow: "0 0 0 2px rgba(24, 119, 242, 0.2)",
    },

    ...errorStyles,

    ...styles,
  };
});

const InputLabel = styled.div({ maxWidth: "250px" });

const InputField = ({
  inputRef,
  type = "text",
  defaultValue,
  label,
  onChange,
  placeholder,
  inputStyles = {},
  isError = false,
  maxLength = 150,
}: InputFieldProps) => {
  return (
    <>
      {label && <InputLabel>{label}</InputLabel>}
      <StyledInput
        styles={inputStyles}
        ref={inputRef}
        type={type}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
        isError={isError}
        maxLength={maxLength}
      ></StyledInput>
    </>
  );
};

export default InputField;
