import React, { useState } from 'react'
import Image from 'next/image'
import '../css/PostImage.css'
import { CustomButton } from '../CustomButton'
import Modal from 'react-bootstrap/Modal'
import { ListGroup } from 'react-bootstrap'

export default function PostImage ({ playlist }) {
  const [isHovered, setIsHovered] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    setIsHovered(false)
  }
  const handleShow = () => {
    setShow(true)
  }
  return (
    <div
      className='image-container'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        className='playlist-img'
        src={playlist.image}
        width={400}
        height={400}
        alt='description'
        priority={true}
      />

      {isHovered && (
        <div>
          <CustomButton
            className='overlay-button btn btn-dark'
            text={'View Playlist'}
            onClick={handleShow}
          />
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{playlist.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body'>
              <p>Here are your songs:</p>

              <ListGroup>
                {playlist.songs.map((song, index) => (
                  <div key={index}>
                    <ListGroup.Item>
                      {song.title} - {song.artist}
                    </ListGroup.Item>
                  </div>
                ))}
              </ListGroup>

              {/* <AIMusicList playlist={playlist} /> */}
            </Modal.Body>
            <Modal.Footer>
              <CustomButton text={'Close'} onClick={handleClose} />
            </Modal.Footer>
          </Modal>
        </div>
      )}
      {/* <button className="overlay-button">Open Playlist</button> */}
    </div>
  )
}
