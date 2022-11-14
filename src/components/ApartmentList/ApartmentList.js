import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import AddApartment from "../AddApartment/AddApartment";

function ApartmentList() {
    const [apartments, setApartments] = useState([])
    const [fetching, setFetching] = useState(true)

    // // captura a API (as informações de dados)
    // fetch("https://ironbnb-m3.herokuapp.com/apartments")
    // // se deu certo, então transformas informações em dados .json
    // .then((response) => {
    //     return response.json();
    // // E pegue os dados e imprima no console (tudo dando certo até agora)
    // }).then((data) => {
    //     console.log("Resposta: ", data)
    // })
    // // se der erro, me retorne esse erro no console
    // .catch(error => console.log(error)) //arrow function de uma linha só (um parâmetro retorna um resultado)
    
    // USE EFFECT
    // método que cuida dos efeitos colaterias do código, não afeta a performance da aplicação
    // recebe dois argumentos:
    // 1: callback onde será passado o código que irá rodar para previnir o efeito colateral (lógica que eu quero que rode)
    // 2: array com os valores dos quais o código vai depender para rodar
    // se o array estiver vazio, o useEffect roda como quando a aplicação foi iniciada (não deixo a aplicação ficar atualizando em loop infinito)
    useEffect(() => {
        axios.get("https://ironbnb-m3.herokuapp.com/apartments")
        .then((response) => {
            setApartments(response.data)
            setFetching(false)
        })
        .catch((error) => console.log(error))
    }, [])    

    const renderApartments = apartments.map((apto) => {
        return (
        <Col key={apto._id}>
            <div className="card">
                <img src={apto.img}/>
                <h3>{apto.title}</h3>
                <p>Price: {apto.pricePerDay}</p>
            </div>
        </Col>
        )
    })


    return (
        <div>
            <Container>
                <Row>
                    <AddApartment />
                </Row>
                <Row>
                    { fetching && <Spinner animation="border" /> }
                    { renderApartments }
                    { renderApartments.reverse() }
                </Row>
            </Container>
        </div>
    );
}

export default ApartmentList;

// Promisses -> processas que a gente faz para o nosso código, para o javascript
// estou te passando essa informação, quero que você processe essa informação
// promessa ser cumprida (deu tudo certo) -> algo precisa acontecer, o código segue fazendo algo
// OU a promessa não ser cumprida (deu erro) -> pegar esse erro e analisar o que aconteceu

// MANIPULAR AS REQUISIÇÕES
// GET: ler os itens da API (read)
// POST: adiciona um novo item na API (create)
// PUT: atualiza um item da API (update)
// DELETE: exclui um item da API (delete)