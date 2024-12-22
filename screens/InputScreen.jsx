import "./global.css";
import React, { useState } from "react";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useTheme } from "@gluestack-style/react";
import { createForm } from "@/components/forms/createForm";

export default function App() {
  const { theme } = useTheme();
  const colorMode = theme.colors.mode;
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <GluestackUIProvider >
        {createForm(colorMode)}
      </GluestackUIProvider>
    </SafeAreaView>
  );
}

