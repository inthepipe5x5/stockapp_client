import { CameraView, CameraType, useCameraPermission } from "expo-camera";
import { useState } from "react";
import { Box, Center, Button, HStack, Spinner } from "@gluestack-ui/themed";
import { Button, ButtonGroup, ButtonSpinner } from "@gluestack-ui/themed";
import {
  Toast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";
import {
  CameraIcon,
  CameraOff,
  Scan,
  ScanBarcodeIcon,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import { ButtonText } from "@gluestack-ui/themed";
import { useQuery } from "@tanstack/react-query";

const CameraDirections = Object.freeze({
  back: "back",
  front: "front",
});

//helper function
const toggleCameraDirection = (cameraDirection) => {
  if (!cameraDirection || typeof cameraDirection !== "string") {
    return CameraDirections["back"];
  }
  return cameraDirection === CameraDirections["back"]
    ? CameraDirections["front"]
    : CameraDirections["back"];
};

//camera overlay for showing the camera and/or scanning barcodes
const ScanView = ({ props }) => {
    const [scannedData, setScannedData] = useState(null); //scanned data state
    const [loading, setLoading] = useState(false); //loading state eg. for mounting camera or resolving barcode scanning data
  const [cameraDirection, setCameraDirection] = useState(
    CameraDirections["back"]
  );
  const [cameraPermissions, requestCameraPermissions] = useCameraPermission();

    //make a query using the scanned data
    const {
        data: newData,
        error,
        isLoading,
      } = useQuery("scannedData", props.cameraProps.scanCallback(scannedData), {
        enabled: !!scannedData,
      });
    


  const defaultCameraProps = {
    mode: "picture",
    type: CameraType[cameraDirection],
    style: { flex: 1 },
    autoFocus: Platform.OS === "ios", //set autofocus, iOS only
    //barcode
    barcodeScannerSettings: {
      barcodeTypes: [
        "aztec",
        "ean13",
        "ean8",
        "qr",
        "pdf417",
        "upc_e",
        "datamatrix",
        "code39",
        "code93",
        "itf14",
        "codabar",
        "code128",
        "upc_a",
      ],
    },
  };
  return (
    <Box> 
      {/* CameraView */}
    <HeaderBackButton variant="X" />
    <CameraView

      {...props.cameraProps, defaultCameraProps}
      //handle camera ready /TODO: implement camera ready
      onCameraReady={() => {
        //ask for permissions if not set yet
        cameraPermissions ? requestCameraPermissions() : null;
        setLoading(false);
      }}
      //barcode
      onBarcodeScanned={(barcode) => {
        setScannedData(barcode);
        setLoading(true);
        props.cameraProps.scanCallback(barcode);
      }}
    >
    </CameraView>
    <ButtonGroup>
      <Button onPress={() => setCameraDirection(toggleCameraDirection)}>
        <CameraIcon />
      </Button>
      <Button onPress={() => {setCameraStatus(false)
          props.cameraProps.scanCallback(scannedData)
      }} isDisabled={loading}>
          <ButtonIcon as={CameraIcon} />
          {loading && <ButtonSpinner />}
      </Button>

    </ButtonGroup>
  </Box>);
};

export default ScanView;
export { CameraDirections };
