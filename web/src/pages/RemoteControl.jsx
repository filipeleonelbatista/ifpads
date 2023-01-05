
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useEffect, useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import DrawerComponent from "../components/DrawerComponent";
import PadButton from "../components/PadButton";
import { useAuth } from "../hooks/useAuth";
import remoteControls from "../remotecontrol/index";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`commands-tabpanel-${index}`}
      aria-labelledby={`commands-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `commands-tab-${index}`,
    'aria-controls': `commands-tabpanel-${index}`,
  };
}

function RemoteControl() {
  const { sendCommand, isLogged } = useAuth()

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedTab, setSelectedTab] = useState("commands")
  const [selectedRemoteControl, setSelectedRemoteControl] = useState("commands")

  useEffect(() => {
    setSelectedRemoteControl(remoteControls[0])
  }, [])

  return (
    <DrawerComponent title="Controle remoto">
      <ContainerComponent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 1 }}>
          <Typography variant="button">
            Controles remotos
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, pb: 1, flexWrap: 'nowrap', overflow: 'auto' }}>
            {
              remoteControls.map((channel, index) => (
                <IconButton
                  key={index}
                  id={"channel-" + channel.name}
                  onClick={() => {
                    console.log("ANALITYCS", "click", {
                      link_id: "remote-control-channel-" + channel.name,
                    })
                    window.gtag('event', 'click', {
                      link_id: "remote-control-channel-" + channel.name,
                    })
                    setSelectedRemoteControl(channel)
                  }}
                  variant="contained"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    height: 50,
                    border: channel.name === selectedRemoteControl.name ? 'solid 3px red' : ''
                  }}>
                  <Avatar src={channel.image} alt={channel.name} />
                </IconButton>
              ))
            }
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="Comandos" centered>
                <Tab label="Comandos" {...a11yProps(0)} />
                <Tab label="Audios" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Box sx={{ display: "flex", flexWrap: 'wrap', gap: 1, overflow: 'auto', p: 1 }}>
                {
                  selectedRemoteControl?.commandList?.commands.map((command, index) => (
                    <PadButton
                      key={index}
                      id={`command-${command}`}
                      title={command}
                      onClick={() => sendCommand(command, selectedRemoteControl.name)}
                    />
                  ))
                }
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box sx={{ display: "flex", flexWrap: 'wrap', gap: 1, overflow: 'auto', p: 1 }}>
                {
                  selectedRemoteControl?.commandList?.audios.map((audio, index) => (
                    <PadButton
                      key={index}
                      id={`command-audio-${audio}`}
                      title={audio}
                      onClick={() =>
                        sendCommand(audio, selectedRemoteControl.name)} />
                  ))
                }
              </Box>
            </TabPanel>
          </Box>



        </Box>
      </ContainerComponent>
    </DrawerComponent>
  )
}

export default RemoteControl
