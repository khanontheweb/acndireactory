import React, {useState, useEffect} from 'react';

function CreateCreative() {
    const [name, setName] = useState('');
    const [instagram, setInstagram] = useState('');
    const [searchedMedium, setSearchedMedium] = useState('');
    const [email, setEmail] = useState('');
    const [facebook, setFacebook] = useState('');
    const [options, setOptions] = useState(new Map(
        [["Music", [false,1]],
        ["Dance", [false,2]],
        ["Fashion", [false,3]],
        ["Photography", [false,4]]]
    ));
    
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
        console.log("Handling the click");
        
        if(!option[1][0]) {
            const mergedOption = new Map([[option[0],[true, option[1][1]]]]);
            console.log(mergedOption);
            setOptions(new Map([...options, ...mergedOption]));
        }
        else {
            const mergedOption = new Map([[option[0],[false, option[1][1]]]]);
            console.log(mergedOption);
            setOptions(new Map([...options, ...mergedOption]));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted", name, instagram, email, facebook, options);
        const mediums = [];
        options.forEach((value, key, map) => {
            if(value[0])
                mediums.push(key);
        });

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
                                <div key={option[1][1]} id={option[1][1]} className={"col-4 " + (option[1][0]?"selected":" ")} onClick={(event) => handleMediumsClick(event, option)}>{option[0]}</div>
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