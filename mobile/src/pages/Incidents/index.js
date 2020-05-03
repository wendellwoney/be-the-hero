import React, {useState, useEffect} from 'react';
import { Feather }  from '@expo/vector-icons'
import {View, FlatList,  Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
    const navigation = useNavigation();
    const [incidentes, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDatail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if(loading == true) {
            return false;
        }

        if(total > 0 && incidentes.length == total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents',{
            params: { page }
        })
        
        setIncidents([...incidentes, ...response.data]);

        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    }

    useEffect(()=>{
        loadIncidents();
    }, []);
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> { total } Casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                keyExtractor={incident => String(incident.id)}
                style={styles.incidentList}
                data={incidentes}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentPropety}>ONG:</Text>
                        <Text style={styles.incidentValue}>{ incident.name }</Text>

                        <Text style={styles.incidentPropety}>CASO:</Text>
                        <Text style={styles.incidentValue}>{ incident.description }</Text>

                        <Text style={styles.incidentPropety}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{ Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency:'BRL'
                        }).format(incident.value) }</Text>

                        <TouchableOpacity
                        style={styles.detailsButton} 
                        onPress={() => navigateToDatail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}