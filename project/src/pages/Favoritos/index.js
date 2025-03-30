import React from 'react'
import "./Favoritos.css"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos() {

    const [filmes, setFilmes] = useState([])

    useEffect(()=>{
        const minhaLista = localStorage.getItem('@filmes') //pegando os filmes salvos no localStorage

        setFilmes(JSON.parse(minhaLista) || []) //vem como um String e precisa ser transformado em um array
    },[])

    function excluir(id){
        let filtroFilmes = filmes.filter((filme)=>{
            return(filme.id !== id)
        })
        setFilmes(filtroFilmes)
        localStorage.setItem('@filmes', JSON.stringify(filtroFilmes)) //salvando no localStorage
        toast.success("Filme excluído com sucesso!") //exibindo mensagem de sucesso
    }



    return (
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>
            {filmes.length == 0 && <span>Você não possui nenhum filme salvo</span>}

            <ul>
                {filmes.map((filme)=>{return(
                    <li key={filme.id}>
                        <span>{filme.title}</span>
                        <div>
                            <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                            <button onClick={()=>{excluir(filme.id)}}>Excluir</button>
                        </div>
                        <img className='image' src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                    </li>
                )})}
            </ul>
        </div>
    )
}

export default Favoritos;