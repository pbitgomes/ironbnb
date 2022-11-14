import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
// import { Navigate, useNavigate } from "react-router-dom";

function AddApartment() {
    // const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [headline, setHeadline] = useState("")
    const [price, setPrice] = useState(1)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault()

        const body = {
            title: headline,
            pricePerDay: price
        }

        axios.post("https://ironbnb-m3.herokuapp.com/apartments", body)
        .then((response) => {
            setHeadline("")
            setPrice(1)
        })

        setShow(false) // fechar o modal
        // navigate("/")
    }
  
    return (
        <div className="my-3">
            <Button variant="info" onClick={handleShow}>
                Cadastrar apartamento
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar apartamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group className="mb-3">
                            <Form.Label>Título do anúncio</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Insira um título"
                                name="headline"
                                value={ headline }
                                onChange={ (e) => setHeadline(e.target.value) }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Preço da diária</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Insira o preço por dia"
                                name="pricePerDay"
                                value={ price }
                                onChange={ (e) => setPrice(e.target.value) }
                            />
                        </Form.Group>
                        <Button type="submit">Cadastrar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AddApartment;