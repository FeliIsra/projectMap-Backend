import { Area, Importancia, Intensidad, Tendencia } from '../enums';

export const mapImportanciaToValue = (key: Importancia, area: Area): number => {
  let dict = {};
  switch (area) {
    case Area.POLITICO:
    case Area.ECONOMICO:
    case Area.SOCIAL:
    case Area.TECNOLOGICO:
    case Area.AMBIENTAL:
    case Area.LEGAL:
      dict = {
        [Importancia['Muy importante']]: 5,
        [Importancia.Importante]: 4,
        [Importancia.Indiferente]: 3,
        [Importancia['Poco importante']]: 2,
        [Importancia['Sin importancia']]: 1,
      };
      break;
  }

  return dict[key];
};

export const mapIntensidadToValue = (key: Intensidad, area: Area): number => {
  let dict = {};
  switch (area) {
    case Area.POLITICO:
    case Area.ECONOMICO:
      dict = {
        [Intensidad['Muy fuerte']]: 5,
        [Intensidad.Fuerte]: 4,
        [Intensidad.Promedio]: 3,
        [Intensidad.Debil]: 2,
        [Intensidad['Muy debil']]: 1,
      };
      break;
    case Area.SOCIAL:
    case Area.TECNOLOGICO:
    case Area.AMBIENTAL:
    case Area.LEGAL:
      dict = {
        [Intensidad['Muy fuerte']]: 1,
        [Intensidad.Fuerte]: 2,
        [Intensidad.Promedio]: 3,
        [Intensidad.Debil]: 4,
        [Intensidad['Muy debil']]: 5,
      };
      break;
  }
  return dict[key];
};

export const mapTendenciaToValue = (key: Tendencia, area: Area): number => {
  let dict = {};
  switch (area) {
    case Area.POLITICO:
    case Area.SOCIAL:
      dict = {
        [Tendencia['Mucha mejora']]: 5,
        [Tendencia.Mejora]: 4,
        [Tendencia.Mantiene]: 3,
        [Tendencia.Empeoramiento]: 2,
        [Tendencia.Peor]: 1,
      };
      break;
    case Area.ECONOMICO:
    case Area.TECNOLOGICO:
    case Area.AMBIENTAL:
    case Area.LEGAL:
      dict = {
        [Tendencia['Mucha mejora']]: 1,
        [Tendencia.Mejora]: 2,
        [Tendencia.Mantiene]: 3,
        [Tendencia.Empeoramiento]: 4,
        [Tendencia.Peor]: 5,
      };
      break;
  }
  return dict[key];
};
