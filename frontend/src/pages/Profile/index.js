import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import NewIncident from '../NewIncident';

export default function Profile() {
    
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const[incidents, setIncidents] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleRemoveIncident(id) {
        try {
           await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter( incident => incident.id !== id));
        } catch(err) {
            alert('Erro ao deletar o caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header> 
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vindo, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastar novo caso
                </Link>
                <button type="button"> 
                <FiPower onClick={handleLogout} size={18} color="#e02041"></FiPower>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button>
                            <FiTrash2 onClick={ () => handleRemoveIncident(incident.id) } size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}