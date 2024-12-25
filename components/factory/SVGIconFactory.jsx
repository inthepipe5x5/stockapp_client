import React from 'react';
import { createIcon } from 'gluestack-ui';
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import { useStyled } from '@gluestack-style/react';

/**
 * Helper function to create a viewBox value for an SVG Icon.
 * @param {number} minWidth - Minimum width of the viewBox.
 * @param {number} maxWidth - Maximum width of the viewBox.
 * @param {number} minHeight - Minimum height of the viewBox.
 * @param {number} maxHeight - Maximum height of the viewBox.
 * @returns {string} - A string value for the viewBox attribute of an SVG Icon.
 */
const viewBoxValueCreator = (minWidth = 0, maxWidth = 48, minHeight = 0, maxHeight = 48) =>
  `${minWidth} ${minHeight} ${maxWidth} ${maxHeight}`;

/** 
 * SVGIconFactory - A factory function that creates an SVG Icon component based on the provided SVG paths.
 * @param {Object} params - Configuration options for the SVG Icon.
 * @param {Array} params.svgPaths - Array of path definitions for the SVG.
 * @param {string} [params.viewBox] - Custom viewBox value for the SVG.
 * @param {boolean} [params.renderWebSVG=true] - Whether to render the web SVG version.
 * @returns {React.Component} - The generated SVG Icon component.
 */
const SVGIconFactory = ({ svgPaths, viewBox, renderWebSVG = isWeb(), ...props }) => {
  const styled = useStyled();
  const fillColor = styled?.config?.tokens?.color?.text ?? "#bdbdbd"; // Default text color
  
  if (!svgPaths || !Array.isArray(svgPaths) || svgPaths.length === 0) {
    console.error('svgPaths is a mandatory parameter and should be a non-empty array');
    return null;
  }

  // Determine viewBox based on platform if not provided
  viewBox = viewBox ?? (renderWebSVG
    ? viewBoxValueCreator(0, 24, 0, 24)
    : viewBoxValueCreator(0, 48, 0, 48)
  );

  // Default props for path elements
  const {pathProps} = props || {}; // Extract pathProps from props if provided so that props can be directly passed into createIcons
  const mergedPathProps = { fill: fillColor, ...pathProps };

  if (renderWebSVG) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        {...props}
      >
        {svgPaths.map((path, index) => (
          <path key={index} d={path} {...mergedPathProps} />
        ))}
      </svg>
    );
  }

  const CustomIcon = createIcon({
    viewBox,
    path: (
      <>
        {svgPaths.map((path, index) => (
          <path key={index} d={path} {...mergedPathProps} />
        ))}
      </>
    ),
    ...props, //directly pass in the props
  });

  return <CustomIcon {...props} />;
};

export { SVGIconFactory, viewBoxValueCreator };
