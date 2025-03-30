import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './filmes.css'
import { toast } from 'react-toastify'

import api from '../../services/api'

export default function Filme() {
  const { id } = useParams() //precisa ser o mesmo nome do parametro que esta na rota
  const navigate = useNavigate();
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
          // console.log(response.data)
          setLoading(false)
        })
        .catch(()=>{
          //se o filme nao existir, redireciona para a pagina inicial
          navigate('/',{replace:true}) //redireciona para a pagina inicial
          return;
        })
    }
    loadFilme()

    return () => {
      console.log('Componente desmontado')
    }
  }, [navigate, id])

  function salvarFilme(){
    const minhaLista = localStorage.getItem('@filmes')

    let filmesSalvos = JSON.parse(minhaLista) || [] //pegando os filmes salvos no localStorage e transformando em um array

    //se tiver algum filme salvo com o mesmo id, nao salva
    const hasFilme = filmesSalvos.some((filmesSalvos)=> //some() verifica se tem algum item igual ao que esta sendo passado
     filmesSalvos.id === filme.id

    )
    if(hasFilme){
      toast.warn("Esse filme já está na sua lista!")
      return;
    }
    filmesSalvos.push(filme);
    localStorage.setItem("@filmes",JSON.stringify(filmesSalvos))
    toast.success("Filme salvo com sucesso!")
  }
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
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="_blank" href={`https://www.youtube.com/results?search_query=${filme.title}+trailer`}  rel='noreferrer'>
            Treiler
          </a>
        </button>
      </div>
    </div>
  )
}
