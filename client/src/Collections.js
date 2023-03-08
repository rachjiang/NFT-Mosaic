import { useEffect, useState } from 'react';

import axios from 'axios';

export default function Collections() {
  const [nftList, setNftList] = useState([]);

  useEffect(() => {
    axios('http://localhost:4000/collection').then(({ data }) => {
      // the response data contains a result array representing the nfts of the given address 
      const nftData = data.result;
      // accessing each nft in the result array to parse the metadata value from a JSON string to an accessible object
      const updatedNftList = nftData.map(nft => {
        const updatedMetadata = JSON.parse(nft.metadata);
        return {
          ...nft,
          metadata: updatedMetadata,
        };
      });
      setNftList(updatedNftList);
    });
  }, []);

  console.log(nftList)

  return (
    <div>
      {nftList && nftList.map(nft => {
        return (
          <div key={nft.token_id}>
            <img alt="Thumbnail of NFTs by the given address" src={nft.metadata.image} />
            <h3>Name: {nft.metadata.name}</h3>
            <h3>Description: {nft.metadata.description}</h3>
          </div>
        )
      })}
    </div>
  );
}