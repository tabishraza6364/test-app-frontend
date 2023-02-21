import React from 'react';
import {
    ColorModeScript,
    ChakraProvider,
    Box,
    VStack,
    Grid,
    theme,
    Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useAPI } from '../providers/APIProvider';

const Layout = () => {
    const { signout } = useAPI();
    const { isAuthenticated } = useAuth();

    return (
        <>
            <ColorModeScript />
            <ChakraProvider theme={theme}>
                <Box textAlign="center" fontSize="xl">
                    <Grid minH="100vh" p={3} templateRows="min-content 1fr">
                        <Box textAlign="end">
                            <ColorModeSwitcher justifySelf="flex-end" />
                            {isAuthenticated() ? (
                                <Button colorScheme='red' size='sm' ms={5} onClick={signout}>
                                    Logout
                                </Button>
                            ) : null}
                        </Box>
                        <VStack spacing={8} mt={5}>
                            <Outlet />
                        </VStack>
                    </Grid>
                </Box>
            </ChakraProvider>
        </>
    );
};

export default Layout;