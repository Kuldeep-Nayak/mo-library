/*
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    axios.get('http://localhost:3001/book/book/'+id)
    .then(res => {
        setName(res.data.name)
        setAuthor(res.data.author)
        setImageUrl(res.data.imageUrl)
      console.log(res)
    })
    .catch(err => console.log(err))
  }, [id]);

  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.put('http://localhost:3001/book/book/'+id, {name, author, imageUrl})
    .then(res => {
    //  console.log(res)
      if(res.data.updated){
        navigate('/books')
      }
      else{
        console.log(res)
      }
    })
    // .then(res => {
    //   if(res.data.login && res.data.role === 'admin'){
    //     navigate('/dashboard')
    //   }
    // })
    .catch(err => console.log(err))
  }
  
  return (
    <div className='student-form-container'> 
      <form className="student-form" onSubmit ={handleSubmit}>
        <h2>Edit Book</h2>
        <div className="form-group">
          <label htmlFor="book">Book Name:</label>
          <input type="text" id="book" name="book" value={name}
          onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author Name:</label>
          <input type="text" id="author" name="author" value={author}
          onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input type="text" id="image" name="image" value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}/>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default EditBook
*/

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/book/book/${id}`);
        setName(res.data.name);
        setAuthor(res.data.author);
        setImageUrl(res.data.imageUrl);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Error fetching book details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/book/book/${id}`, { name, author, imageUrl });
      if (res.data.updated) {
        navigate('/books');
      } else {
        console.log('Update failed:', res);
      }
    } catch (err) {
      console.error('Error updating book:', err);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='student-form-container'> 
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Edit Book</h2>
        <div className="form-group">
          <label htmlFor="book">Book Name:</label>
          <input type="text" id="book" name="book" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author Name:</label>
          <input type="text" id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input type="text" id="image" name="image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default EditBook;
