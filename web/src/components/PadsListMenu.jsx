import { Avatar, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import DefaultLogo from '../assets/logo.png';
import Pads from '../sets/index';

function PadsListMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Tooltip placement="right" title="Meu Pad">
        <ListItemButton selected={location.pathname === "/"} onClick={() => navigate("/")}>
          <ListItemIcon>
            <Avatar alt='Avatar' src={DefaultLogo} sx={{ width: 24, height: 24 }} />
          </ListItemIcon>
          <ListItemText primary="Meu Pad" />
        </ListItemButton>
      </Tooltip>
      {
        Pads.map((pad, index) => (
          <Tooltip key={index} placement="right" title={pad.userName}>
            <ListItemButton selected={location.pathname === `/${pad.userName.toLowerCase()}`} onClick={() => navigate(`/`, { state: { pad_id: pad.userName.toLowerCase() } })}>
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