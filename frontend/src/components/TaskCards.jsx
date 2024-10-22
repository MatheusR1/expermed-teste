import { Box, CloseButton, Heading, Text } from '@chakra-ui/react';
import React from 'react';

function TaskCard({ task, statusMapping, onRemove }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} position="relative">
      <CloseButton 
        position="absolute" 
        top="8px" 
        right="8px" 
        onClick={() => onRemove(task.id)} 
        colorScheme="red" 
      />
      
      <Heading size="md" mb={2}>{task.title}</Heading>
      <Text>{task.description}</Text>
      <Text>Status: {statusMapping[task.status]}</Text>
    </Box>
  );
}

export default TaskCard;
