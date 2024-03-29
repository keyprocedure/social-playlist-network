import React, { useState } from "react";
import Image from "next/image";
import "../css/ImageBlur.css";
import { CustomButton } from "../CustomButton";
import Modal from "react-bootstrap/Modal";
import { ListGroup } from "react-bootstrap";

export default function ImageBlur({ playlist }) {

    const [isHovered, setIsHovered] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setIsHovered(false);
    }
    const handleShow = () => setShow(true);
    // return (
    //     <div className="img-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
    //         <Image className="img" src={playlist.image} width={300} height={300} />
    //         {isHovered && (
    //             <CustomButton text={"Open Playlist"} />
    //         )}
    //     </div>
    // );
    return (
        <div className="image-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Image className="img" src={playlist.image} width={400} height={400} alt="description" />

            {isHovered && (
                <div>
                    <CustomButton className="overlay-button btn btn-dark" text={"Open Playlist"} onClick={handleShow} />
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{playlist.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modal-body">
                            <p>
                                Here are your songs:
                            </p>

                            <ListGroup>
                                {playlist.songs.map((song, index) => (
                                    <div key={index}>
                                        <ListGroup.Item>{song.title} - {song.artist}</ListGroup.Item>
                                    </div>
                                ))}
                            </ListGroup>

                            {/* <AIMusicList playlist={playlist} /> */}
                        </Modal.Body>
                        <Modal.Footer>
                            <CustomButton text={"Close"} onClick={handleClose} />
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
            {/* <button className="overlay-button">Open Playlist</button> */}
        </div>
    )
}