import { createForm, generateFields } from "@/components/forms/createForm";
import { Mail, User } from "lucide-react-native";
import { CustomButtonGroup } from "@/components/forms/CustomButtonGroup";
import { Input } from "@/components/ui/input";

// Define Field Configurations
const signUpFields = generateFields([
  {
    name: "email",
    type: Input,
    placeholder: "abc@example.com",
    icon: Mail,
    defaultValue: "",
  },
  {
    name: "username",
    type: Input,
    placeholder: "Your name",
    icon: User,
  },
]);
const signInFields = generateFields(signUpFields.slice(0, 1)); // login only requires email

// Button Actions
const signUpAction = (formData) => {
  console.log("Sign Up Data:", formData);
  // TODO: Implement Supabase sign-up logic
};

const signInAction = (formData) => {
  console.log("Sign In Data:", formData);
  // TODO: Implement Supabase sign-in logic
};

// Create Form Components
const signUpForm = createForm(
  {
    title: "Sign Up",
    description: "Create an account to get started!",
    fields: signUpFields,
  },
  () => (
    <CustomButtonGroup
      buttons={[
        { label: "Submit", action: signUpAction },
        { label: "Reset", action: () => console.log("Reset form") },
      ]}
    />
  )
);

const signInForm = createForm(
  {
    title: "Sign In",
    description: "Welcome back! Sign in to continue.",
    fields: signInFields,
  },
  () => (
    <CustomButtonGroup
      buttons={[
        { label: "Sign In", action: signInAction },
      ]}
    />
  )
);

export { signUpForm, signInForm };
