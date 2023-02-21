import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

export const showToast = (
  title,
  description = '',
  status = 'info',
  duration = 3000
) => {
  toast({
    title,
    description,
    status,
    duration,
    position: 'bottom-right',
    isClosable: true,
  });
};
