import { useState } from 'react';
import axios from 'axios';
import OpenModal from './OpenModal';
import '../App.css';

const Collections = () => {
  const [address, setAddress] = useState('');
  const [nftList, setNftList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.get(`http://localhost:4000/?address=${address}`);
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
    } catch (error) {
      console.error(error);
    }
  };

  console.log(nftList);

  const handleOpenModal = (nft) => {
    setModalOpen(true);
    setSelectedNFT(nft);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedNFT(null);
  };

  return (
    <div className='container'>
      <div className='container'>
        <h1 className='font-effect-neon'>NIFTY GALLERY</h1>
        <form className='text-center d-flex' onSubmit={handleSubmit}>
            <input type='text' className='form-control text-white bg-dark mx-3 rounded-pill' placeholder='Enter Ethereum Contract Address Here' value={address} onChange={(event) => setAddress(event.target.value)}/>
          <button type='submit' className='btn btn-dark'>SEARCH</button>
        </form>
      </div>
      <div className='row row-cols-4 g-4'>
        {nftList && nftList.map(nft => {
          return (
            <div className='col mb-4' key={nft.token_id}>
              <div className='card bg-dark text-white h-100' style={{width: '18rem'}} onClick={() => handleOpenModal(nft)}>
                <img className='card-img-top' alt='Thumbnail of NFTs by the given address' src={nft.metadata.image} />
                <div className='card-body'>
                  <h5 className='card-title'>{nft.metadata.name}</h5>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {modalOpen && (
        <OpenModal nft={selectedNFT} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
}

export default Collections;
