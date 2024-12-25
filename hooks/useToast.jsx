import { Toast, ToastDescription, useToast as useGluestackToast } from "@gluestack-ui/themed";
import { HStack, VStack, Button, Pressable, Icon } from "@gluestack-ui/themed";
import { HelpCircleIcon, CloseIcon } from "@gluestack-ui/icons";

const defaultToastStyles = {
  top: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  variant: "outline", // solid | outline | accent
};

const defaultToastProps = {
  title: "Toast",
  duration: 3000,
  description: "This is a toast message.",
  avoidKeyboard: true, // set to true if keyboard is opened, the Toast will move up equivalent to the keyboard height.
  placement: "top", // set to top or bottom
  action: "error", // set to error, warning, success, or info
  onCloseComplete: () => {}, // callback function when the Toast is closed to run side effects
};

const useToast = () => {
  const toast = useGluestackToast();

  const showToast = (props = {}) => {
    const mergedProps = { ...defaultToastProps, ...props };
    const { placement, ...restProps } = mergedProps;
    const styles = defaultToastStyles[placement];

    toast.show({
      ...restProps,
      style: styles,
    });
  };

  return { showToast };
};

export default useToast;
