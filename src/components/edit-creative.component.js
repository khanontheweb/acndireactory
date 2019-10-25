import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EditCreative() {
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
    return (
        <div>
            Hello from Edit Creative Component
        </div>
    );
}

export default EditCreative;