import React, { Component } from 'react'
import axios from 'axios'
import { withAuth0 } from "@auth0/auth0-react";
import BookFormModal from './BookFormModal';
import Button from 'react-bootstrap/Button'
import { UpdateBook } from './UpdateBook';


export class BestBooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userEmail: this.props.auth0.user.email,
            books: [],
            bookName: '',
			bookNameUpdate: '',
            index:0,
            showAddModal:false,
            showUpdateModal:false,
            updateBook:{}

        }
    }

    componentDidMount() {
        this.fetchBooks()
    }

    fetchBooks = async () => {
        try {
            const responce = await axios.get(`${process.env.REACT_APP_SERVER_URL}/books?email=${this.state.userEmail}`)
            console.log( responce.data);
            this.setState({
                books: responce.data?.books || []
            })
        } catch (error) {
            alert(error.message);
        }}

        deleteBook = async(index)=>{
            try{
                const res=await axios.delete(`${process.env.REACT_APP_SERVER_URL}/book/${index}?email=${this.state.userEmail}`)
                this.setState({
                    books: res.data?.books || []
                })
        
            }catch(error){
                alert(error.message);  
            }
        }
    render() {
        return (
            <div>
                <Button onClick={()=>this.setState({showAddModal:true})} variant="outline-primary">Add Book</Button>
                {
                    this.state.books.length > 0 &&
                    this.state.books.map((val, id) => {
                        return (
                            <div key={id}>
                                <p>Name :{val?.name || ""}</p>
                                <p>Description :{val?.description || ""}</p>
                                <p>status : {val?.status || ""}</p>
                                <Button onClick={()=> this.deleteBook(val._id)} variant="danger">Delete</Button>
                                <Button  onClick={()=>this.setState({showUpdateModal:true,updateBook:val})}variant="success">Update</Button>
                            </div>
                                                    
                        ) 
                    })   
                }
   
              <UpdateBook
                   show={this.state.showUpdateModal}
                   close={()=>this.setState({showUpdateModal:false})}
                   bookData={(val)=>this.setState({books:val})}
                   data={this.state.updateBook}
                   email={this.state.userEmail}
              />
                <BookFormModal 
                show={this.state.showAddModal}
                close={()=>this.setState({showAddModal:false})}
                bookData={(val)=>this.setState({books:val})}
                />
            </div>
        )
    }
}

export default withAuth0(BestBooks);
