import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@gluestack-style/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { VStack, Center, Heading, Text, Button, Input, InputField, Box } from "@/components/ui";
import { router } from "expo-router";

/**
 * Factory function that creates a controlled form component using the provided schema, fields, title, description, and onSubmit handler.
 */
export default function createControlledForm({ schema, fields, title, description, onSubmit }) {
  return function ControlledFormComponent() {
    const { theme } = useTheme();
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
    });
    const inputRefs = useRef({}); // Stores refs for each input

    const handleFocus = (name) => {
      inputRefs.current[name]?.scrollIntoView({ behavior: "smooth" });
      inputRefs.current[name]?.focus();
    };

    const createButton = (onPressFunction, label, variant = "solid", action = "primary", size = "md", ButtonIcon=null, ButtonSpinner=false) => (
      <Button variant={variant} onPress={onPressFunction} action={action} size={size}>
        <Text className={`${theme.text.color} font-semibold`}>{label}</Text>
        {ButtonSpinner && <ButtonSpinner className="ml-2" />}
        {ButtonIcon && <ButtonIcon className="mr-2" as={ButtonIcon}/>}
      </Button>
    );

    const submitButton = createButton(handleSubmit(onSubmit), "Submit");
    const cancelButton = createButton(() => router.back(), "Back to login", "link");

    return (
      <Center>
        <Box className="p-5 max-w-96 border border-background-300 rounded-lg">
          <VStack className="pb-4" space="xs">
            <Heading className="leading-[30px]">{title}</Heading>
            <Text className="text-sm">{description}</Text>
          </VStack>
          <VStack space="xl" className="py-2">
            {fields.map((field) => (
              <Controller
                key={field.name}
                name={field.name}
                control={control}
                defaultValue={field.defaultValue || ""}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input isInvalid={!!errors[field.name]}>
                    <InputField
                      ref={(el) => (inputRefs.current[field.name] = el)}
                      placeholder={field.placeholder}
                      value={value}
                      onChangeText={onChange}
                      onBlur={(e) => {
                        onBlur(e);
                        handleFocus(field.name);
                      }}
                      returnKeyType="done"
                    />
                    {errors[field.name] && (
                      <Text className="text-red-500">{errors[field.name].message}</Text>
                    )}
                  </Input>
                )}
              />
            ))}
          </VStack>
          <VStack space="md" className="pt-4">
            {submitButton}
            {cancelButton}
          </VStack>
        </Box>
      </Center>
    );
  };
}
