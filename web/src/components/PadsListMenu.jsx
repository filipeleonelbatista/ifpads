import { Avatar, Box, CircularProgress, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAudio } from "../hooks/useAudio";

function PadsListMenu() {
  const { selectedPad, loadPreset, pads } = useAudio();
  const navigate = useNavigate()
  const location = useLocation()

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
    <>
      {
        pads.map((pad, index) => (
          <Tooltip key={index} placement="right" title={pad.userName}>
            <ListItemButton selected={pad.userName === selectedPad.userName && location.pathname === "/"} onClick={() => {
              loadPreset(pad)
              navigate('/')
            }}>
              <ListItemIcon>
                <Avatar alt='Avatar' src={pad.image} sx={{ width: 24, height: 24 }} />
              </ListItemIcon>
              <ListItemText primary={pad.userName} />
            </ListItemButton>
          </Tooltip>
        ))
      }
    </>
  )
}

export default PadsListMenu;