import { VStack, Badge, Heading } from "@chakra-ui/react";
import { useState, useEffect } from 'react';

function Tags({ notesList, handleTagClick, activeTag }) {
  const [sortedTags, setSortedTags] = useState();
  const sortTagsList = (array) => {
    let sortTags = [];
    for (let i = 0; i < array.length; i++) {
      const tags = array[i].tags;
      for (let j = 0; j < tags.length; j++) {
        if (!sortTags.some(tag => tag.name === tags[j].name)) {
          sortTags.push(tags[j]);
        }
      }
    }
    return sortTags;
  };

  useEffect(() => {
    setSortedTags(sortTagsList(notesList))
  }, [notesList])

  return (
    <VStack direction="column" align="center" w="20vw">
      <Heading>Active Tags</Heading>
      {sortedTags &&
        sortedTags.map((tag) => (
          <Badge
            variant={activeTag === tag.name ? "solid" : "outline"}
            colorScheme={tag.color}
            key={tag._id}
            onClick={() => handleTagClick(tag.name)}
            w="18vw"
            h={50}
            fontSize="1.85vw"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {tag.name}
          </Badge>
        ))}
    </VStack>
  );
}

export default Tags;
