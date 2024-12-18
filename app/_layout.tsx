import { StyleSheet, Text, View } from 'react-native'
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import React from 'react'
import { Slot } from 'expo-router'

const RootLayout = () => {
  return (
    <GluestackUIProvider mode="light"><View>
        <Text>RootLayout</Text>
      </View></GluestackUIProvider>
  );
}

export default RootLayout

const styles = StyleSheet.create({})