import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {

    const [title, setTitle] = new useState('');
    const [description, setDescription] = new useState('');
    const [value, setValue] = new useState('');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(event) {
        try {
            event.preventDefault();
            const data = {
                title,
                description,
                value
            }

            api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                }
            });
            alert('Caso criado com sucesso');

            history.push('/profile');

        } catch (err) {
            alert('Erro ao criar um novo caso, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói para resolver isso.
                    </p>
                    
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                    placeholder="Título do caso"
                    value={title}
                    onChange={ event => setTitle(event.target.value)}
                    />
                    <textarea 
                    placeholder="Descrição" 
                    value={description}
                    onChange={ event => setDescription(event.target.value)}
                    />
                    <input 
                    placeholder="Valor em reais"
                    value={value}
                    onChange={ event => setValue(event.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}