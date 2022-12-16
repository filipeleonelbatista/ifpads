
import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import ContainerComponent from "../components/ContainerComponent";
import DrawerComponent from "../components/DrawerComponent";

import { FaQrcode, FaShareAlt, FaTwitch, FaVolumeUp } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import PadButton from "../components/PadButton";
import { useAudio } from "../hooks/useAudio";

const colors = [
  "#FFFFFF",
  "#000000",
  "#FF0000",
  "#FFFF00",
  "#00FFFF",
  "#0000FF",
]

const links = [
  { title: "Sem live Caprio", url: "https://semlivedocaprio.vercel.app/" },
  { title: "Jogo do alho", url: "https://jogaoalhopelajanela.vercel.app/" },
  { title: "Sem live Hayashii", url: "https://semlivedohayashii.vercel.app/" },
  { title: "F DPP", url: "https://temposemdpp.vercel.app/" },
  { title: "IF Pads Android", url: "https://play.google.com/store/apps/details?id=com.ifpads.streamers" },
  { title: "Desenvolvedor", url: "https://desenvolvedordeaplicativos.com.br/links" },
]

function Config() {
  const navigate = useNavigate();
  
  const {
    padColor,
    showTiltButton,
    handleSetPadColor,
    handleChangeTiltState,
    padTextColor,
    handleSetPadTextColor,
  } = useAudio()

  const handleShare = async () => {
    try {
      const sharableContent = {
        title: `Acesse agora o IF Pads na Web em https://ifpads.vercel.com`,
        text: `Acesse agora o IF Pads na Web em https://ifpads.vercel.com`,
      };
      await navigator.share(sharableContent);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePix = () => {
    navigator.clipboard.writeText(
      "00020126580014BR.GOV.BCB.PIX013649b3aa64-47eb-47a3-b439-b765a4d0f22c5204000053039865802BR5925FILIPE DE LEONEL BATISTA 6009SAO PAULO61080540900062250521hGjPosyoJ4dswj614vgvd63046514"
    );
    alert(
      "Chave Pix Copiada! Agora basta ir no app do seu banco favorito e fazer um pix em qualquer valor 😉 Muito obrigado!"
    );
  };

  return (
    <DrawerComponent title="Configurações">
      <ContainerComponent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 1 }}>
          <Typography variant="button">
            Core dos pads
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mb: 2 }}>

            {
              colors.map((color, index) => (
                <IconButton key={index} onClick={() => handleSetPadColor(color)} variant="contained" sx={{ width: 32, height: 32, backgroundColor: color, border: color === padColor ? 'solid 3px red' : 'solid 1px #000' }}>
                  {" "}
                </IconButton>
              ))
            }
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 1 }}>
          <Typography variant="button">
            Core do texto dos pads
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mb: 2 }}>

            {
              colors.map((color, index) => (
                <IconButton key={index} onClick={() => handleSetPadTextColor(color)} variant="contained" sx={{ width: 32, height: 32, backgroundColor: color, border: color === padTextColor ? 'solid 3px red' : 'solid 1px #000' }}>
                  {" "}
                </IconButton>
              ))
            }
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button fullWidth onClick={() => navigate("/editar-pad")} size="large" variant="contained">Editar seu pad</Button>
          <Button fullWidth onClick={() => handleChangeTiltState()} size="large" variant="contained" color="secondary" startIcon={<FaVolumeUp />}>{showTiltButton ? "Desabilitar Tilt" : "Habilitar Tilt"}</Button>
          <Button fullWidth onClick={handleShare} size="large" variant="contained" color="secondary" startIcon={<FaShareAlt />}>Compartilhe com amigos</Button>
          <Button fullWidth onClick={handlePix} size="large" variant="contained" color="secondary" startIcon={<FaQrcode />}>Me pague um cafésinho!</Button>
          {
            false && <Button fullWidth size="large" variant="contained" color="twitch" startIcon={<FaTwitch />}>Habilitar integração com a Twitch</Button>
          }
        </Box>

        <Box sx={{ display: "flex", flexDirection: 'column', mt: 4 }}>

          <Typography variant="button">
            Outros apps relacionados a IF
          </Typography>
          <Box sx={{ display: "flex", flexWrap: 'wrap', gap: 1, overflow: 'auto', p: 1, mt: 2 }}>
            {
              links.map((link, index) => (
                <PadButton key={index} title={link.title} onClick={() => window.open(link.url, "_blank")} />
              ))
            }
          </Box>
        </Box>
      </ContainerComponent>
    </DrawerComponent >
  )
}

export default Config
