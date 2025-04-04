import React from 'react'

import { useEffect, useState } from 'react'

import api from '../../services/api'

import { Link } from 'react-router-dom'

import './Home.css'


export default function Home() {

  const [filmes, setFilmes] = useState([])

  //loading
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    async function loadFilmes(){
      const response = await api.get("movie/now_playing",{
        params:{
          api_key:"5b5cc9136071960dc158c1b7d8ad01f7",
          language:"pt-BR",
          page:1
        }
      })
      setFilmes(response.data.results.slice(0,10)) //slice(0,10) para pegar apenas 10 filmes
      setLoading(false) //quando carregar os filmes, o loading some
    }
    loadFilmes()
  },[])

  if(loading){
    return(
      <div className='loading'>
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

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