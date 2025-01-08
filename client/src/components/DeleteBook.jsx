// import React, { useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const DeleteBook = () => {
//     const navigate = useNavigate()
//     const {id} = useParams()
//     useEffect(() => {
//         axios.delete('http://localhost:3001/book/book/'+id)
//         .then(res => {
//             if(res.data.deleted){
//                 navigate('/books')
//             }
//         }).catch(err => console.log(err))
//     }, [])
// }

// export default DeleteBook

/*

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const deleteBook = async () => {
            try {
                const response = await axios.delete(`http://localhost:3001/book/book/${id}`);
                if (response.data.deleted) {
                    navigate('/books');
                }
            } catch (error) {
                console.error('Error deleting book:', error);
                // Handle error (e.g., display an error message)
            }
        };

        deleteBook();
    }, [id, navigate]);

    return null; // or return a loading indicator/component if needed
};

export default DeleteBook;

*/

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState(null);

    useEffect(() => {
        const deleteBook = async () => {
            try {
                const response = await axios.delete(`http://localhost:3001/book/book/${id}`);
                if (response.data.deleted) {
                    navigate('/books');
                } else {
                    setError('Failed to delete the book.');
                }
            } catch (error) {
                console.error('Error deleting book:', error);
                setError('An error occurred while deleting the book.');
            }
        };

        deleteBook();
    }, [id, navigate]);

    if (error) return <div>{error}</div>;

    return null; // or return a loading indicator/component if needed
};

export default DeleteBook;
