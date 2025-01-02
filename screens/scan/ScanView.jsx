import React, { useState } from "react";
import { CameraView, CameraType } from "expo-camera";
import { Box, Button, ButtonGroup, Icon, Spinner } from "@gluestack-ui/themed";
import { CameraIcon, CameraOff, Focus } from "lucide-react-native";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Toast, ToastTitle, ToastDescription } from "@gluestack-ui/themed";
import { CameraDirections } from "expo-camera";
import { ScanBarcodeIcon } from "lucide-react-native";
import { router } from "expo-router";

const ScanView = ({
  scanCallback,
  mutateCallBack,
  mutationOutcomes,
  ...props
}) => {
  const [scannedData, setScannedData] = useState(null);
  const [cameraDirection, setCameraDirection] = useState(CameraDirections.back);

  const {
    data: result,
    error,
    isLoading,
  } = useQuery(["scannedData", scannedData], () => scanCallback(scannedData), {
    enabled: !!scannedData,
  });

  const { mutate } = useMutation(mutateCallBack, mutationOutcomes);

  const handleConfirm = (confirmedData) => {
    console.log("Restocking:", confirmedData);
    mutate(confirmedData);
    setScannedData(null);
  };

  if (error) {
    //console.log error and reset scannedData
    console.error("Error scanning data:", error);
    setScannedData(null);
  }

  const toggleCamera = () => {
    setCameraDirection((prev) =>
      prev === CameraDirections.back
        ? CameraDirections.front
        : CameraDirections.back
    );
  };

  return (
    <Box>
      <CameraView
        type={CameraType[cameraDirection]}
        onBarCodeScanned={({ data }) => {
          setScannedData(data);
        }}
        {...props}
      />
      {result && (
        <Box>
          <Toast variant="outline" action="success">
            <ToastTitle>
              Scanned:{" "}
              {result?.title ??
                result?.name ??
                result?.product ??
                "Is this what you're looking for?"}
            </ToastTitle>
            <ToastDescription>Confirm Product</ToastDescription>
            <HStack space={2}>
              <Button
                action="positive"
                isFocused={true}
                onPress={
                  handleConfirm(result) //mutate confirmed product data with mutate function
                }
              >
                Restock
              </Button>
              <Button
                onPress={() =>
                  router.push(
                    `${result.route}` /** TODO: set up product route later */
                  )
                }
              >
                Go to Item
              </Button>
            </HStack>
          </Toast>
        </Box>
      )}

      {isLoading && scannedData && (
        <Toast variant="outline" action="info" duration={3000}>
          <ToastTitle>
            <Spinner size={"xs"} />
            <ScanBarcodeIcon /> Finding Matching Product
          </ToastTitle>
          <Button
            onPress={() => {
              setScannedData(null);
              router.push("product/search");
            }}
          >
            {" "}
            <Icon as={Focus} size="xs" /> Search Instead
          </Button>
        </Toast>
      )}
      {error && (
        <Toast>
          <ToastTitle>
            <CameraOff /> Error Scanning
          </ToastTitle>
          <ToastDescription>{error.message}</ToastDescription>
          <Button onPress={() => setScannedData(null)}>Retry</Button>
        </Toast>
      )}
      <ButtonGroup>
        <Button onPress={toggleCamera}>
          <CameraIcon /> Toggle Camera
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default ScanView;
