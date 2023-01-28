import { Heading, Flex, Text, useColorModeValue, SimpleGrid } from "@chakra-ui/react";
import Rhymereturn from "./Rhymereturn";

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
  const bg = useColorModeValue("gray.200", "gray.600");

  return (
    <Flex
      direction="column"
      w="45vw"
      maxH="80vh"
      position="fixed"
      top="10vh"
      right="2vw"
    >
      <SimpleGrid minChildWidth='12.5%' position="relative" top="0">
        {rhy && rhymes.length > 0 && <Text fontSize="lg" fontStyle='italic' marginBottom='1vh'>Rhymes</Text>}
        {sdl && soundAlikes.length > 0 && (
          <Text fontSize="lg" fontStyle='italic' marginBottom='1vh'>Sound Alikes</Text>
        )}
        {adj && adjectives.length > 0 && <Text fontSize="lg" fontStyle='italic' marginBottom='1vh'>Adjectives</Text>}
        {noun && nouns.length > 0 && <Text fontSize="lg" fontStyle='italic' marginBottom='1vh'>Nouns</Text>}
        {rlwd && words.length > 0 && <Text fontSize="lg" fontStyle='italic' marginBottom='1vh'>Related Words</Text>}
        {syn && synonyms.length > 0 && <Text fontSize="lg" fontStyle='italic' marginBottom='1vh'>Synonyms</Text>}
        {ant && antonyms.length > 0 && <Text fontSize="lg" fontStyle='italic' marginBottom='1vh'>Anotonyms</Text>}
        {fqfl && freqFollowers.length > 0 && (
          <Text fontSize="lg" fontStyle='italic' marginBottom='1vh'>Frequent Followers</Text>
        )}
      </SimpleGrid>
      <SimpleGrid maxH="70vh" overflowY="auto" bg={bg} rounded="xl" justify="center" minChildWidth='12.5%'>
        {rhy && rhymes.length > 0 && (
          <Rhymereturn isLoaded={rhyLoaded} array={rhymes} />
        )}
        {sdl && soundAlikes.length > 0 && (
          <Rhymereturn isLoaded={sdlLoaded} array={soundAlikes} />
        )}
        {adj && adjectives.length > 0 && (
          <Rhymereturn isLoaded={adjLoaded} array={adjectives} />
        )}
        {noun && nouns.length > 0 && (
          <Rhymereturn isLoaded={nounsLoaded} array={nouns} />
        )}
        {rlwd && words.length > 0 && (
          <Rhymereturn isLoaded={wordsLoaded} array={words} />
        )}
        {syn && synonyms.length > 0 && (
          <Rhymereturn isLoaded={synLoaded} array={synonyms} />
        )}
        {ant && antonyms.length > 0 && (
          <Rhymereturn isLoaded={antLoaded} array={antonyms} />
        )}
        {fqfl && freqFollowers.length > 0 && (
          <Rhymereturn isLoaded={fqflLoaded} array={freqFollowers} />
        )}
      </SimpleGrid>
      <Heading position="relative" bottom="0">
        Suggested Words
      </Heading>
    </Flex>
  );
}

export default Rhymebar;
