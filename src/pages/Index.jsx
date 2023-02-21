import React, { SimpleGrid, Box, Card, CardHeader, Heading, CardBody, Text, Divider, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, ButtonGroup } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import EmailEditor from 'react-email-editor';
import { useAPI } from '../providers/APIProvider';
import { showToast } from '../services/helper';

const Pages = () => {
    const { getPages, createPage, updatePage } = useAPI();
    const { isOpen, onOpen, onClose, getButtonProps } = useDisclosure();
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(null);
    const [pages, setPages] = useState([]);

    const emailEditorRef = useRef(null);

    useEffect(() => {
        fetchPages();
    }, []);

    const loadDesign = () => {
        if (currentPage && pages?.length) {
            const template = pages.find(p => parseInt(p.id) === parseInt(currentPage));
            if (template) {
                emailEditorRef.current.editor.loadDesign(JSON.parse(template.data));
            }
        }
    };

    const saveDesign = () => {
        emailEditorRef.current.editor.saveDesign((data) => {
            setIsLoading(true);
            const _fn = currentPage ? updatePage : createPage;
            const _data = { data: JSON.stringify(data) };
            if (currentPage) {
                _data.id = currentPage;
            }
            _fn(_data)
                .then((response) => {
                    showToast(response.data.message, '', 'success');
                    _onClose();
                    setTimeout(() => {
                        fetchPages();
                    }, 1000);
                })
                .catch((error) => {
                    showToast(error?.response?.data?.error || error.message, '', 'error');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        });
    };

    const fetchPages = () => {
        setIsFetching(true);
        getPages()
            .then((response) => {
                setPages(response.data.pages);
            })
            .catch((error) => {
                showToast(error?.response?.data?.error || error.message, '', 'error');
            })
            .finally(() => {
                setIsFetching(false);
            });
    };

    const _onClose = () => {
        setCurrentPage(null);
        onClose();
    };

    useEffect(() => {
        if (currentPage) {
            onOpen();
        }
    }, [currentPage]);

    return (
        <>
            <Card size="md" width="100%" height="100%" textAlign="start">
                <CardHeader>
                    <Heading size='md' display="flex" justifyContent="space-between">
                        Pages
                        <Button colorScheme='teal' size='sm' ms={5} onClick={onOpen}>
                            Create
                        </Button>
                    </Heading>
                    <Divider mt={5} />
                </CardHeader>
                <CardBody>
                    {pages.length === 0 ? (
                        <Text textAlign="center" fontSize="md">No pages to display</Text>
                    ) : (
                        <SimpleGrid columns={3} spacing={4}>
                            {pages.map((page) => (
                                <Box key={page.id} w="100%" h="100%" p={4} borderWidth='1px' borderRadius='lg' overflow='hidden' display="flex" justifyContent="space-between">
                                    <>Page {page.id}</>
                                    <Button colorScheme='yellow' size='sm' ms={5} onClick={() => {
                                        setCurrentPage(page.id);
                                    }}>
                                        Edit
                                    </Button>
                                </Box>
                            ))}
                        </SimpleGrid>
                    )}
                </CardBody>
            </Card>
            <Modal onClose={_onClose} size='xl' isOpen={isOpen} isCentered={true}>
                <ModalOverlay />
                <ModalContent maxWidth="90%">
                    <ModalHeader>Create Page</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <EmailEditor ref={emailEditorRef} onLoad={loadDesign} />
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup spacing='6'>
                            <Button onClick={_onClose}>Close</Button>
                            <Button colorScheme='blue' onClick={saveDesign}
                                isLoading={isLoading}
                                loadingText={`${currentPage ? 'Updating' : 'Saving'}...`}>{currentPage ? 'Update' : 'Save'}</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Pages;