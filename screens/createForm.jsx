import React, { useState } from "react";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useTheme } from "@gluestack-style/react";

/**
 * createForm Factory Function
 *
 * @param {Object} config - Configuration for the form.
 * @param {string} config.title - The title of the form.
 * @param {string} config.description - The description of the form.
 * @param {Array} config.fields - Array of field objects with properties for each field.
 * @param {React.ComponentType} ButtonGroup - Custom button group component for form actions.
 * @returns {React.ComponentType} - A Higher-Order Component (HOC) that renders the form.
 */
export function createForm({ title, description, fields }, ButtonGroup) {
  return function FormComponent() {
    const { theme } = useTheme();
    const [formData, setFormData] = useState(
      fields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || "" }), {})
    );

    const handleInputChange = (name) => (value) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
      <Center className="rounded-xl bg-background-0 p-8 m-6 web:max-w-[400px]">
        <Heading size="xl">{title}</Heading>
        <Text className="text-center leading-[22px] my-2">{description}</Text>

        {fields.map((field) => {
          const InputComponent = field.type || Input; // Default to Input if no type is specified

          return (
            <InputComponent
              key={field.name}
              {...(field.props || {})} // Custom props for the field
              value={formData[field.name]} // Controlled input value
              onChangeText={handleInputChange(field.name)} // Handle input changes
              className={field.className || "w-full rounded-full my-3"}
            >
              {field.placeholder && <InputField placeholder={field.placeholder} />}
              {field.icon && (
                <InputSlot className="pr-3">
                  <InputIcon as={field.icon} color={field.iconColor || theme.InputIcon.color} />
                </InputSlot>
              )}
            </InputComponent>
          );
        })}

        {ButtonGroup && <ButtonGroup formData={formData} />}
      </Center>
    );
  };
}
