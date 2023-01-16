import {
  Table,
  Thead,
  Tbody,
  Tfoot,
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
    <TableContainer textAlign="center" alignItems="center">
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
          
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default Rhymebar;
