const express = require('express');
const cors = require('cors');
// import Moralis Web3 API
const Moralis = require('moralis').default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 4000;

// allow access to React app on localhost:3000
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

// adding variable for api key and address
const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
const address = '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB';
const chain = EvmChain.ETHEREUM

app.get('/collection', async (req, res) => {
    try {
        const response = await Moralis.EvmApi.nft.getContractNFTs({
            address,
            chain,
            limit: 10
         });
         res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500);
      res.json({ error: error.message });
    }
  });

// startServer function that initializes Moralis
const startServer = async () => {
    await Moralis.start({
        apiKey: MORALIS_API_KEY,
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
};

console.log('Starting server...');
startServer();
console.log('Server started successfully!');
