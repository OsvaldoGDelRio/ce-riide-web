export interface Proceso {
    'id': number;
    'folio': number;
    'nombre': string;
    'fecha_eval': string;
    'fecha_recep': string;
    'fecha_entre': string;
    'evaluador': number;
    'id_evaluadores': number;
    'nombre_evaluador': string;
    'clave_evaluador': string;
    'juicio': number;
    'id_juicio': number;
    'tipo_juicio': string;
    'dictamen': number;
    'id_dictamen': number;
    'tipo_dictamen': string;
    'estado': number;
    'id_estado': number;
    'tipo_estado': string;
    'estandar': number;
    'id_estandares': number;
    'clave_estandar': string;
    'nombre_estandar': string;
}
