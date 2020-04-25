import React, { useState, useEffect } from "react";

import "./styles.css";

import axios from './services/api';
import api from "./services/api";

function App() {
  const [repos, setRepos ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(resp => {
      setRepos(resp.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepo = await api.post('/repositories', {
      title: `Outro teste: ${Date.now()}`,
      url: 'url',
      techs: []
    });

    setRepos([...repos, newRepo.data]);
  }

  async function handleRemoveRepository(id) {
    const status = await (await api.delete(`/repositories/${id}`)).status;
    if(status === 204) {      
      const repoIndex = repos.findIndex(repo => repo.id === id);
      
      const newArray = repos.filter((repo, index) => index !== repoIndex);

      setRepos([...newArray]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repos.map(repo => { return(
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
