import React from 'react'

import { useEffect, useState } from 'react'

import api from '../../services/api'



export default function Home() {

  const [filmes, setFilmes] = useState('')

  useEffect(()=>{
    async function loadFilmes(){
      const response = await api.get("movie/now_playing",{
        params:{
          api_key:"5b5cc9136071960dc158c1b7d8ad01f7",
          language:"pt-BR",
          page:1
        }
      })
      console.log(response.data.results)
    }
    loadFilmes()
  },[])

  return (
    <div>
      <h1>Bem vindo a Home</h1>
    </div>
  )
}