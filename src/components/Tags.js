import {
  Wrap,
  WrapItem,
  Badge,
  useToast,
} from "@chakra-ui/react";

function Tags({ notesList, handleTagClick, activeTag }) {
  const sortTagsList = (array) => {
    let sortedTags = [];
    for (let i = 0; i < array.length; i++) {
      const tags = array[i].tags;
      for (let j = 0; j < tags.length; j++) {
        if (!sortedTags.includes(tags[j])) {
          sortedTags.push(tags[j])
        }
      }
      return sortedTags;
    }
  };
  const sortedTags = sortTagsList(notesList);
  return (
    <Wrap>
      {sortedTags && sortedTags.map(tag => (
        <WrapItem>
          <Badge
              variant={activeTag === tag.name ? "solid" : "outline"}
              colorScheme={tag.color}
              key={tag._id}
              onClick={() => handleTagClick(tag.name)}
            >
              {tag.name}
            </Badge>
        </WrapItem>
      ))}
    </Wrap>
  );
}

export default Tags;