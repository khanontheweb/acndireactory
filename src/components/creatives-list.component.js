import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CreativesList() {
    const [creatives, setCreatives] = useState([]);
    const [searchedName, setSearchedName] = useState('');
    const [searchedMedium, setSearchedMedium] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/creatives/')
        .then(response => {
            setCreatives(response.data);
        })
        .catch(err => console.log(err));
    }, []);

    const Creative = props => {
        return(
            <tr>
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
            <table className="table table-striped">
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
                <tbody>
                    {makeList()}
                </tbody>
            </table>
        </div>
    );
}

export default CreativesList;