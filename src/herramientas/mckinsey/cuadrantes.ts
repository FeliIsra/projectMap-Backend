export enum Cuadrantes {
  DOBLE_O_NADA = 'Doble o nada',
  DESARROLLAR = 'Desarrollar',
  REFORZAR = 'Reforzar',
  REPLANTEAR = 'Replantear',
  REORGANIZAR = 'Reorganizar',
  MANTENER = 'Mantener',
  ABANDONAR = 'Abandonar',
  SALIR_CON_ORDEN = 'Salir con orden',
  COSECHAR = 'Cosechar',
}

export namespace Cuadrantes {
  export function calcularCuadrante(fuerza: string, atractivo: string) {
    let estrategia;
    if (fuerza == 'Baja' && atractivo == 'Baja')
      estrategia = Cuadrantes.ABANDONAR;
    else if (fuerza == 'Baja' && atractivo == 'Media')
      estrategia = Cuadrantes.REPLANTEAR;
    else if (fuerza == 'Baja' && atractivo == 'Alta')
      estrategia = Cuadrantes.DOBLE_O_NADA;
    else if (fuerza == 'Media' && atractivo == 'Baja')
      estrategia = Cuadrantes.SALIR_CON_ORDEN;
    if (fuerza == 'Media' && atractivo == 'Media')
      estrategia = Cuadrantes.REORGANIZAR;
    else if (fuerza == 'Media' && atractivo == 'Alta')
      estrategia = Cuadrantes.DESARROLLAR;
    else if (fuerza == 'Alta' && atractivo == 'Baja')
      estrategia = Cuadrantes.COSECHAR;
    else if (fuerza == 'Alta' && atractivo == 'Media')
      estrategia = Cuadrantes.MANTENER;
    else if (fuerza == 'Alta' && atractivo == 'Alta')
      estrategia = Cuadrantes.REFORZAR;
    return estrategia;
  }

  export function clasificarUnidadDeNegocio(
    fuerzaCompetitiva: number,
    atractivoDeMercado: number,
  ) {
    let fuerza;
    let atractivo;

    if (fuerzaCompetitiva < 4) fuerza = 'Baja';
    else if (fuerzaCompetitiva < 7) fuerza = 'Media';
    else fuerza = 'Alta';

    if (atractivoDeMercado < 4) atractivo = 'Baja';
    else if (atractivoDeMercado < 7) atractivo = 'Media';
    else atractivo = 'Alta';

    return Cuadrantes.calcularCuadrante(fuerza, atractivo);
  }
}
