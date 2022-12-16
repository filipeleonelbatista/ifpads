
import { Box, CircularProgress, ListItemIcon } from "@mui/material";
import React from "react";
import DrawerComponent from "../components/DrawerComponent";
import PadButton from "../components/PadButton";
import { useAudio } from "../hooks/useAudio";

function Pads() {
  const { selectedPad, playSound, isMyPad, showTiltButton, playRandomAudio } = useAudio();

  if (!selectedPad) {
    return (
      <ListItemIcon>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </ListItemIcon>
    )
  }

  return (
    <DrawerComponent title={selectedPad.userName}>
      <Box sx={{ display: "flex", flexWrap: 'wrap', gap: 1, overflow: 'auto', p: 1 }}>
        {
          (isMyPad && showTiltButton) && (
            <PadButton fullWidth title="Tilt!" onClick={() => playRandomAudio()} />
          )
        }
      </Box>
      <Box sx={{ display: "flex", flexWrap: 'wrap', gap: 1, overflow: 'auto', p: 1 }}>
        {
          selectedPad.sounds.map((sound, index) => (
            <PadButton key={index} title={sound.title} onClick={() => playSound(sound.source)} />
          ))
        }
      </Box>
    </DrawerComponent>
  )
}

export default Pads
