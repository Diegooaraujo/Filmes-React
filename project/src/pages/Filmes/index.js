import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './filmes.css'

import api from '../../services/api'

export default function Filme() {
  const { id } = useParams() //precisa ser o mesmo nome do parametro que esta na rota
  const [filme,setFilme] = useState({})
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "5b5cc9136071960dc158c1b7d8ad01f7",
          language: "pt-BR",
        }
      })
        .then((response) => {
          setFilme(response.data)
          console.log(response.data)
          setLoading(false)
        })
        .catch(()=>{
          console.log('Erro ao buscar filme')
        })
    }
    loadFilme()

    return () => {
      console.log('Componente desmontado')
    }
  }, [])

  if(loading){
    return(
      <div className='filme'>
        <h1>Carregando filme...</h1>
      </div>
      )
  }
  return (
    <div className='filme-info'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
      <h3>sinopse</h3>
      <p>{filme.overview}</p>

      <strong>Avaliação: {filme.vote_average} /10</strong>

      <div className='areaButton'>
        <button>Salvar</button>
        <button>
          <a href="#">
            Treiler
          </a>
        </button>
      </div>
    </div>
  )
}
