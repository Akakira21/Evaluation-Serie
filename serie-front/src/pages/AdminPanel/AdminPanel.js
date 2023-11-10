import React, { useRef } from 'react';
import styles from './AdminPanel.module.scss'
import AddSerie from './Components/AddSerie';
import { useState } from 'react';

const AdminPanel = () => {

    const [ button, setButton ] = useState(0)

    return (
        <div>
            <h1>Admin Panel</h1>
            {button === 0 ? (
                <div className="flex-fill">

                    <button type='button' onClick={() => setButton(1)}>Add a show</button>
                    <button type='button' onClick={() => setButton(2)}>Modify a show</button>
                
                </div>
                ):(
                    button === 2 ? (
                        <>

                            <button type='button' onClick={() => setButton(0)}> Close </button>
                            <p>Modify Show</p>

                        </>
                    ):(
                        <>
                        
                            <button type='button' onClick={() => setButton(0)}> Close </button>
                            <AddSerie />
                        
                        </>
                    )
            )}
        </div>
    );
};

export default AdminPanel;