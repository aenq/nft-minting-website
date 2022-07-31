// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AenqNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply; //max supply nft yang akan ada di collections kita
    uint256 public maxPerWallet; //max number of nft yang bisa di mint per wallet
    bool public isPublicMintEnabled; // untuk menetukan kapan user bisa mint nft
    string internal baseTokenURI;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('AenqNFT', 'AENQ') {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 5;
        // set withdraw wallet address
    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenURI(string calldata baseTokenURI_) external onlyOwner {
        baseTokenURI = baseTokenURI_;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist.');
        return string(abi.encodePacked(baseTokenURI, Strings.toString(tokenId_), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool succes,) = withdrawWallet.call { value: address(this).balance} ('');
        require(succes, 'Withdraw failed.');
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, 'Minting is not enabled.');
        require(msg.value == quantity_ * mintPrice, 'Wrong mint value');
        require(totalSupply + quantity_ <= maxSupply, 'Sold Out.');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceed max per wallet.');

        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }

}