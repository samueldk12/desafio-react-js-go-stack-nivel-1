import React, { useState, useEffect } from "react";
import api from 'services/api';

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);
  useEffect(()=> {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  },[]);

  async function handleAddRepository() {
    
    const response = await api.post('projects', {
      title: Date.now(),
      url   : "www.teste3.com.br",
      teachs : "Samuel Arão"
    });

    const project = response.data;

    setProjects([...projects,project]);

  }

  async function handleRemoveRepository(id) {
    api.delete('projects', {
      id
    });
    indexProject = projects.findIndex(
      project => project.id == id
    );
    projects.splice(indexProject,1);
    setProjects(projects);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {projects.map(project => 
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
