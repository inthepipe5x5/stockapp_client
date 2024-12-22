/**
 * Helper function to generate fields
 *
 * @param {Array} fieldConfigs - Array of field configurations.
 * @returns {Array} - Array of field objects.
 */
export function generateFields(fieldConfigs) {
  return fieldConfigs.map((config) => ({
    name: config.name,
    type: config.type || "text", // Default to Input if no type is specified
    placeholder: config.placeholder || "",
    icon: config.icon || null,
    iconColor: config.iconColor || null,
    defaultValue: config.defaultValue || "",
    className: config.className || "w-full rounded-full my-3",
    props: config.props || {}, // Custom props for the field
  }));
}
