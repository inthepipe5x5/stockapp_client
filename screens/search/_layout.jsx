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

const SearchBar = ({ onSearch, ...props }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("products");
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);

  const { width, height } = useWindowDimensions();
  const getMenuPlacement = () => {
    if (width < 768) {
      return "bottom"; // For smaller screens, open menu at the bottom
    } else {
      return "top"; // For larger screens, open menu at the top
    }
  };

  const { data, error, isLoading } = useQuery(
    ["search", searchQuery],
    () => onSearch(searchQuery),
    { enabled: !!searchQuery }
  );

  //   const handleSearch = () => {
  //     onSearch(searchQuery);
  //   };

  return (
    <VStack>
      <Center className="justify-items-center">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search"
          {...props}
        />
        <ButtonGroup>
          <Button onPress={handleSearch} action="primary" variant="solid">
            <SearchIcon />
            Search
          </Button>
          <Menu
            isOpen={openCategoryMenu}
            onOpenChange={setOpenCategoryMenu}
            closeOnSelect={true}
            placement={getMenuPlacement()}
          >
            <Menu.Button
              onPress={() => {
                setSearchCategory("all");
                setOpenCategoryMenu(!openCategoryMenu); //toggle menu open/close
              }}
            >
              {" "}
              //toggle menu
              <Icon as={ListFilter} />
            </Menu.Button>
            <Menu.Button onPress={() => setSearchCategory("products")}>
              <Icon as={ShoppingBasket} />
            </Menu.Button>
            <Menu.List>
              <Menu.Item>Settings</Menu.Item>
              <Menu.Item>Help</Menu.Item>
            </Menu.List>
          </Menu>
        </ButtonGroup>
      </Center>
      {isLoading && <Spinner />}
      {error && <Text>Error: {error.message}</Text>}
      {data && (
        <Center className="justify-items-center">
          <Text>Results:</Text>
          <VStack spacing={2}>
            {data.map((item) => (
              <Text key={item.id}>{item.name}</Text>
            ))}
          </VStack>
        </Center>
      )}
    </VStack>
  );
};

export default SearchBar;
