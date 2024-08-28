import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  readOnly?: boolean;
  icon: JSX.Element;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  readOnly = false,
  icon,
}) => (
  <div className="mb-4">
    <Label className="block text-sm font-medium mb-2 text-gray-700 flex items-center">
      {icon}
      <span className="ml-2">{label}</span>
    </Label>
    <Input
      type={type}
      name={name}
      placeholder={label}
      className="w-full border-gray-300 focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50"
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  </div>
);

export default InputField;
