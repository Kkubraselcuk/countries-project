import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container} from 'react-bootstrap';

const Countries = () => {
    const [country, setCountry] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setisLoading] = useState(true);

    const getData = async ()=>{
        const res = await axios.get('https://restcountries.com/v2/all');
        console.log(res.data);
        setCountry(res.data);
        setisLoading(false);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    useEffect(()=>{
        getData();
    }, []);

    
    //Capital alanında arama yapar.
    const filterData = country.filter(item => {
        if(typeof(item.capital)=== "undefined"){
            item.capital=" ";
            return item.capital;
        }
        return item.capital.toLowerCase().includes(search.toLowerCase());
    })
    
    //Tablodaki veriler üzerinde arama yapar.
    // const filterData = country.filter(item => {
    //     if(typeof(item.capital)=== "undefined"){
    //         item.capital=" ";
    //         return item.capital;
    //     }
    //     return item.name.toLowerCase().includes(search.toLowerCase()) || item.region.toLowerCase().includes(search.toLowerCase()) || item.capital.toLowerCase().includes(search.toLowerCase());
    // })

    return (
        <>
        {isLoading ? (
            <h1 className="isLoading">İs Loading...</h1>
        ) : (
            <Container className="container">
                <h1>Countries</h1>
                <div className="input-container">
                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" /></svg>
                    <input type="text" value={search} onChange={handleSearch} />
                </div>
                <table size="sm" id="table"  className="table  table-borderessed table-striped table-hover align-middle">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Capital</th>
                            <th>Region</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData.map(Item=>(
                            <tr key={Item.alpha2Code}>
                                <td>{Item.name}</td>
                                <td>{Item.capital}</td>
                                <td>{Item.region}</td>
                                <td><img src={Item.flag} alt={Item.name} width="70px"/></td>
                            </tr>
                        ))}
                        {!filterData.length && <p>Not found any country...</p>}
                    </tbody>
                </table>
            </Container>
        )}
        
        </>
    );
}

export default Countries;
