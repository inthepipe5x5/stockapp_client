import "./global.css";
import React, { useState } from "react";
import { SafeAreaView } from "@/components/ui/safe-area-view";

export default function FormLayout({ children }) {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      {children}
    </SafeAreaView>
  );
}
