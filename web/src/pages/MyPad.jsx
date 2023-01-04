import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import DefaultUserImage from "../assets/images/user.png";
import ContainerComponent from "../components/ContainerComponent";
import DrawerComponent from "../components/DrawerComponent";
import { useAudio } from "../hooks/useAudio";
import Pads from '../sets/index';

export default function MyPad() {
  const navigate = useNavigate();

  const { setPads, loadPreset, playSound } = useAudio()

  const [padName, setPadName] = useState('');
  const [soundList, setSoundList] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [myPadAccordeon, setMyPadAcordeon] = useState(false)
  const [padsAccordeon, setPadsAcordeon] = useState(true)

  function handleAddSoundToMyPad(sound) {
    setSoundList([...soundList, sound])
  }

  function handleRemoveSoundToMyPad(sound) {
    const filteredList = soundList.filter((item => item.title !== sound.title))
    setSoundList(filteredList)
  }

  async function handleOnSave() {
    const myPad = {
      userName: padName == "" ? "Meu pad" : padName,
      image: selectedImage == null ? DefaultUserImage : selectedImage,
      sounds: [...soundList]
    }
    localStorage.setItem('@my_pad', JSON.stringify(myPad))

    const padList = [
      myPad,
      ...Pads
    ]
    setPads(padList)
    loadPreset(padList[0])
    navigate("/")
  }

  const location = useLocation();

  useEffect(() => {
    console.log("ANALITYCS", "page_view", {
      page_title: 'MyPad',
      page_path: location.pathname + location.search,
      page_location: window.location.href
    })

    window.gtag('event', 'page_view', {
      page_title: 'MyPad',
      page_path: location.pathname + location.search,
      page_location: window.location.href
    })
  }, [location]);

  useEffect(() => {
    const getData = async () => {
      let value = localStorage.getItem('@my_pad')

      if (value != null) {
        value = JSON.parse(value)
        setPadName(value.userName == "" ? "Meu pad" : value.userName)
        setSoundList(value.sounds)
        setSelectedImage(value.image)
      } else {
        setPadName("Meu Pad")
        setSoundList([])
        setSelectedImage(DefaultUserImage)
      }
    }
    getData();
  }, [])

  return (
    <DrawerComponent title="Editar meu pad">
      <ContainerComponent>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nome do pad"
          variant="outlined"
          value={padName}
          onChange={(event) => setPadName(event.target.value)}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
          <Typography variant="button">
            Selecione a imagem do seu Pad
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mb: 2, mt: 2, pb: 2, flexWrap: 'nowrap', overflow: 'auto' }}>
            {
              Pads.map((pad, index) => (
                <IconButton
                  key={index}
                  onClick={() => setSelectedImage(pad.image)}
                  variant="contained"
                  sx={{
                    width: 48,
                    height: 48,
                    backgroundColor: "#000",
                    border: selectedImage === pad.image ? 'solid 3px red' : 'solid 1px #000'
                  }}
                >
                  <Avatar src={pad.image} sx={selectedImage === pad.image ? { width: 40, height: 40 } : { width: 48, height: 48 }} />
                </IconButton>
              ))
            }
          </Box>
        </Box>

        <Accordion expanded={myPadAccordeon} onClick={() => setMyPadAcordeon(!myPadAccordeon)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="my-pad-content"
            id="my-pad-header"
          >
            <Typography>Meu Pad</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {
              soundList.length === 0 && (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="h6">
                    Este pad não possui sons ainda.
                  </Typography>
                </Box>
              )
            }
            {
              soundList.map((sound, sound_index) => (
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 2, p: 1, backgroundColor: '#00000033', borderRadius: '8px', mb: 1 }} key={sound_index}>
                  <Button onClick={() => playSound(sound.source)} variant="contained" color="success">
                    <PlayArrowIcon />
                  </Button>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="body1">
                      {sound.title}
                    </Typography>
                  </Box>
                  <Button onClick={() => handleRemoveSoundToMyPad(sound)} variant="contained" color="error">
                    <DeleteIcon />
                  </Button>
                </Box>
              ))
            }
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={padsAccordeon} onClick={() => setPadsAcordeon(!padsAccordeon)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="my-pad-content"
            id="my-pad-header"
          >
            <Typography>Pads</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {
              Pads.map((pad, index) => (
                <React.Fragment key={index}>
                  {
                    pad.sounds.map((sound, sound_index) => (
                      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 2, p: 1, backgroundColor: '#00000033', borderRadius: '8px', mb: 1 }} key={sound_index}>
                        <Button onClick={() => playSound(sound.source)} variant="contained" color="success">
                          <PlayArrowIcon />
                        </Button>
                        <Box sx={{ width: '100%' }}>
                          <Typography variant="body2">
                            {pad.userName}
                          </Typography>
                          <Typography variant="body1">
                            {sound.title}
                          </Typography>
                        </Box>
                        <Button onClick={() => handleAddSoundToMyPad(sound)} variant="contained" color="success">
                          <AddIcon />
                        </Button>
                      </Box>
                    ))
                  }
                </React.Fragment>
              ))
            }
          </AccordionDetails>
        </Accordion>


        <Button fullWidth sx={{ mt: 4 }} onClick={() => handleOnSave()} size="large" variant="contained">Salvar</Button>
      </ContainerComponent>
    </DrawerComponent>
  )
}