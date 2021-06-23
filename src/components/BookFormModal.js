import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import app from '../app'
import axios from 'axios'
import { withAuth0 } from "@auth0/auth0-react";


export class BookFormModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
         booksName:"",
         bookDescription :"",
         bookStatus:"" 
        }

    }
async addBook(event){
event.preventDefault();
try{
const responce =await axios.post(`${process.env.REACT_APP_SERVER_URL}/book`,{
   userEmail:this.props.auth0.user.email,
    bookName:this.state.booksName,
    description :this.state.bookDescription,
    status:this.state.bookStatus
})
this.props.bookData(responce.data.books)
this.props.close()

}catch(error){
    console.error(error.message);
}
}



    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>BOOKS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e)=>this.addBook(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Name</Form.Label>
                                <Form.Control onChange={(e)=>this.setState({
                                    booksName:e.target.value
                                })} type="text" placeholder="Enter book name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Description</Form.Label>
                                <Form.Control onChange={(e)=>this.setState({
                                   bookDescription:e.target.value
                                })} type="text" placeholder="Book Description" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Status</Form.Label>
                                <Form.Control onChange={(e)=>this.setState({
                                   bookStatus:e.target.value
                                })} type="text" placeholder="Book Status" />
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Submit
  </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default withAuth0(BookFormModal)
