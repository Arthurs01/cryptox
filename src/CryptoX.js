import React from 'react'
import { useState, useEffect } from "react"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import videox from '../src/Video/mundo2.mp4'
import Alien from '../src/Img/allien3.png'


function CryptoX() {

    const [coins, setCoins] = useState([])    // Array API
    const [search, setSearch] = useState('')  // Filtrado de monedas
    const [order, setOrder] = useState('')      // Ordenar por precio/nombre

    //----------API  CRYPTOMONEDAS 
    const getData = async () => {
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1")
        setCoins(res.data)
        setTimeout(getData, 60000); // Obtenemos datos de API cada 60 seg 
        console.log(res.data)
    }

    useEffect(() => {
        getData()
    }, [])


    // Función para filtrado de monedas
    const filteredData = coins.filter(
        (coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) |
            coin.symbol.toLowerCase().includes(search.toLowerCase())
    );


    //--------Favoritos------------
    
    const favs = (coinID) => {
        const copyData = coins.find(coin => coin.id === coinID);
        const deleteData = coins.filter(coin => coin.id !== coinID);

        setCoins([(copyData)].concat(deleteData))


    }

    //--------Ordenar por nombre o precio----------
  
    const sortName = () => {

        const result = coins.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {

                return 1;
            }
            return 0;
        });
        console.log(setOrder)
        setOrder(result)
    }

    const sortPrice = () => {
        const result2 = coins.sort((a, b) => {

            if (a.current_price > b.current_price) {
                return -1;
            }
            if (a.current_price < b.current_price) {
                return 1;
            }
            return 0;
        });
        setOrder(result2)
    }

    //-------------------Nav fijo animado--------------------------------------

    const fixedBar = () => {
        window.addEventListener("scroll", function () {
            var nav = document.querySelector("nav");
            var subHeader = document.querySelector("section");
            var cryptoX = document.getElementById("crypto");
            var input = document.querySelector('article');
            nav.classList.toggle("abajo", window.scrollY > 0);
            subHeader.classList.toggle("subir", window.scrollY > 0);
            cryptoX.classList.toggle("ocultar", window.scrollY > 0);
            input.classList.toggle("reducir", window.scrollY > 0);
        })
    }

    useEffect(() => {
        fixedBar()
    }, [])
  

    return (
        <div className='CryptoX'>

            {/* ----------------Header/Nav-------------------------------- */}

            <div className="header">
            <video className='videoTag' autoPlay loop muted>
                <source src={videox} type='video/mp4' />
            </video>

            <nav className='nav'>
                <div className="logo">
                    <img src={Alien} alt="Alien" />
                    <h2 id='crypto' className='crypto'>Crypto<span className='x'>X</span></h2>
                </div>
            </nav>
            </div>
            
            <div className="coins_data">
                <div className="sub_header">
                   
                    {/*-----------------------Boton para ordenar por Nombre/Precio-------------- */}
                    <section>
                        <div className="dropdown show">
                            <a className=" btn dropdown-toggle" role="button" id="dropdownMenuLink"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Order by
                            </a>

                            <div className="dropdown-menu"  aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item " onClick={() => setOrder(sortName)}>Name</a>
                                <a className="dropdown-item " onClick={() => setOrder(sortPrice)}>Price</a>
                            </div>
                        </div>

                        {/* ------------I N P U T-----FILTRADOR DE MONEDAS------------------------- */}
                        <article>
                            <div className='input'  >
                                <input type="text" placeholder='Search a Coin' id='input'
                                    className='form-control mt-4 mb-4 border-0 text-primary  text-center' onChange={e => setSearch(e.target.value)} />
                            </div>
                        </article>
                    </section>
                </div>

                {/*---------------------Tabla Array---------------------------- */}
                <div className="array_titles row">
                    <td><strong>Coin</strong></td><td><strong>Price $ dls</strong></td><td><strong> Price change % 24h</strong></td>
                </div>
                 

                 {/* ------------------Mapeo de Array-------------------------- */}

                <div className='array_data'>
                    {filteredData.map(coin => (
                        <div className='data row' key={coin.id}>
                            <td><img src={coin.image} alt={coin.image} style={{ width: '17px' }} className='img-fluid me-2' />
                                {coin.name}<span className='symbol ms-2 text-muted text-uppercase'>{coin.symbol}</span></td>
                            <td>{coin.current_price}</td>

                            <td className={coin.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'}>
                                {coin.price_change_percentage_24h}&nbsp;
                                <span className='fav-box'>
                                    <FontAwesomeIcon icon={faThumbsUp} className='fav' onClick={() => favs(coin.id)} />
                                </span>
                            </td>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default CryptoX







