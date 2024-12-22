import React from 'react'

import { useEffect, useState } from 'react'

import api from '../../services/api'

import { Link } from 'react-router-dom'

import './Home.css'


export default function Home() {

  const [filmes, setFilmes] = useState([])

  useEffect(()=>{
    async function loadFilmes(){
      const response = await api.get("movie/now_playing",{
        params:{
          api_key:"5b5cc9136071960dc158c1b7d8ad01f7",
          language:"pt-BR",
          page:1
        }
      })
      setFilmes(response.data.results.slice(0,10))
    }
    loadFilmes()
  },[])

  return (
    <div className='conteiner'>
      <div className='lista-filmes'>
        {filmes.map((filme)=>{
          return(
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
            
          )
          
        })}
      </div>
    </div>
  )
}