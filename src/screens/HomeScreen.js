//pantalla principal

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import colores from '../styles/colores';

export default function HomeScreen ({navigation, route}) {
    const [movimientos, setMovimientos] = useState([]);

    React.useEffect(() => {
        if (route.params?.nuevoMovimiento) {
            setMovimientos(prev => [route.params.nuevoMovimiento, ...prev]);
        }
    }, [route.params?.nuevoMovimiento]);

    const total = movimientos.reduce((suma, item) => {
        return  item.tipo === 'ingreso' ? suma + item.monto : suma - item.monto;
    }, 0);

    return (
        <View style={styles.container}>
            <View style = {styles.tarjetaSaldo}>
                <Text style={styles.etiquetaSaldo}>Saldo disponible</Text>
                <Text style={[styles.saldo, { color: total >= 0 ? colores.ingreso : colores.gasto }]}>
                    ${total.toFixed(2)}
                </Text>
        </View>

        <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate('Agregar')}
        >
            <Text style={styles.botonTexto}>+ Agregar movimiento</Text>
        </TouchableOpacity>

        <FlatList
            data={movimientos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
            <View style={styles.item}>
                <Text style={styles.itemDescripcion}>{item.descripcion}</Text>
                <Text style={[styles.itemMonto, { color: item.tipo === 'ingreso' ? colores.ingreso : colores.gasto }]}>
                {item.tipo === 'ingreso' ? '+' : '-'}${item.monto.toFixed(2)}
                </Text>
            </View>
            )}
            ListEmptyComponent={
            <Text style={styles.vacio}>Aún no hay movimientos</Text>
            }
        />
        </View>
    );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo, padding: 16 },
  tarjetaSaldo: { backgroundColor: colores.blanco, borderRadius: 12, padding: 24, alignItems: 'center', marginBottom: 16, elevation: 2 },
  etiquetaSaldo: { fontSize: 14, color: colores.texto, marginBottom: 8 },
  saldo: { fontSize: 36, fontWeight: 'bold' },
  boton: { backgroundColor: colores.texto, borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 16 },
  botonTexto: { color: colores.blanco, fontSize: 16, fontWeight: 'bold' },
  item: { backgroundColor: colores.tarjeta, borderRadius: 10, padding: 14, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', elevation: 1 },
  itemDescripcion: { fontSize: 15, color: colores.texto },
  itemMonto: { fontSize: 15, fontWeight: 'bold' },
  vacio: { textAlign: 'center', color: '#aaa', marginTop: 40, fontSize: 15 },
});