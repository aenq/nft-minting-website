import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text} from '@chakra-ui/react';
import AenqNFT from './AenqNFT.json';

const AenqNFTAddress = "0x33473928CE42053855966E929017AC7D85e09939";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                AenqNFTAddress, 
                AenqNFT.abi, 
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                });
                console.log('response: ', response);
            } catch (err) {
                console.log("error: ", err);
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 5) return ;
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify="center" align="center" height="80vh" paddingBottom="150px">
            <Box width="750px">
                <Text fontSize="40px" textShadow="0px 2px #000000">New 2022 NFT Collections</Text>

                <Text
                fontSize="30px" fontFamily="monospace" textShadow="0px 1px #000000">Mint from 10.000 AENQ NFTs now, and being the first person to own a newly created NFT.</Text>

                {isConnected ? (
                    <div>
                        <div>
                            <Button
                            backgroundColor="orange"
                            height="20px"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0f0f0f"
                            cursor="pointer"
                            fontFamily="monospace"
                            fontWeight="bold"
                            padding="15px"
                            margin="0 15px" onClick={handleDecrement}>-</Button>

                            <Input 
                            readOnly
                            fontFamily="monospace"
                            fontWeight="bold"
                            width="100px"
                            borderRadius="5px"
                            height="40px"
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="10px"
                            type="number" value={mintAmount}></Input>

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
                            onClick={handleIncrement}>+</Button>
                        </div>
                        <Button
                            backgroundColor="orange"
                            height="20px"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0f0f0f"
                            cursor="pointer"
                            fontFamily="monospace"
                            fontWeight="bold"
                            padding="15px"
                            margin="10px 15px"
                        onClick={handleMint}>Mint Now</Button>
                    </div>
                ) : (
                    <Text
                    marginTop="70px"
                    fontSize="25px"
                    fontFamily="monospace"
                    textShadow="1px 3px #000000"
                    color="orange">Please connect to MetaMask</Text>
                )}
            </Box>
        </Flex>
    );
};

export default MainMint;