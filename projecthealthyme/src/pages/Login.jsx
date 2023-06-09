import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import { useToast } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";

function Login({ isLoggedIn }) {
  const toast = useToast();

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      // backdropInvert="20%"
      backdropBlur="10px"
    />
  );

  const { isAuth, setIsAuth, authState, setIsAuthState, loginUser } =
    useContext(AuthContext);

  // console.log("authstate", authState.isAuth);
  // console.log("token", authState.token);


  console.log("authLogin",isAuth)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  console.log("checkLoginStatus", loginStatus);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch(`https://645d4803e01ac61058a174ca.mockapi.io/users`);
    let data = await res.json();
    console.log(data);

    const users = data;

    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      // console.log("user", user);
      console.log("LoggedIn");
      isLoggedIn(user);
      // login(user);
      // loginUser(true)
      // setLoginStatus(true)
      // console.log("checkLogin Status" , loginStatus)
      // console.log("nowAuth", authState.isAuth);
      // console.log("nowToken", authState.token);
      setIsAuth(true);
      console.log("authAfterLogin", isAuth)

      toast({
        title: "Logged In",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      await navigate("/");
    } else {
      console.log("error");
      setLoginStatus(false);
      toast({
        title: "Wrong Credentials",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  // console.log(isAuth , "isAuth")

  return (
    <>
      <Button
        // ml="4"
        fontSize="12px"
        p={6}
        bg="rgb(80,133,104)"
        variant="solid"
        boxShadow="base"
        color="white"
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
        _hover={{boxShadow : "rgba(0, 0, 0, 0.35) 0px 5px 15px;"}}
      >
        Login
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent color="black">
          <ModalHeader width="100%" color="white" bg="black">
            Login
          </ModalHeader>
          <ModalCloseButton color="white" />
          {/* <ModalBody>
                <Text>Custom backdrop filters!</Text>
              </ModalBody> */}
          {/* <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter> */}
          <form onSubmit={handleSubmit}>
            <FormControl bg="black" p={10} margin="auto">
              <FormLabel fontSize="20px" color="white">
                Email
              </FormLabel>
              <Input
                type="text"
                name="username"
                color="white"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <FormLabel fontSize="20px" color="white">
                Password
              </FormLabel>
              <Input
                type="password"
                color="white"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {/* <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
            </InputRightElement> */}
              {/* <Input type = "submit" /> */}
              <Button
                type="submit"
                bgGradient="linear( rgb(51,99,100), rgb(167,210,137))"
                mt={5}
                width="100%"
                _hover={{boxShadow : "rgba(0, 0, 0, 0.35) 0px 5px 15px;"}}
                // onClick={handleSubmit}
              >
                Login
              </Button>

              <Text textAlign="center" color="white" mt="10px">
                If not an existing user{" "}
                <Link to="/signup">
                  <u>SignUp</u>
                </Link>
              </Text>
              {loginStatus == false ? <p color="white">Invalid</p> : null}
            </FormControl>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Login;
