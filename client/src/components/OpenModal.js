import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const OpenModal = ({ nft, handleCloseModal }) => {
    const [owner, setOwner] = useState('');

    const getOwner = async () => {
        try {
            const { data } = await axios.get(`https://nifty-gallery-2.vercel.app/owner/?address=${nft.token_address}&tokenId=${nft.token_id}`);
            setOwner(data.result[0].token_address);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getOwner();
    });

    console.log(owner);

    return (
        <div className='modal'>
            <Modal show={true} onHide={handleCloseModal}>
                <Modal.Header closeButton className='bg-dark text-white'>
                <Modal.Title>{nft.metadata.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ color: 'white', fontWeight: '400', backgroundImage: 'linear-gradient(red, blue)', position: 'relative' }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <img src={nft.metadata.image} alt={nft.metadata.name} className='w-75 h-75 py-3 mx-auto d-block'/>
                        <div className='text-left px-5 py-3'>
                            <p className='fw-semibold'>{nft.metadata.description}</p>
                            { nft.metadata.attributes ? (
                            (typeof(nft.metadata.attributes[0]) === 'object') ? (
                            <div>
                                <p className='fw-bold'>Attributes</p>
                                <ul className="list-unstyled p-0">
                                    {nft.metadata.attributes.map((attr, index) => {
                                        const keys = Object.keys(attr);
                                        const values = keys.map((key) => attr[key]);
                                        return (
                                            <li key={index}>
                                                {values.join(': ')}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            ) : (
                            <p className='fw-bold'>Attributes {nft.metadata.attributes.join(', ')}</p>
                            )
                            ) : null }
                            <p className='fw-bold'>Owner Address: </p>
                            <p>{owner}</p>
                        </div>
                        <div className='text-center pb-3'>
                            <Button variant='info' onClick={() => window.open(`https://opensea.io/assets/${nft.token_address}/${nft.token_id}`, '_blank')} className='purchase px-4 fw-bold'>Purchase</Button>
                        </div>
                    </div>
                    <div className='position-absolute top-0 start-0 w-100 h-100 mask' style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 0 }}></div>
                </Modal.Body>
                <Modal.Footer className='bg-dark'>
                <Button variant='secondary' onClick={handleCloseModal}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OpenModal;
