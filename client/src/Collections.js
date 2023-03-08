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
    <div className='container'>
      <div className="row row-cols-5 g-4">
        {nftList && nftList.map(nft => {
          return (
            <div className='col mb-4' key={nft.token_id}>
              <div className='card h-100' style={{width: '18rem'}}>
                <img className='card-img-top' alt='Thumbnail of NFTs by the given address' src={nft.metadata.image} />
                <div className='card-body '>
                  <h5 className='card-title'>{nft.metadata.name}</h5>
                  <p className='card-text'>{nft.metadata.description}</p>
                  <p>{nft.metadata.attributes.join(', ')}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}