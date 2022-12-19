
import { Box, CircularProgress, ListItemIcon, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DrawerComponent from "../components/DrawerComponent";
import PadButton from "../components/PadButton";
import { useAudio } from "../hooks/useAudio";

function Pads() {
  const { selectedPad, playSound, isMyPad, showTiltButton, playRandomAudio } = useAudio();

  const location = useLocation();

  useEffect(() => {
    console.log("ANALITYCS", "page_view", {
      page_title: selectedPad != null ? selectedPad.userName : "Pads",
      page_path: location.pathname + location.search,
      page_location: window.location.href
    })

    window.gtag('event', 'page_view', {
      page_title: selectedPad != null ? selectedPad.userName : "Pads",
      page_path: location.pathname + location.search,
      page_location: window.location.href
    })
  }, [location, selectedPad]);

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
            <PadButton id="tilt_button" fullWidth title="Tilt!" onClick={() => playRandomAudio()} />
          )
        }
      </Box>
      <Box sx={{ display: "flex", flexWrap: 'wrap', gap: 1, overflow: 'auto', p: 1 }}>
        {
          selectedPad.sounds.length === 0 && (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h6">
                Este pad não possui sons ainda.
              </Typography>
            </Box>
          )
        }
        {
          selectedPad.sounds.map((sound, index) => (
            <PadButton key={index} id={`audio-${isMyPad ? "mypad" : selectedPad.userName.replace(' ', '')}-${sound.title}`} title={sound.title} onClick={() => playSound(sound.source)} />
          ))
        }
      </Box>
    </DrawerComponent>
  )
}

export default Pads
