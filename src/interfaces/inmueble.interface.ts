
export interface Inmueble {
        id?: number;
        propietarioId: number;
        titulo: sting;
        ciudad: string;
        habitaciones: number;
        banos: number;
        metrosCuadrados: number;
	precioMensual: number;
        estado: 'Disponible'|'Alquilado'|'Mantenimiento';
}

