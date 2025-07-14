import React, { useState, useEffect } from "react";

export default function Table() {
const TableComponent = () => {
    const [rows, setRows] = useState([]);
    const [newRow, setNewRow] = useState({ id: "", name: "", message: ""});
    }

    const handleAddRow = () => {
        setRows([...rows, newRow]);
        setNewRow({ id: "", name: "", message: "" }); // Reset input fields
    };

    const popTable = async () => {
        //e.preventDefault();
        console.log("Made it here");
        //const csDetails = {sName, sEmail, sOption, sDescription}
        const response = await fetch('http://localhost:5050/contactus', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log(json);

        
    }

    useEffect(() => {
        popTable();
    }, []);

    return(
        <div className="flex justify-center">
            <table className="table-auto border">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                {/* {rows.map((row, index) => (
                    <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.message}</td>
                    </tr>
                ))} */}
                </tbody>
            </table>
        </div>
        
          
    );
}
