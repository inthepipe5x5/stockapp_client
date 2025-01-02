import {
  VStack,
  Button,
  Menu,
  Icon,
  ButtonGroup,
  Center,
} from "@gluestack-ui/themed";
import { SearchBar } from "@gluestack-ui/search";
import { SearchIcon } from "@gluestack-ui/icons";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ListFilter, ShoppingBasket } from "lucide-react-native";
import { useWindowDimensions } from "react-native";

const SearchLayout = ({children, onSearch, ...props}) => {
    return (
        <VStack>
            {props.title}
            {children.searchInput}
            {children.RenderedResults}
        </VStack>
    )
};


export default SearchLayout;
