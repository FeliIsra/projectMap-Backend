import { NivelDeConcordancia } from './nivelDeConcordancia';
import { Valoracion } from './valoracion';

export class Preguntas {
  static rivalidadEntreCompetidores = [
    {
      id: 1,
      pregunta:
        'En la industria desea introducir / actos ya están establecidos los competidores?',
    },
    {
      id: 2,
      pregunta:
        'La (s) competidor (s) presente ya se puede satisfacer a todo el mercado?',
    },
    {
      id: 3,
      pregunta: 'Ya existe una competencia explícita entre los competidores?',
    },
    { id: 4, pregunta: 'Va a entrar en el mismo mercado que?' },
    { id: 5, pregunta: 'La diversidad de estos competidores es alto?' },
    {
      id: 6,
      pregunta: 'Hay una guerra de precios o la calidad en el sector deseado?',
    },
  ];
  static poderDeNegociacionConElCliente = [
    { id: 1, pregunta: 'Sus clientes son sensibles a los cambios de precios?' },
    {
      id: 2,
      pregunta:
        'Hay una escasez de clientes para su negocio en relación con su industria?',
    },
    { id: 3, pregunta: '¿Tiene dificultad para retener a sus clientes?' },
    { id: 4, pregunta: 'El volumen de compra de sus clientes es alto?' },
    {
      id: 5,
      pregunta:
        'El costo para los fabricantes de conmutadores cliente es baja?',
    },
    {
      id: 6,
      pregunta: 'Hay una posibilidad de que su cliente al producto en sí?',
    },
  ];

  static poderDeNegociacionConProveedores = [
    { id: 1, pregunta: 'Hay pocos proveedores de las entradas de su negocio?' },
    {
      id: 2,
      pregunta:
        'El precio de los suministros necesarios para su negocio es muy variable?',
    },
    {
      id: 3,
      pregunta:
        'El perfil profesional requerido para su negocio es fácil de encontrar?',
    },
    {
      id: 4,
      pregunta:
        'Hay una falta de formación profesional para sus vendedores del mercado?',
    },
    {
      id: 5,
      pregunta:
        '¿Tiene dificultad para sustituir sus entradas para otros (calidad, precio, etc.)?',
    },
    {
      id: 6,
      pregunta:
        'Hay investigaciones para mejorar la tecnología en el ámbito de sus proveedores?',
    },
  ];

  static amenazaDeNuevosCompetidores = [
    {
      id: 1,
      pregunta:
        'El costo para iniciar un nuevo negocio dentro de su industria es baja?',
    },
    {
      id: 2,
      pregunta: 'Hay espacio para más competidores fuera de la ya establecida?',
    },
    { id: 3, pregunta: 'La industria es pequeña escala?' },
    { id: 4, pregunta: 'Los costes de cambio para los clientes son bajos?' },
    {
      id: 5,
      pregunta: 'Hay una escasez de puntos de venta de este tipo de negocio?',
    },
    {
      id: 6,
      pregunta:
        'Existe un riesgo de nuevas tecnologías derribar las barreras de entrada?',
    },
  ];

  static amenazaDeSustitucion = [
    { id: 1, pregunta: 'Hay reemplazos directos a su producto / servicio?' },
    {
      id: 2,
      pregunta: 'Los productos sustitutos tienen un alto grado de innovación?',
    },
    {
      id: 3,
      pregunta:
        'Hay propensión de sus clientes para cambiar su oferta de sustitutos?',
    },
    {
      id: 4,
      pregunta: 'El cambio en el costo de los clientes a sustituir es baja?',
    },
    {
      id: 5,
      pregunta:
        'El precio de los productos de sustitución es menor que su producto o servicio?',
    },
    {
      id: 6,
      pregunta:
        'La calidad de los productos de sustitución es mayor que la calidad de su producto o servicio?',
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
