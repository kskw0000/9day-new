import React, { useState } from 'react';
import axios from 'axios';

function Admin() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);  // 追加

    const handleImageChange = (event) => {  // 追加
        setImage(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();  // 変更
        formData.append('name', name);  // 変更
        formData.append('location', location);  // 変更
        formData.append('type', type);  // 変更
        formData.append('image', image);  // 追加

        axios.post('https://nineday-neww.onrender.com', formData)  // 変更
            .then(res => {
                console.log(res);

                setName('');
                setLocation('');
                setType('');
                setImage(null);  // 追加
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <h2>保育園情報の管理</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    保育園の名前:
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    保育園の場所:
                    <input type="text" name="location" value={location} onChange={e => setLocation(e.target.value)} />
                </label>
                <label>
                    保育園の種類:
                    <input type="text" name="type" value={type} onChange={e => setType(e.target.value)} />
                </label>
                <label>  
                    保育園の画像:
                    <input type="file" onChange={handleImageChange} />  
                </label>  
                <button type="submit">保育園を追加</button>
            </form>
        </div>
    );
}

export default Admin;
