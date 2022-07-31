import React from 'react';
import Aenq from './assets/Aenq.png';
import { Box, Button, Flex, Spacer} from '@chakra-ui/react';

const NavBar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            setAccounts(accounts);
        }
    }

    return (
        <Flex justify="space-between" align="center" padding="20px">
            <Flex justify="space-around" width="20%" padding="0 75px">
                <img src={Aenq} boxSize="42px" margin="0 15px"></img>
            </Flex>

            <Flex Flex justify="space-around" width="50%" padding="30px" alignItems="center">
            <Box margin="0 15px" ><a href='https://OpenSea.io'  target="_blank">OpenSea</a></Box>
            <Spacer/>
            <Box margin="0 15px"><a href='https://Discord.com' target="_blank">Discord</a></Box>
            <Spacer/>

            {/* {connect button} */}
            { isConnected ? (
            <Box margin="0 15px"><span className='wallet-address'>Address - {accounts}</span></Box>
            ) : (
                // <a onClick={connectAccount} class="connect-button"> Connect </a>
                <Button
                backgroundColor="orange"
                height="20px"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                cursor="pointer"
                fontFamily="monospace"
                fontWeight="bold"
                padding="15px"
                margin="0 15px"
                onClick={connectAccount}>Connect</Button>
            )} 
            </Flex>
        </Flex>
    );
};

export default NavBar;

