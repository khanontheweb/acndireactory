import React, {useState, useEffect} from 'react';
import axios from 'axios';

function CreateCreative() {
    const [name, setName] = useState('');
    const [instagram, setInstagram] = useState('');
    const [searchedMedium, setSearchedMedium] = useState('');
    const [email, setEmail] = useState('');
    const [facebook, setFacebook] = useState('');
    const [options, setOptions] = useState(new Map(
        [["Music", 1],
        ["Dance", 2],
        ["Fashion", 3],
        ["Photography", 4]]
    ));
    const [mediums, setMediums] = useState([]);
    
    useEffect(() => {
        const mediumsTable = document.getElementById('mediums');
        Array.from(mediumsTable.children).filter((child) => {
            if(!child.innerHTML.toLowerCase().includes(searchedMedium.toLowerCase()))
                child.classList.add("d-none");
            else
                child.classList.remove("d-none");
        })
    },[searchedMedium]);   
    
    const handleMediumsClick = (event, option) => {
        
        if(mediums.includes(option[0])) {
            console.log(mediums);
            console.log(option[0]);
            setMediums(mediums.filter(element => { return element !== option[0]}));
        }
        else {
            setMediums(mediums => mediums.concat(option[0]));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log("Form submitted", name, instagram, email, facebook, mediums);
        
        const newCreative = {
            "name": name,
            "instagram": instagram,
            "email": email,
            "facebook": facebook,
            "mediums": mediums
        };

        axios.post('http://localhost:4000/creatives/add', newCreative)
        .then(res => console.log(res.data));

        setName('');
        setInstagram('');
        setEmail('');
        setFacebook('');
        setOptions(new Map( [["Music", [false,1]],
        ["Dance", [false,2]],
        ["Fashion", [false,3]],
        ["Photography", [false,4]]]));
    }

    return (
        <div>
            <h3>Create New Entry</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" 
                            className="form-control" 
                            value={name} 
                            onChange={event => setName(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Instagram: </label>
                    <input type="text" 
                            className="form-control" 
                            value={instagram} 
                            onChange={event => setInstagram(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Facebook: </label>
                    <input type="text" 
                            className="form-control" 
                            value={facebook} 
                            onChange={event => setFacebook(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text" 
                            className="form-control" 
                            value={email} 
                            onChange={event => setEmail(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Mediums: </label>
                    <input type="text"
                           className="form-control"
                           value={searchedMedium}
                           onChange={event=>setSearchedMedium(event.target.value)}
                           placeholder="Music, Dance, Video..."/>
                    <div className="row mx-0" id="mediums">
                        {
                            Array.from(options.entries()).map((option, index) => (
                                <div key={option[1]} id={option[1]} className={"col-4 " + (mediums.includes(option[0])?"selected":" ")} onClick={(event) => handleMediumsClick(event, option)}>{option[0]}</div>
                            ))
                        }
                    </div>
                </div>
                

                <div className="form-group">
                    <input type="Submit"
                           value="Create Creative"
                           className="btn btn-primary"/>
                </div>
            </form>
        </div>
    );
}

export default CreateCreative;