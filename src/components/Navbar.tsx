import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import HBARLogo from "../assets/hbar-logo.svg";
import { useContext } from 'react';
import { GlobalAppContext } from '../contexts/GlobalAppContext';
import { connectToMetamask } from '../services/metamaskServices';

export default function NavBar() {
  const { metamaskAccountAddress, setMetamaskAccountAddress } = useContext(GlobalAppContext);
  const retrieveWalletAddress = async () => {
    const addresses = await connectToMetamask();
    if (addresses) {
        // grab the first wallet address
        setMetamaskAccountAddress(addresses[0]);
        console.log(addresses[0]);
      }
    }
  return (
    <AppBar position='relative' color='primary'>
      <Toolbar>
        <img alt='hbar logo' src={HBARLogo} className='hbarLogoImg'/>
        <Typography variant="h6" color="white" pl={1} noWrap>
          Happy Building
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          sx={{
            ml: "auto"
          }}
          onClick={retrieveWalletAddress}
        >
          {metamaskAccountAddress === "" ?
		"Connect to MetaMask" :
		`Connected to: ${metamaskAccountAddress.substring(0, 8)}...`}
        </Button>
      </Toolbar>
    </AppBar>
  )
}