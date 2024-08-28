import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TextareaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  icon: JSX.Element;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  icon,
}) => (
  <div className="mb-4">
    <Label className="block text-sm font-medium mb-2 text-gray-700 flex items-center">
      {icon}
      <span className="ml-2">{label}</span>
    </Label>
    <Textarea
      name={name}
      placeholder={label}
      className="w-full border-gray-300 focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextareaField;
