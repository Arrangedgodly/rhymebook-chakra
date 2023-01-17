import {
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  CheckboxGroup,
  Checkbox,
  Button,
  RadioGroup,
  Radio,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { useState } from "react";
import { updatePref } from "../utils/api";

function Preferences({ currentUser, handleAuth }) {
  const [rhy, setRhy] = useState(currentUser.preferences.rhy);
  const [sdl, setSdl] = useState(currentUser.preferences.sdl);
  const [adj, setAdj] = useState(currentUser.preferences.adj);
  const [noun, setNoun] = useState(currentUser.preferences.noun);
  const [rlwd, setRlwd] = useState(currentUser.preferences.rlwd);
  const [syn, setSyn] = useState(currentUser.preferences.syn);
  const [ant, setAnt] = useState(currentUser.preferences.ant);
  const [fqfl, setFqfl] = useState(currentUser.preferences.fqfl);
  const [engine, setEngine] = useState(currentUser.preferences.engine);
  const [max, setMax] = useState(currentUser.preferences.max);

  const handleRhy = (e) => {
    setRhy(e.target.checked);
  };

  const handleSdl = (e) => {
    setSdl(e.target.checked);
  };

  const handleAdj = (e) => {
    setAdj(e.target.checked);
  };

  const handleNoun = (e) => {
    setNoun(e.target.checked);
  };

  const handleRlwd = (e) => {
    setRlwd(e.target.checked);
  };

  const handleSyn = (e) => {
    setSyn(e.target.checked);
  };

  const handleAnt = (e) => {
    setAnt(e.target.checked);
  };

  const handleFqfl = (e) => {
    setFqfl(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePref(rhy, sdl, adj, noun, rlwd, syn, ant, fqfl, engine, max)
      .then(() => {
        handleAuth();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Flex align="center" justify="center">
      <FormControl w="75vw">
        <Flex direction="column" align="center" gap="2">
          <FormLabel fontSize="2xl">API Query Preferences</FormLabel>
          <CheckboxGroup>
            <Checkbox size="lg" onChange={handleRhy} defaultChecked={rhy}>
              Rhymes
            </Checkbox>
            <Checkbox defaultChecked={sdl} size="lg" onChange={handleSdl}>
              Sound Alikes
            </Checkbox>
            <Checkbox defaultChecked={adj} size="lg" onChange={handleAdj}>
              Adjectives
            </Checkbox>
            <Checkbox defaultChecked={noun} size="lg" onChange={handleNoun}>
              Nouns
            </Checkbox>
            <Checkbox defaultChecked={rlwd} size="lg" onChange={handleRlwd}>
              Related Words
            </Checkbox>
            <Checkbox defaultChecked={syn} size="lg" onChange={handleSyn}>
              Synonyms
            </Checkbox>
            <Checkbox defaultChecked={ant} size="lg" onChange={handleAnt}>
              Anotonyms
            </Checkbox>
            <Checkbox defaultChecked={fqfl} size="lg" onChange={handleFqfl}>
              Frequent Followers
            </Checkbox>
          </CheckboxGroup>
          <FormLabel fontSize="2xl">Engine Type</FormLabel>
          <RadioGroup onChange={setEngine} value={engine}>
            <HStack gap="5">
              <Radio value="topic">Broad</Radio>
              <Radio value="ml">Specific</Radio>
            </HStack>
          </RadioGroup>
          <FormHelperText>
            The broad engine will return more search results, while the specific
            engine triggers thematic responses with your title input{" "}
            {"(but less results)"}
          </FormHelperText>
          <FormLabel fontSize="2xl">Max Query Returns</FormLabel>
          <Slider aria-label="slider-ex-1" maxWidth='50%' defaultValue={max} max={45} min={5} step={5} marginBottom='3vh' onChange={(val) => setMax(val)}>
            <SliderMark value={5} mt="2" ml="-2" fontSize="sm">
              5
            </SliderMark>
            <SliderMark value={15} mt="2" ml="-2" fontSize="sm">
              15
            </SliderMark>
            <SliderMark value={25} mt="2" ml="-2" fontSize="sm">
              25
            </SliderMark>
            <SliderMark value={35} mt="2" ml="-2" fontSize="sm">
              35
            </SliderMark>
            <SliderMark value={45} mt="2" ml="-2" fontSize="sm">
              45
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={5} />
          </Slider>
          <Button type="button" onClick={handleSubmit} colorScheme="green">
            Submit Changes
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
}

export default Preferences;
