import { Camera, useCameraPermission } from "expo-camera";
import { useState } from "react";
import { Box, Center, Button, HStack, Spinner } from "@gluestack-ui/themed";
import { Button, ButtonGroup, ButtonSpinner } from "@gluestack-ui/themed";
import {
  Toast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";
import {    CameraOff, ScanBarcodeIcon } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import { ButtonText } from "@gluestack-ui/themed";
import ScanView from "./ScanView";
import { isLoading } from "expo-font";

/** ScanViewLayout
 * General layout for the scan view to scan barcodes and QR codes.
 * @param {*ReactElement} children
 * @param {*props} props
 */
const ScanViewLayout = (children, { props }) => {

  const [cameraStatus, setCameraStatus] = useState(false); //if truthy, render camera layout view
  const [cameraPermissions, requestCameraPermissions] = useCameraPermission();
  const { router } = useRouter();

  const hasCamera = Camera.isAvailableAsync()
  if (!hasCamera) throw new Error ('Camera not available');

  //handle camera permissions not granted
  if (!cameraPermissions) {
    return (
      <Toast placement={(Platform.OS === "web")? "top" : "bottom"}>
        <HStack space="lg">
          <ToastTitle>
            Icon={<CameraOff />}
            Camera Permissions Disabled
          </ToastTitle>
          <Button onPress={requestCameraPermissions}>
            <ToastDescription>Please allow Camera Permissions</ToastDescription>
          </Button>
        </HStack>
        <ToastDescription />
      </Toast>
    );
  }
  //handle if an error occurs from retrieving data using scanned data
  if (error || !newData) {
    return (
      <Toast>
        <ToastTitle>
          Icon={<CameraOff />}
          Error
        </ToastTitle>
        <ToastDescription>
          {error.message ?? `No results found from scanned data`}
        </ToastDescription>
      </Toast>
    );
  }

  if (isLoading) {
    return cameraStatus ? (
      <ScanView {...props.cameraProps} />
    ) : (
      <Center>
        <HStack>
          <Spinner size="md" />
          <Text size="md">Please Wait</Text>
        </HStack>
      </Center>
    );
  }

  //render camera view
  return cameraStatus ? (
    <ScanView {...props.cameraProps} />
  ) : (
    //render scan button
    <HStack space="md">
      <Button
        onPress={() => {
          setCameraStatus(true);
        }}
        isDisabled={loading || isLoading}
      >
        <ButtonText>{router.options.scanButtonText ?? "Scan"}</ButtonText>
        <ButtonIcon as={ScanBarcodeIcon} />
      </Button>
      {
        // render children(?) eg. for additional user action on the scanned data (eg. confirm scanned data) or mutate the scanned data
        //TODO: determine if children is needed
        children
      }
    </HStack>
  );
};
export default ScanViewLayout;
