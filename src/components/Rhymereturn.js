import { Skeleton, Flex, Text } from "@chakra-ui/react";

function Rhymereturn({ isLoaded, array }) {
  return (
    <Skeleton isLoaded={isLoaded} fadeDuration={5}>
      <Flex direction="column" justify="flex-start" align="center">
        {array.map((item) => (
          <Text fontSize="md" key={`item-${item.word}`} noOfLines={1} maxW='95%' margin='.35vh'>
            {item.word}
          </Text>
        ))}
      </Flex>
    </Skeleton>
  );
}

export default Rhymereturn;
