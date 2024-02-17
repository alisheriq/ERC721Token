// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyNFT is ERC721 {
    uint256 private _currentTokenId;

    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _currentTokenId = 0;
    }

    function mint(address to, string memory tokenURI) public {
        _currentTokenId++;
        _safeMint(to, _currentTokenId);
        _setTokenURI(_currentTokenId, tokenURI);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        _safeTransfer(from, to, tokenId, "");
    }

    function approve(address to, uint256 tokenId) public override {
        _approve(to, tokenId);
    }

    function setApprovalForAll(address operator, bool approved) public override {
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal {
        require(_exists(tokenId), "ERC721URIStorage: URI set for nonexistent token");
        _tokenURIs[tokenId] = tokenURI;
    }
}