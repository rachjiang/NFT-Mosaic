import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const OpenModal = ({ nft, handleCloseModal }) => {
    const [owner, setOwner] = useState('');

    const getOwner = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/owner/?address=${nft.token_address}&tokenId=${nft.token_id}`);
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
    <Modal show={true} onHide={handleCloseModal}>
        <Modal.Header closeButton>
        <Modal.Title>{nft.metadata.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center', color: 'white', backgroundImage: 'linear-gradient(red, blue)' }}>
        <img src={nft.metadata.image} alt={nft.metadata.name} style={{ maxWidth: '80%', maxHeight: '80%' }}/>
        <p className='pt-3'>Description: {nft.metadata.description}</p>
        { nft.metadata.attributes ? (
        (typeof(nft.metadata.attributes[0]) === 'object') ? (
        <div>
            <p>Attributes:</p>
            <ul style={{ listStyle: 'none', padding: '0' }}>
                {nft.metadata.attributes.map((attr, index) => {
                    const keys = Object.keys(attr);
                    const values = keys.map((key) => attr[key]);
                    return (
                        <li key={index}>
                            {values.join(": ")}
                        </li>
                    );
                })}
            </ul>
        </div>
        ) : (
        <p>Attributes: {nft.metadata.attributes.join(', ')}</p>
        )
        ) : null }
        <p>Owner Address: {owner}</p>
        <Button variant="info" onClick={() => window.open(`https://opensea.io/assets/${nft.token_address}/${nft.token_id}`, '_blank')}>Purchase</Button>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
            Close
        </Button>
        </Modal.Footer>
    </Modal>
    );
};

export default OpenModal;
