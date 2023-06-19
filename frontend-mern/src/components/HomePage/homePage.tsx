//Importar dependencias necesarias
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

//Importar componentes necesarios
import NavbarComponent from "../NavbarComponent/navbarComponent";

//Componente que se va a renderizar
const HomePage = () => {
    //Interfaz para obetener los valores en el arreglo de JSONS
    interface Task {
        _id: number,
        email: string,
        title: string,
        description: string,
        type_task: "ToDo" | "In Process" | "Success",
        date_creation: string
    }
    //Props para la herencias
    type Props = {
        _id: number,
        email: string,
        title: string,
        description: string,
        type_task: "ToDo" | "In Process" | "Success",
        date_creation: string
    }
    //Objeto para almacenar el arreglo de JSONS
    const [table, setTable] = useState<Task[]>([]);

    //Objetos y Metodo de Flecha para manejar el Modal Dialog del New Task
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Objetos y Metodo de Flecha para manejar el Modal Dialog del Update Task
    const [showUpdate, setShowUpdate] = useState(false)
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    useEffect(() => {
        getAllTasks();
    }, [])

    //Metodo de flecha para onbtener todas las Tasks
    const getAllTasks = async () => {
        const user = localStorage.getItem("loggedUser");
        let userJson;
        if (user) {
            userJson = JSON.parse(user);
        }
        const headersConfig = {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userJson.token
        }
        await axios({
            method: 'post',
            url: 'http://localhost:3000/allTasks',
            data: { email: userJson.email },
            headers: headersConfig
        }).then(response => {
            setTable(response.data);
        }
        ).catch(error => {
            console.log(error)
        })
    }

    //Objeto de tipo JSON para almacenar al Task que se desea actualizar
    const [dataUpdate, setDataUpdate] = useState({
        id: 0,
        email: '',
        title: '',
        description: '',
        type_task: '',
        date_creation: ''
    })

    //Componente de Botones que va a tener cada Card
    const Buttons = (props: Props) => {
        //Metodo de Flecha para eliminar el Task
        const handleDeleteTask = () => {
            Swal.fire({
                title: 'Eliminar Task',
                text: "¿Estás seguro de eliminar esta Task?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, estoy seguro'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const user = localStorage.getItem("loggedUser");
                    let userJson;
                    if (user) {
                        userJson = JSON.parse(user);
                    }
                    const headersConfig = {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + userJson.token
                    }
                    await axios({
                        method: 'post',
                        url: 'http://localhost:3000/deleteTask',
                        data: { id: props._id, email: userJson.email },
                        headers: headersConfig
                    }).then(response => {
                        Swal.fire({
                            title: 'Delete Task',
                            text: "Se elimino la tarea correctamente.",
                            icon: 'success',
                            confirmButtonText: 'Accept'
                        }).finally(() => {
                            setTable(response.data);
                            handleClose();
                        })
                    }
                    ).catch(error => {
                        Swal.fire({
                            title: '¡Error!',
                            text: error.response.data.msj,
                            icon: 'error',
                            confirmButtonText: 'Accept'
                        })
                    })
                }
            })
        }
        //Metodo de Flecha para actualizar el Task
        const handleUpdateTask = () => {
            setDataUpdate({ id: props._id, email: props.email, title: props.title, description: props.description, type_task: props.type_task, date_creation: props.date_creation })
            handleShowUpdate()
        }
        //Componentes a renderizar
        return (
            <Row>
                <Col className="d-grid gap-2 mt-2" lg="6">
                    <Button variant="secondary" onClick={handleUpdateTask}>Update</Button>
                </Col>
                <Col className="d-grid gap-2 mt-2" lg="6">
                    <Button variant="danger" onClick={handleDeleteTask}>Delete</Button>
                </Col>
            </Row>
        );
    }

    //Card donde contiene la información de cada Task
    const Cards = (props: Props) => {
        //JSON de estilo para cada Card
        let cardStyle = {
            width: '18rem',
            backgroundColor: ''
        }
        //Validación de Status para el estilo
        switch (props.type_task) {
            case 'ToDo': cardStyle.backgroundColor = '#8ADBFE'; break;
            case 'In Process': cardStyle.backgroundColor = '#FEFE8A'; break;
            case 'Success': cardStyle.backgroundColor = "#8AFE98"; break;
        }
        //Componentes a renderizar
        return (
            <Card style={cardStyle}>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Fecha de creación: {props.date_creation}</Card.Subtitle>
                    <Card.Text>{props.description}</Card.Text>
                    <Card.Footer className="text-muted">Status: {props.type_task}</Card.Footer>
                    <Buttons _id={props._id} title={props.title} description={props.description} type_task={props.type_task} email={props.email} date_creation={props.date_creation} />
                </Card.Body>
            </Card>
        );
    }

    //Modal Dialog para actualizar un Task
    const FormTaskUpdate = () => {
        const [data, setData] = useState(dataUpdate);
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setData({ ...data, [e.target.name]: e.target.value });
        }
        const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            data.type_task = e.target.value;
        }
        const handleUpdateTask = async () => {
            if (!data.title || !data.description) {
                Swal.fire({
                    title: '¡Advertencia!',
                    text: 'Ingresa todos los datos para continuar.',
                    icon: 'warning',
                    confirmButtonText: 'Accept'
                })
            }
            else {
                console.log(data);
                const user = localStorage.getItem("loggedUser");
                let userJson;
                if (user) {
                    userJson = JSON.parse(user);
                    data.email = userJson.email;
                }
                data.date_creation = new Date(Date.now()).toLocaleDateString();
                const headersConfig = {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + userJson.token
                }
                await axios({
                    method: 'post',
                    url: 'http://localhost:3000/updateTask',
                    data: data,
                    headers: headersConfig
                }).then(response => {
                    Swal.fire({
                        title: 'Update Task',
                        text: "Se actualizo la tarea correctamente.",
                        icon: 'success',
                        confirmButtonText: 'Accept'
                    }).finally(() => {
                        setTable(response.data);
                        handleCloseUpdate();
                    })
                }
                ).catch(error => {
                    Swal.fire({
                        title: '¡Error!',
                        text: error.response.data.msj,
                        icon: 'error',
                        confirmButtonText: 'Accept'
                    })
                })
            }
        }
        //Componentes a renderizar
        return (
            <>
                <Modal
                    show={showUpdate}
                    onHide={handleCloseUpdate}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Update Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label style={{ fontWeight: "bold" }}>Actualizar el status:</Form.Label>
                                <Form.Select name="type_task" onChange={handleSelectChange} aria-label="Select Status">
                                    <option value={dataUpdate.type_task}>Status Actual: {dataUpdate.type_task}</option>
                                    <option value="ToDo">ToDo</option>
                                    <option value="In Process">In Process</option>
                                    <option value="Success">Success</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label style={{ fontWeight: "bold" }}>Title:</Form.Label>
                                <Form.Control type="text" name="title" defaultValue={dataUpdate.title} onChange={handleInputChange} placeholder="Ingresa el titulo de tu Task" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label style={{ fontWeight: "bold" }}>Description: </Form.Label>
                                <Form.Control as="textarea" onChange={handleInputChange} defaultValue={dataUpdate.description} name="description" rows={3} placeholder="Ingresa la descripción de tu Task (más detallado, mejor)" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpdate}>
                            Cancelar
                        </Button>
                        <Button variant="success" onClick={handleUpdateTask}>Actualizar Task</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    //Modal Dialog para crear un nuevo Task
    const FormTask = () => {
        const [data, setData] = useState({
            email: '',
            title: '',
            description: '',
            type_task: '',
            date_creation: ''
        })
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setData({ ...data, [e.target.name]: e.target.value });
        }
        const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            data.type_task = e.target.value;
        }
        const handleNewTask = async () => {
            if (!data.title || !data.description || !data.type_task || data.type_task === "empty") {
                Swal.fire({
                    title: '¡Advertencia!',
                    text: 'Ingresa todos los datos para continuar.',
                    icon: 'warning',
                    confirmButtonText: 'Accept'
                })
            }
            else {
                const user = localStorage.getItem("loggedUser");
                let userJson;
                if (user) {
                    userJson = JSON.parse(user);
                    data.email = userJson.email;
                }
                data.date_creation = new Date(Date.now()).toLocaleDateString();
                const headersConfig = {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + userJson.token
                }
                await axios({
                    method: 'post',
                    url: 'http://localhost:3000/newTask',
                    data: data,
                    headers: headersConfig
                }).then(response => {
                    Swal.fire({
                        title: 'New Task',
                        text: "Se creo la tarea correctamente.",
                        icon: 'success',
                        confirmButtonText: 'Accept'
                    }).finally(() => {
                        setTable(response.data);
                        handleClose();
                    })
                }
                ).catch(error => {
                    Swal.fire({
                        title: '¡Error!',
                        text: error.response.data.msj,
                        icon: 'error',
                        confirmButtonText: 'Accept'
                    })
                })
            }
        }
        //Componentes a renderizar
        return (
            <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>New Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label style={{ fontWeight: "bold" }}>Status:</Form.Label>
                                <Form.Select name="type_task" onChange={handleSelectChange} aria-label="Select Status">
                                    <option value="empty">Selecciona una opción</option>
                                    <option value="ToDo">ToDo</option>
                                    <option value="In Process">In Process</option>
                                    <option value="Success">Success</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label style={{ fontWeight: "bold" }}>Title:</Form.Label>
                                <Form.Control type="text" name="title" onChange={handleInputChange} placeholder="Ingresa el titulo de tu Task" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label style={{ fontWeight: "bold" }}>Description: </Form.Label>
                                <Form.Control as="textarea" onChange={handleInputChange} name="description" rows={3} placeholder="Ingresa la descripción de tu Task (más detallado, mejor)" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleNewTask}>Guardar Task</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    return (
        <>
            <NavbarComponent />
            <FormTask />
            <FormTaskUpdate />
            <Container className="mt-3 justify-content-md-center">
                <h1 className="mt-3">My Tasks</h1>
                <Button variant="primary" onClick={handleShow}>Crear una nueva Task</Button>
                <Row className="justify-content-md-center">
                    {table.map((dataItem) => (
                        <Col className="mt-3" key={dataItem._id}>
                            <Cards _id={dataItem._id} email={dataItem.email} title={dataItem.title} description={dataItem.description} type_task={dataItem.type_task} date_creation={dataItem.date_creation} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}
export default HomePage;