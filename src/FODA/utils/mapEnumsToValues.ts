import { Importancia, Intensidad, Tendencia } from '../enums';

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

export const mapIntensidadToValue = (key: Intensidad): number => {
  const dict = {
    [Intensidad['Muy fuerte']]: 5,
    [Intensidad.Fuerte]: 4,
    [Intensidad.Promedio]: 3,
    [Intensidad.Debil]: 2,
    [Intensidad['Muy debil']]: 4,
  };
  return dict[key];
};

export const mapTendenciaToValue = (key: Tendencia): number => {
  const dict = {
    [Tendencia['Mucha mejora']]: 5,
    [Tendencia.Mejora]: 4,
    [Tendencia.Mantiene]: 3,
    [Tendencia.Empeoramiento]: 2,
    [Tendencia.Peor]: 1,
  };
  return dict[key];
};
