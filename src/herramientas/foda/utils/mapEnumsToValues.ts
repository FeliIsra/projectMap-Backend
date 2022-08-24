import { Area, Importancia, Intensidad, Tendencia, Urgencia } from '../enums';

export const mapImportanciaToValue = (key: Importancia): number => {
  const dict = {
    [Importancia['Totalmente importante']]: 5,
    [Importancia['Muy importante']]: 4,
    [Importancia.Importante]: 3,
    [Importancia.Inmaterial]: 2,
    [Importancia['Sin importancia']]: 1,
  };
  return dict[key];
};

export const mapIntensidadToValue = (key: Intensidad, area: Area): number => {
  const dict = {
    [Area.FORTALEZA]: {
      [Intensidad['Muy fuerte']]: 5,
      [Intensidad.Fuerte]: 4,
      [Intensidad.Promedio]: 3,
      [Intensidad.Debil]: 2,
      [Intensidad['Muy debil']]: 1,
    },
    [Area.DEBILIDAD]: {
      [Intensidad['Muy fuerte']]: 1,
      [Intensidad.Fuerte]: 3,
      [Intensidad.Promedio]: 3,
      [Intensidad.Debil]: 4,
      [Intensidad['Muy debil']]: 5,
    },
  };
  return dict[area][key];
};

export const mapTendenciaToValue = (key: Tendencia, area: Area): number => {
  const dict = {
    [Area.FORTALEZA]: {
      [Tendencia['Mucha mejora']]: 5,
      [Tendencia.Mejora]: 4,
      [Tendencia.Mantiene]: 3,
      [Tendencia.Empeoramiento]: 2,
      [Tendencia.Peor]: 1,
    },
    [Area.OPORTUNIDAD]: {
      [Tendencia['Mucha mejora']]: 5,
      [Tendencia.Mejora]: 4,
      [Tendencia.Mantiene]: 3,
      [Tendencia.Empeoramiento]: 2,
      [Tendencia.Peor]: 1,
    },
    [Area.DEBILIDAD]: {
      [Tendencia['Mucha mejora']]: 1,
      [Tendencia.Mejora]: 2,
      [Tendencia.Mantiene]: 3,
      [Tendencia.Empeoramiento]: 4,
      [Tendencia.Peor]: 5,
    },
    [Area.AMENAZA]: {
      [Tendencia['Mucha mejora']]: 1,
      [Tendencia.Mejora]: 2,
      [Tendencia.Mantiene]: 3,
      [Tendencia.Empeoramiento]: 4,
      [Tendencia.Peor]: 5,
    },
  };
  return dict[area][key];
};

export const mapUrgenciaToValue = (key: Urgencia): number => {
  const dict = {
    [Urgencia['Nada urgente']]: 1,
    [Urgencia['Algo urgente']]: 2,
    [Urgencia.Urgente]: 3,
    [Urgencia['Muy urgente']]: 4,
    [Urgencia['Para ayer']]: 5,
  };
  return dict[key];
};
