import Image from 'next/image';
import { Stack, Typography, Container } from '@mui/material';
import { BasicPopover } from './Popover';

const popoverText2 = {
  text: "center",
  left: "0%",
  top: "0%"
}

export const Map = () => {

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4">Location:</Typography>
      <BasicPopover text={popoverText2.text} left={popoverText2.left} top={popoverText2.top}/>

      <Image
        src={"/images/Krakow.png"}
        alt="Map"
        width={500}
        height={380}
        style={{position: "relative"}}
      />

      <Image
        src={"/images/bitkoinSimvol.png"}
        alt="designImage"
        width={34}
        height={30}
      />
    </Container>
  )
};