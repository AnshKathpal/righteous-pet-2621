import { Box, Input, useDisclosure, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../Context/CustomThemeProvider";
import { useContext } from "react";
import { SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import "../CSS/Navbar.css";
import { NavbarRes } from "../Components/NavbarRes";

import React from "react";

import {
  Flex,
  Spacer,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { ButtonGroup, Stack, HStack, VStack } from "@chakra-ui/react";
import { Logo } from "../Structure/Logo";
import Login from "../pages/Login";
import { useState } from "react";
import logoImage from "../Images/cropped.png";
import { Link } from "react-router-dom";
import { ToggleButton } from "../Structure/ToggleButton";

const links = [
  {
    path: "/",
    title: "TREATMENTS",
  },
  {
    path: "/blogs",
    title: "BLOGS",
  },
  {
    path: "/aboutus",
    title: "ABOUT US",
  },
  {
    path: "/contact",
    title: "CONTACT",
  },
  // {
  //   path: "/pressarticles",
  //   title: "PRESS ARTICLES",
  // },
  {
    path: "/cart",
    title: "CART",
  },
];

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [loginStatus, setLoginStatus] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);

  console.log(loginStatus);

  const defaultStyle = {
    color: "White",
  };

  const activeStyle = {
    color: "Black",
  };

  return (
    <Box
      // border="1px solid blue"
      bg="rgb(65,116,91)"
      w="100%"
      p={4}
      color="black"
      // display={{"390px":"none", md:"block"}}
      className="navBox"
    >
      <Box className="main">

      
      <Flex
        // border="1px solid red"
        className="main"
        minWidth="max-content"
        alignItems="center"
        gap="2"
      >
        <Box   p="2">
          {/* <Logo border="1px solid red" /> */}
          <Link to="/">
            <Image   w="250px" src={logoImage}></Image>
          </Link>
        </Box>
        <Spacer />
        <ButtonGroup  className="main">
          {links.map((item) => {
            return (
              <NavLink
                style={({ isActive }) =>
                  isActive ? activeStyle : defaultStyle
                }
                key={item.path}
                to={item.path}
              >
                <Button  className="main"
                  fontSize="12px"
                  p={6}
                  bg="rgb(80,133,104)"
                  variant="solid"
                  boxShadow="base"
                  _hover={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}
                >
                  {item.title}
                </Button>
              </NavLink>
            );
          })}

          {loginStatus ? (
            // <Notices userData={loginStatus} isLoggedIn={(e) => setLoginStatus(e)} />

            // <Button
            //   fontSize="12px"
            //   color="white"
            //   p={6}
            //   bg="rgb(80,133,104)"
            //   variant="solid"
            //   boxShadow="base"
            //   userData={loginStatus}
            //   isLoggedIn={(e) => setLoginStatus(e)}
            // >
            //   {loginStatus.name}
            // </Button>

            <ToggleButton  className="main"
              userData={loginStatus}
              isLoggedIn={(e) => setLoginStatus(e)}
            />
          ) : (
            // <h1 userData={loginStatus} isLoggedIn={(e) => setLoginStatus(e)}>{loginStatus.name}</h1>
            <Login isLoggedIn={(e) => setLoginStatus(e)} />
          )}

          <SunIcon
            w="50px"
            h="50px"
            fontSize="12px"
            p={6}
            onClick={toggleTheme}
            style={{
              // border: theme == "dark" ? "solid white" : "pink",
              color: theme == "dark" ? "black" : "white",
              background: theme == "dark" ? "rgb(65,116,91)" : "rgb(65,116,91)",
              padding: "5px",
            }}
          >
            Change Theme
          </SunIcon>
        </ButtonGroup>
      </Flex>
      </Box>
      <Box className = "displayHam" display={{md : "none"}}>
        <HamburgerIcon width="30px" height="30px" ref={btnRef} colorScheme="teal" onClick={onOpen}>
          Open
        </HamburgerIcon>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent color="white" bg = "rgb(80,133,104)">
            <DrawerCloseButton />
            <DrawerHeader><Link to="/">
            <Image   w="250px" src={logoImage}></Image>
          </Link></DrawerHeader>

            <DrawerBody>
            <Flex flexDirection="column">
            {links.map((item) => {
            return (
              <NavLink
                style={({ isActive }) =>
                  isActive ? activeStyle : defaultStyle
                }
                key={item.path}
                to={item.path}
              >
                <Button  mt="20px" className="main"
                  fontSize="12px"
                  p={6}
                  bg="rgb(80,133,104)"
                  variant="solid"
                  boxShadow="base"
                  _hover={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}
                >
                  {item.title}
                </Button>
              </NavLink>
            );
          })}
               </Flex>
            </DrawerBody>
       

            {/* <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter> */}
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
}
