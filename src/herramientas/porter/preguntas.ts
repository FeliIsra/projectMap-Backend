import { NivelDeConcordancia } from './nivelDeConcordancia';
import { Valoracion } from './valoracion';

export class Preguntas {
  static rivalidadEntreCompetidores = [
    {
      id: 1,
      pregunta:
        '¿En la industria en la que se quiere introducir, ya están establecidos los competidores?',
    },
    {
      id: 2,
      pregunta: '¿Los competidores presenten, satisfacen a todo el mercado?',
    },
    {
      id: 3,
      pregunta: '¿Ya existe una competencia explicita entre los competidores?',
    },
    {
      id: 4,
      pregunta:
        '¿Va a entrar en el mismo sub-mercado que uno de los competidores?',
    },
    { id: 5, pregunta: '¿La diversidad de competidores es alta?' },
    {
      id: 6,
      pregunta:
        '¿Existe una guerra de precios actualmente en el sector deseado?',
    },
  ];
  static poderDeNegociacionConElCliente = [
    {
      id: 1,
      pregunta:
        '¿Son sus clientes sensibles a los cambios de precios en sus productos?',
    },
    {
      id: 2,
      pregunta:
        '¿Existe una escasez de clientes en su emprendimiento en comparación con otros competidores en la industria? ',
    },
    { id: 3, pregunta: '¿Tiene dificultad para retener a sus clientes?' },
    { id: 4, pregunta: '¿El volumen de compra de sus clientes es alto?' },
    {
      id: 5,
      pregunta:
        '¿El costo para los fabricantes de productos sustitutos es baja?',
    },
    {
      id: 6,
      pregunta:
        '¿Hay posibilidad de que el cliente acceda a su producto en otro lado?',
    },
  ];

  static poderDeNegociacionConProveedores = [
    {
      id: 1,
      pregunta:
        '¿Hay pocos proveedores de las materias primas necesarias/personal para desarrollar su actividad económica?',
    },
    {
      id: 2,
      pregunta: '¿Hay mucha variación en los precios de sus proveedores?',
    },
    {
      id: 3,
      pregunta:
        '¿El perfil profesional requerido para realizar su actividad económica, es fácil de encontrar?',
    },
    {
      id: 4,
      pregunta:
        '¿Existe una falta de formación profesional para el personal a contratar en el mercado?',
    },
    {
      id: 5,
      pregunta:
        '¿Tiene dificultad para sustituir sus proveedores por otros? (Sea por temas de calidad, precio, etc)',
    },
    {
      id: 6,
      pregunta:
        '¿Existen esfuerzos de investigación y desarrollo (R&D) para mejorar las tecnologías en el ámbito de sus proveedores?',
    },
  ];

  static amenazaDeNuevosCompetidores = [
    {
      id: 1,
      pregunta:
        '¿Es el costo para iniciar un nuevo negocio dentro de su industria es baja?',
    },
    {
      id: 2,
      pregunta:
        '¿Hay espacio para más competidores fuera de los ya establecidos?',
    },
    { id: 3, pregunta: '¿Es pequeña la escala de la industria?' },
    {
      id: 4,
      pregunta: '¿Es costoso para los clientes cambiar de empresa proveedora?',
    },
    {
      id: 5,
      pregunta: '¿Hay una escasez de puntos de venta de este tipo de negocio?',
    },
    {
      id: 6,
      pregunta:
        '¿Existen chances de que nuevas tecnologías derriben las barreras de entradas como están establecidas en este momento?',
    },
  ];

  static amenazaDeSustitucion = [
    {
      id: 1,
      pregunta: '¿Hay reemplazos directos para su producto o servicio?',
    },
    {
      id: 2,
      pregunta:
        '¿Los productos sustitutos tienen un grado alto de innovación en comparación con sus productos?',
    },
    {
      id: 3,
      pregunta:
        '¿Existe un interés en sus clientes de cambiarse a estos productos sustitutos?',
    },
    {
      id: 4,
      pregunta:
        '¿El costo de cambio para sus clientes a estos productos sustitutos, es bajo?',
    },
    {
      id: 5,
      pregunta:
        '¿El precio de estos productos sustitutos es menor que el de los suyos?',
    },
    {
      id: 6,
      pregunta:
        '¿La calidad de estos productos sustitutos es mayor que la de los suyos?',
    },
  ];

  static calcularPuntaje(
    nivelDeConcordancia: NivelDeConcordancia,
    valoracion: Valoracion,
  ): number {
    let factorNivelConcordancia;
    let factorValoracion;

    switch (nivelDeConcordancia) {
      case NivelDeConcordancia.CONCUERDO_TOTALMENTE:
        factorNivelConcordancia = 5;
        break;
      case NivelDeConcordancia.CONCUERDO_EN_PARTE:
        factorNivelConcordancia = 4;
        break;
      case NivelDeConcordancia.NI_DE_ACUERDO_NI_EN_DESACUERDO:
        factorNivelConcordancia = 3;
        break;
      case NivelDeConcordancia.DE_ACUERDO_EN_PARTE:
        factorNivelConcordancia = 2;
        break;
      case NivelDeConcordancia.DE_ACUERDO_TOTALMENTE:
        factorNivelConcordancia = 0;
        break;
    }

    switch (valoracion) {
      case Valoracion.MUY_IMPORTANTE:
        factorValoracion = 2;
        break;
      case Valoracion.IMPORTANTE:
        factorValoracion = 1.5;
        break;
      case Valoracion.NO_IMPORTANTE:
        factorValoracion = 1;
        break;
    }
    return factorNivelConcordancia * factorValoracion;
  }
}
