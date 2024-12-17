import React from "react";
import { View, Text, Button } from "react-native";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <View>
      <Text>Something went wrong:</Text>
      <Text>{error.message}</Text>
      <Button onPress={resetErrorBoundary} title="Try again" />
    </View>
  );
};

export default React.memo(ErrorFallback);
