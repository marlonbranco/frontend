import React, { useState, useEffect } from 'react';
import api from './services/api'

import './App.css'

import Header from './components/Header';

export default function App() {
    const [ projects, setProjects ] = useState([]);

    //useState retorna um Array com 2 posições
    //na primeira posição vai retornar a váriavel com o seu valor inicial
    //E no segundo é uma função para atualizar esse valor, no caso se gera um novo

     useEffect(() => {
       api.get('projects').then(res => {
        setProjects(res.data);
       })
    },[])

    async function handleAddProject(){
        //setProjects([...projects, `New Project ${Date.now()}`]);
        
        const res = await api.post('projects', {
                title: `Novo projeto ${Date.now()}`,
                owner: "Marlon Branco"
        });
        const project = res.data;
        
        setProjects([...projects, project]);

    }

    return (
        <>
            <Header title="Projects" />
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>
            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}