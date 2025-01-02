import React, { useState } from "react";
import {
  VStack,
  Button,
  Menu,
  Icon,
  ButtonGroup,
  Center,
  Link,
  Spinner,
  Text,
  FlatList,
  Box,
} from "@gluestack-ui/themed";
import { SearchBar } from "@gluestack-ui/search";
import { SearchIcon } from "@gluestack-ui/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Group,
  ListFilter,
  ScanBarcode,
  ShoppingBasket,
  UserSearch,
} from "lucide-react-native";
import { useWindowDimensions } from "react-native";
import { router } from "expo-router";

/**
 * SearchScreen Component
 * 
 * A reusable and dynamic search screen for querying different categories of data.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.onSearch - A function or an object of functions to handle searches.
 * @param {string} props.title - Optional title for the search screen.
 * @returns {React.ReactNode} - SearchScreen component.
 */
const SearchScreen = ({ onSearch = {}, title, ...props }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("products");
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);

  const { width } = useWindowDimensions();

  /**
   * Determines the placement of the menu based on screen width.
   * @returns {string} - The placement of the menu.
   */
  const getMenuPlacement = () => (width < 768 ? "bottom" : "top");

  /**
   * Queries data based on the current search query and category.
   */
  const { data, error, isLoading } = useQuery(
    ["search", searchQuery, searchCategory],
    () => {
      const searchFn = onSearch[searchCategory];
      if (!searchFn) {
        console.warn(`No search function defined for category: ${searchCategory}`);
        return Promise.resolve([]);
      }
      return searchFn(searchQuery);
    },
    { enabled: !!searchQuery }
  );

  /**
   * Handles the search button click.
   */
  const handleSearch = () => {
    if (!searchQuery) return;
    console.log(`Searching "${searchQuery}" in "${searchCategory}"`);
  };

  return (
    <VStack space="md" p="$4" flex={1}>
      <Text size="2xl" bold>
        {title || `Search ${searchCategory !== "all" ? searchCategory : ""}`}
      </Text>

      {/* Search Input and Category Menu */}
      <Center>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search"
          {...props}
        />
        <ButtonGroup>
          <Button onPress={handleSearch} action="primary" variant="solid">
            <SearchIcon />
            <Text>Search</Text>
          </Button>
          <Menu
            isOpen={openCategoryMenu}
            onOpenChange={setOpenCategoryMenu}
            closeOnSelect={true}
            placement={getMenuPlacement()}
          >
            <Menu.Trigger>
              <Button
                onPress={() => setOpenCategoryMenu(!openCategoryMenu)}
                variant="outline"
              >
                <Icon as={ListFilter} />
              </Button>
            </Menu.Trigger>
            <Menu.Content>
              <Menu.Item onPress={() => setSearchCategory("all")}>
                All Categories
              </Menu.Item>
              <Menu.Item onPress={() => setSearchCategory("productItems")}>
                <Icon as={ShoppingBasket} mr="$2" />
                <Text>Products</Text>
              </Menu.Item>
              <Menu.Item onPress={() => setSearchCategory("user_inventories")}>
                <Icon as={Group} mr="$2" />
                <Text>Inventories</Text>
              </Menu.Item>
              <Menu.Item onPress={() => setSearchCategory("user_households")}>
                <Icon as={UserSearch} mr="$2" />
                <Text>Household Members</Text>
              </Menu.Item>
            </Menu.Content>
          </Menu>
        </ButtonGroup>
      </Center>

      {/* Loading State */}
      {isLoading && <Spinner size="md" />}

      {/* Error State */}
      {error && (
        <Text color="$red500">
          Error: {error.message || "Something went wrong. Please try again."}
        </Text>
      )}

      {/* Search Results */}
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <Box
              className="mt-auto"
              p="$3"
              borderBottomWidth={1}
              borderBottomColor="$gray200"
            >
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <Button
                variant="outline"
                action="primary"
                onPress={() => router.push(`/products/${item.id}`)}
                className="mt-2"
              >
                Details
              </Button>
            </Box>
          )}
          ListEmptyComponent={
            <Center flex={1}>
              <Text>No results found for "{searchQuery}".</Text>
            </Center>
          }
        />
      )}

      {/* Action Buttons */}
      <ButtonGroup mt="auto">
        <Button flex={1} leftIcon={<Icon as={ShoppingBasket} />}>
          View Cart
        </Button>
        <Button
          flex={1}
          leftIcon={<Icon as={ScanBarcode} />}
          onPress={() => router.push("/scan")}
        >
          Search With Scanner
        </Button>
      </ButtonGroup>
    </VStack>
  );
};

export default SearchScreen;
