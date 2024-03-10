import React, { useState } from "react";
import { ChakraProvider, Box, Flex, VStack, Input, IconButton, Heading, Text, Button, Divider, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { FaPlus, FaSignOutAlt, FaCog, FaInfoCircle, FaTachometerAlt } from "react-icons/fa";

const DUMMY_USER = {
  username: "miwink",
  password: "password",
};

const NavBar = ({ onLogout }) => (
  <Flex direction="column" p={5} w="200px" h="100vh" boxShadow="md">
    <Flex direction="column">
      <IconButton aria-label="dashboard" icon={<FaTachometerAlt />} mb={2} isFullWidth justifyContent="flex-start">
        Dashboard
      </IconButton>
      <IconButton aria-label="settings" icon={<FaCog />} mb={2} isFullWidth justifyContent="flex-start">
        Settings
      </IconButton>
      <IconButton aria-label="cool page" icon={<FaPlus />} mb={2} isFullWidth justifyContent="flex-start">
        Cool Page
      </IconButton>
      <IconButton aria-label="info" icon={<FaInfoCircle />} mb={2} isFullWidth justifyContent="flex-start">
        Info
      </IconButton>
    </Flex>
    <Divider my={4} />
    <IconButton aria-label="logout" icon={<FaSignOutAlt />} variant="outline" onClick={onLogout} justifyContent="flex-start">
      Logout
    </IconButton>
  </Flex>
);

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = () => {
    if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
      onLogin(true);
    } else {
      toast({
        title: "Error logging in",
        description: "Invalid username or password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <VStack spacing={4}>
        <Heading>Login</Heading>
        <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <InputGroup size="md">
          <Input pr="4.5rem" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </InputGroup>
        <Button colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Flex>
  );
};

import CompanyRow from "./CompanyRow.jsx";

const TodoPage = ({ onLogout }) => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Michael's shop",
      address: {
        street: "Station road",
        city: "Cambridge",
        postalCode: "CB1 1OP",
      },
    },
  ]);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  return (
    <Flex h="100vh">
      <NavBar onLogout={onLogout} />
      <Flex p={10} flex={1} direction="column">
        <InputGroup mb={4}>
          <Input placeholder="Add a new todo" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={addTodo}>
              Add
            </Button>
          </InputRightElement>
        </InputGroup>
        <VStack align="stretch" spacing={4}>
          {todos.map((todo, index) => (
            <Box key={index} p={2} shadow="md" borderWidth="1px">
              {todo}
            </Box>
          ))}
          <Text fontWeight="bold" mt={6} mb={4}>
            Companies
          </Text>
          {companies.map((company) => (
            <CompanyRow key={company.id} company={company} />
          ))}
        </VStack>
      </Flex>
    </Flex>
  );
};

const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return <ChakraProvider>{!loggedIn ? <LoginPage onLogin={setLoggedIn} /> : <TodoPage onLogout={() => setLoggedIn(false)} />}</ChakraProvider>;
};

export default Index;
