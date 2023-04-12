import React, {useState} from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
const host = "http://localhost:3001";


  const[notes, setNotes] = useState([])



  //Get all Notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyNzEzNTg4MGM4YTM0Nzc4NmFjNWEwIn0sImlhdCI6MTY4MTExODIxOH0.wh44pVzhI76hGirHyMyqyykM-fX6UNl4Kn2WFl4kC00"
      }
    })
    const json =  await response.json();
    setNotes(json)
      
    }
  //Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyNzEzNTg4MGM4YTM0Nzc4NmFjNWEwIn0sImlhdCI6MTY4MTExODIxOH0.wh44pVzhI76hGirHyMyqyykM-fX6UNl4Kn2WFl4kC00"
      },
      body: JSON.stringify({title,description,tag}), 
    });
    
      const note = await response.json();
      setNotes(notes.concat(note));
  }

  //Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,
    {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyNzEzNTg4MGM4YTM0Nzc4NmFjNWEwIn0sImlhdCI6MTY4MTExODIxOH0.wh44pVzhI76hGirHyMyqyykM-fX6UNl4Kn2WFl4kC00"
      }
    });
     
    const newNotes = notes.filter((note)=> {
      return note._id!==id
    } )
    setNotes(newNotes);
  }

  //Edit a Note
  const editNote = async (id,title,description,tag) => {
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyNzEzNTg4MGM4YTM0Nzc4NmFjNWEwIn0sImlhdCI6MTY4MTExODIxOH0.wh44pVzhI76hGirHyMyqyykM-fX6UNl4Kn2WFl4kC00"
    },
    body: JSON.stringify({title,description,tag}), 
  });
   
    const newNotes = JSON.parse(JSON.stringify(notes));
    for(let i=0;i<newNotes.length; i++){
      const element = newNotes[i];
      if(element._id===id){
        newNotes[i].title = title
        newNotes[i].description = description
        newNotes[i].tag = tag
        break;
      }
      
    }
    setNotes(newNotes)
  }
    
    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getAllNotes}} >
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;
