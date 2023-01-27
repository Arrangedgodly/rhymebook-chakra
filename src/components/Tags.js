import { VStack, Badge, Heading, useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function Tags({ notesList, handleTagClick, activeTag }) {
  const bg = useColorModeValue("gray.200", "gray.900");
  const [sortedTags, setSortedTags] = useState();
  const sortTagsList = (array) => {
    let sortTags = [];
    for (let i = 0; i < array.length; i++) {
      const tags = array[i].tags;
      for (let j = 0; j < tags.length; j++) {
        if (!sortTags.some((tag) => tag.name === tags[j].name)) {
          sortTags.push(tags[j]);
        }
      }
    }
    return sortTags;
  };

  const checkTagLength = (str) => {
    const characterLimit = 20;
    if (str.length > characterLimit) {
      str = str.substr(0, characterLimit) + "...";
    }
    return str;
  };

  useEffect(() => {
    setSortedTags(sortTagsList(notesList));
  }, [notesList]);

  return (
    <VStack
      direction="column"
      align="center"
      justify="center"
      w="22vw"
      bg={bg}
      h="100vh"
      position="fixed"
      top="0"
      left="0"
      boxShadow='lg'
    >
      <Heading position="fixed" top="3vh">
        Active Tags
      </Heading>
      {sortedTags &&
        sortedTags.map((tag) => (
          <Badge
            variant={activeTag === tag.name ? "solid" : "outline"}
            colorScheme={tag.color}
            key={tag._id}
            onClick={() => handleTagClick(tag.name)}
            w="20vw"
            h={50}
            fontSize="1.45vw"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {checkTagLength(tag.name)}
          </Badge>
        ))}
    </VStack>
  );
}

export default Tags;
