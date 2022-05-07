import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/userAction";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiHome, FiMenu,FiChevronDown } from "react-icons/fi";

import { TiTickOutline } from "react-icons/ti";
import { RiStickyNoteLine } from "react-icons/ri";
import {
  MdOutlineAssignmentInd,
  MdOutlinePendingActions,
  MdNotificationsActive,
} from "react-icons/md";
import { VscReport } from "react-icons/vsc";
import { SiReadthedocs } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LinkItems = [
  { name: "Home", url: "/home", icon: FiHome },
  {
    name: "All Projects",
    url: "/projects",
    icon: SiReadthedocs,
  },
  { name: "Create a Project", url: "/create-project", icon: RiStickyNoteLine },
  { name: "Completed Tasks", url: "/completed-tasks", icon: TiTickOutline },
  { name: "Active Tasks", url: "/active-tasks", icon: MdNotificationsActive },

  {
    name: "Pending Tasks",
    url: "/pending-tasks",
    icon: MdOutlinePendingActions,
  },
  {
    name: "Assignee Tasks",
    url: "/assigned-tasks",
    icon: MdOutlineAssignmentInd,
  },
  { name: "Reporter Tasks", url: "/reporter-tasks", icon: VscReport },
];

const AppWrapper = (Components) =>
  function HOC() {
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
       <ToastContainer/>
      
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
          <Components />
        </Box>
      </Box>
      </>
    );
  };

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Nile Tasks
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <RouterLink to={link.url} key={link.url}>
          <NavItem icon={link.icon}>{link.name}</NavItem>
        </RouterLink>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logout());
    localStorage.setItem("token", "");
    toast.success('Logout Successfully', {
      autoClose: 1000,
      toastId: "todoerror1",
    });
    navigate('/')
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Nile Tasks
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{localStorage.getItem("userEmail")}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={signOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default AppWrapper;
