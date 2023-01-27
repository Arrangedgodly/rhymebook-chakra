import {
  Skeleton,
  Table,
  Flex,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";

function Rhymebar({
  currentUser,
  rhymes,
  soundAlikes,
  adjectives,
  nouns,
  words,
  synonyms,
  antonyms,
  freqFollowers,
  rhymesLoaded,
  rhyLoaded,
  sdlLoaded,
  adjLoaded,
  nounsLoaded,
  wordsLoaded,
  synLoaded,
  antLoaded,
  fqflLoaded,
}) {
  const { rhy, sdl, adj, noun, rlwd, syn, ant, fqfl } = currentUser.preferences;
  const bg = useColorModeValue("gray.300", "gray.900");

  return (
    <TableContainer
      display="flex"
      textAlign="center"
      align="flex-start"
      justify="center"
      whiteSpace="wrap"
      w="45vw"
      position="fixed"
      top="10vh"
      right="2vw"
    >
      <Table variant="striped" size="lg" w="40vw">
        <TableCaption placement="bottom" fontSize="xl" marginBottom="3vh">
          Suggested Words
        </TableCaption>
        <Thead>
          <Tr>
            {rhy && rhymes.length > 0 && <Th fontSize="md">Rhymes</Th>}
            {sdl && soundAlikes.length > 0 && (
              <Th fontSize="md">Sound Alikes</Th>
            )}
            {adj && adjectives.length > 0 && <Th fontSize="md">Adjectives</Th>}
            {noun && nouns.length > 0 && <Th fontSize="md">Nouns</Th>}
            {rlwd && words.length > 0 && <Th fontSize="md">Related Words</Th>}
            {syn && synonyms.length > 0 && <Th fontSize="md">Synonyms</Th>}
            {ant && antonyms.length > 0 && <Th fontSize="md">Anotonyms</Th>}
            {fqfl && freqFollowers.length > 0 && (
              <Th fontSize="md">Frequent Followers</Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            {rhy && rhymes.length > 0 && (
              <Td>
                <Skeleton isLoaded={rhyLoaded} fadeDuration={2}>
                  <Flex
                    direction="column"
                    justify="flex-start"
                    align="flex-start"
                  >
                    {rhymes.map((rhyme) => (
                      <Text key={`rhyme-${rhyme.word}`}>{rhyme.word}</Text>
                    ))}
                  </Flex>
                </Skeleton>
              </Td>
            )}
            {sdl && soundAlikes.length > 0 && (
              <Td>
                <Skeleton isLoaded={sdlLoaded} fadeDuration={2}>
                  <Flex
                    direction="column"
                    justify="flex-start"
                    align="flex-start"
                  >
                    {soundAlikes.map((sound) => (
                      <Text key={`sound-${sound.word}`}>{sound.word}</Text>
                    ))}
                  </Flex>
                </Skeleton>
              </Td>
            )}
            {adj && adjectives.length > 0 && (
              <Td>
                <Flex
                  direction="column"
                  justify="flex-start"
                  align="flex-start"
                >
                  {adjectives.map((adjective) => (
                    <Text key={`adj-${adjective.word}`}>{adjective.word}</Text>
                  ))}
                </Flex>
              </Td>
            )}
            {noun && nouns.length > 0 && (
              <Td>
                <Flex
                  direction="column"
                  justify="flex-start"
                  align="flex-start"
                >
                  {nouns.map((n) => (
                    <Text key={`noun-${n.word}`}>{n.word}</Text>
                  ))}
                </Flex>
              </Td>
            )}
            {rlwd && words.length > 0 && (
              <Td>
                <Flex
                  direction="column"
                  justify="flex-start"
                  align="flex-start"
                >
                  {words.map((w) => (
                    <Text key={`related-${w.word}`}>{w.word}</Text>
                  ))}
                </Flex>
              </Td>
            )}
            {syn && synonyms.length > 0 && (
              <Td>
                <Flex
                  direction="column"
                  justify="flex-start"
                  align="flex-start"
                >
                  {synonyms.map((s) => (
                    <Text key={`syn-${s.word}`}>{s.word}</Text>
                  ))}
                </Flex>
              </Td>
            )}
            {ant && antonyms.length > 0 && (
              <Td>
                <Flex
                  direction="column"
                  justify="flex-start"
                  align="flex-start"
                >
                  {antonyms.map((a) => (
                    <Text key={`ant-${a.word}`}>{a.word}</Text>
                  ))}
                </Flex>
              </Td>
            )}
            {fqfl && freqFollowers.length > 0 && (
              <Td>
                <Flex
                  direction="column"
                  justify="flex-start"
                  align="flex-start"
                >
                  {freqFollowers.map((f) => (
                    <Text key={`freq-${f.word}`}>{f.word}</Text>
                  ))}
                </Flex>
              </Td>
            )}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default Rhymebar;
