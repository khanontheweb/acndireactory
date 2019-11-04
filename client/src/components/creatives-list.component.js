import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//TODO:
//Make mediums separated by commas
//Give the ability to search with multiple names/mediums
//Change search state objects into arrays for the above
function CreativesList() {
    const [creatives, setCreatives] = useState([]);
    const [searchedName, setSearchedName] = useState('');
    const [searchedMedium, setSearchedMedium] = useState('');

    useEffect(() => {
        axios.get('https://acndireactory.herokuapp.com/creatives/')
        .then(response => setCreatives(response.data))
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const creativesTable = document.getElementById('creatives-table');
        Array.from(creativesTable.children).filter((child) => {
            console.log(child.innerHTML);
            if(!child.innerHTML.toLowerCase().includes(searchedName.toLowerCase()) || !child.innerHTML.toLowerCase().includes(searchedMedium.toLowerCase()))
                child.classList.add("d-none");
            else
                child.classList.remove("d-none");
        })
    },[searchedName, searchedMedium]);

    const Creative = props => {
        return(
            <tr key={props.creative._id}>
                <td>{props.creative.name}</td>
                <td>{props.creative.instagram}</td>
                <td>{props.creative.facebook}</td>
                <td>{props.creative.email}</td>
                <td>{props.creative.mediums}</td>
                <td>
                    <Link to={`/edit/${props.creative._id}`}>Edit</Link>
                </td>
            </tr>
        )

    }

    const makeList = ()=> {
        return creatives.map((currentCreative, i) => {
            return <Creative creative={currentCreative} key={i} />;
        });
    }

    return (
        <div>
            <h3>Creaitves List</h3>
            <div className="form-group">
                <label>Name: </label>
                <input type="text"
                       className="form-control"
                       value={searchedName}
                       onChange={event=>setSearchedName(event.target.value)}
                       placeholder="Kevin, Daniel, Chang, Lin..."/>
            </div>
            <div className="form-group">
                    <label>Medium: </label>
                    <input type="text"
                           className="form-control"
                           value={searchedMedium}
                           onChange={event=>setSearchedMedium(event.target.value)}
                           placeholder="Music, Dance, Video..."/>
            </div>
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Instagram</th>
                        <th>Facebook</th>
                        <th>Email</th>
                        <th>Mediums</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="creatives-table">
                    {makeList()}
                </tbody>
            </table>
        </div>
    );
}

export default CreativesList;