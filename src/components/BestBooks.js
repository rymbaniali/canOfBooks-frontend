import React, { Component } from 'react'
import axios from 'axios'
import { withAuth0 } from "@auth0/auth0-react";


export class BestBooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userEmail: this.props.auth0.user.email,
            books: [],
        }
    }

    componentDidMount() {
        this.fetchBooks()
    }

    fetchBooks = async () => {
        try {
            const responce = await axios.get(`${process.env.REACT_APP_SERVER_URL}/books?email=${this.state.userEmail}`)
            this.setState({
                books: responce.data[0]?.books || []
            })
        } catch (error) {
            alert(error.message);
        }




    }
    render() {
        return (
            <div>
                {
                    this.state.books.length > 0 &&
                    this.state.books.map((val, id) => {
                        return (
                            <div key={id}>
                                <p>{val.name}</p>
                                <p>{val.description}</p>
                                <p>{val.status}</p>
                            </div>
                        )
                    })

                }
            </div>
        )
    }
}

export default withAuth0(BestBooks);
