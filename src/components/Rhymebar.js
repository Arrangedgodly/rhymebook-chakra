import {
  Table,
  Flex,
  Thead,
  Tbody,
  Tfoot,
  Text,
  List,
  ListItem,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
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
  return (
    <TableContainer textAlign="center" alignItems="center" justifyContent='center'>
      <Table variant="simple">
        <TableCaption placement="top">Suggested Words</TableCaption>
        <Thead>
          <Tr>
            {rhy && <Th>Rhymes</Th>}
            {sdl && <Th>Sound Alikes</Th>}
            {adj && <Th>Adjectives</Th>}
            {noun && <Th>Nouns</Th>}
            {rlwd && <Th>Related Words</Th>}
            {syn && <Th>Synonyms</Th>}
            {ant && <Th>Anotonyms</Th>}
            {fqfl && <Th>Frequent Followers</Th>}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            {rhy && (
              <Td>
                <Flex direction='column' justify='flex-start' align='flex-start'>
                {rhymes.map(rhyme => (
                  <Text>{rhyme.word}</Text>
                ))}
                </Flex>
              </Td>
            )}
            {sdl && (
              <Td>
                <Flex direction='column' justify='flex-start' align='flex-start'>
                {soundAlikes.map(sound => (
                  <Text>{sound.word}</Text>
                ))}
                </Flex>
              </Td>
            )}
            {adj && (
              <Td>
                <Flex direction='column' justify='flex-start' align='flex-start'>
                {adjectives.map(adjective => (
                  <Text>{adjective.word}</Text>
                ))}
                </Flex>
              </Td>
            )}
            {noun && (
              <Td>
                <Flex direction='column' justify='flex-start' align='flex-start'>
                {nouns.map(n => (
                  <Text>{n.word}</Text>
                ))}
                </Flex>
              </Td>
            )}
            {rlwd && (
              <Td>
                <Flex direction='column' justify='flex-start' align='flex-start'>
                {words.map(w => (
                  <Text>{w.word}</Text>
                ))}
                </Flex>
              </Td>
            )}
            {syn && (
              <Td>
                <Flex direction='column' justify='flex-start' align='flex-start'>
                {synonyms.map(s => (
                  <Text>{s.word}</Text>
                ))}
                </Flex>
              </Td>
            )}
            {ant && (
              <Td>
                <Flex direction='column' justify='flex-start' align='flex-start'>
                {antonyms.map(a => (
                  <Text>{a.word}</Text>
                ))}
                </Flex>
              </Td>
            )}
            {fqfl && (
              <Td>
                <Flex direction='column' justify='flex-start' align='flex-start'>
                {freqFollowers.map(f => (
                  <Text>{f.word}</Text>
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
