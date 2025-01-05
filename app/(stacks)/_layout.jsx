// app/(stacks)/_layout.jsx
import { Stack } from "expo-router";

export default function StacksNavigator() {
  return (
    <Stack>
      <Stack.Screen
        name="[type].[id].overview"
        options={{ headerTitle: "Overview" }}
      />
      <Stack.Screen
        name="[type].[id].details"
        options={{ headerTitle: "Details" }}
      />
      <Stack.Screen name="[type].[id].edit" options={{ headerTitle: "Edit" }} />
      <Stack.Screen name="[type].[id].children" />
      <Stack.Screen name="[type].[id].new" options={{ headerTitle: "Add New" }}/>
      <Stack.Screen
        name="[type].[id].new"
        options={{ headerTitle: "Create New" }}
      />
      <Stack.Screen
        name="[type].[id].qr"
        options={{ headerTitle: "QR code" }}
      />
      <Stack.Screen name="[type].[id].scan" options={{ headerTitle: "Scan" }} />
    </Stack>
  );
}
