import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = ({setRoleProp}) => {
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3001/auth/logout')
        .then(res => {
            if(res.data.logout){
                
                setRoleProp('')
                navigate('/')
                alert("You are logged out!")
            }
        }).catch(err => console.log(err))
    }, [])
}

export default Logout
