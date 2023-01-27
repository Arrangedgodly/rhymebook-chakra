import {
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
      maxH='90vh'
      position='sticky'
      top='10vh'
      right='0'
    >
      <Table variant="striped" size="lg">
        <TableCaption placement="bottom" fontSize="xl">
          Suggested Words
        </TableCaption>
        <Thead>
          <Tr>
            {rhy && <Th fontSize="md">Rhymes</Th>}
            {sdl && <Th fontSize="md">Sound Alikes</Th>}
            {adj && <Th fontSize="md">Adjectives</Th>}
            {noun && <Th fontSize="md">Nouns</Th>}
            {rlwd && <Th fontSize="md">Related Words</Th>}
            {syn && <Th fontSize="md">Synonyms</Th>}
            {ant && <Th fontSize="md">Anotonyms</Th>}
            {fqfl && <Th fontSize="md">Frequent Followers</Th>}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            {rhy && (
              <Td>
                <Flex
                  direction="column"
                  justify="flex-start"
                  align="flex-start"
                >
                  {rhymes.map((rhyme) => (
                    <Text key={`rhyme-${rhyme.word}`}>{rhyme.word}</Text>
                  ))}
                </Flex>
              </Td>
            )}
            {sdl && (
              <Td>
                <Flex
                  direction="column"
                  justify="flex-start"
                  align="flex-start"
                >
                  {soundAlikes.map((sound) => (
                    <Text key={`sound-${sound.word}`}>{sound.word}</Text>
                  ))}
                </Flex>
              </Td>
            )}
            {adj && (
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
            {noun && (
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
            {rlwd && (
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
            {syn && (
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
            {ant && (
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
            {fqfl && (
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
