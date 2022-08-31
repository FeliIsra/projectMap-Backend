import { NivelDeConcordancia } from './nivelDeConcordancia';
import { Valoracion } from './valoracion';

export class Preguntas {
  rivalidadEntreCompetidores = {
    1: 'En la industria desea introducir / actos ya están establecidos los competidores?',
    2: 'La (s) competidor (s) presente ya se puede satisfacer a todo el mercado?',
    3: 'Ya existe una competencia explícita entre los competidores?',
    4: 'Va a entrar en el mismo mercado que?',
    5: 'La diversidad de estos competidores es alto?',
    6: 'Hay una guerra de precios o la calidad en el sector deseado?',
  };
  poderDeNegociacionConElCliente = {
    1: 'Sus clientes son sensibles a los cambios de precios?',
    2: 'Hay una escasez de clientes para su negocio en relación con su industria?',
    3: '¿Tiene dificultad para retener a sus clientes?',
    4: 'El volumen de compra de sus clientes es alto?',
    5: 'El costo para los fabricantes de conmutadores cliente es baja?',
    6: 'Hay una posibilidad de que su cliente al producto en sí?',
  };

  poderDeNegociacionConProveedores = {
    1: 'Hay pocos proveedores de las entradas de su negocio?',
    2: 'El precio de los suministros necesarios para su negocio es muy variable?',
    3: 'El perfil profesional requerido para su negocio es fácil de encontrar?',
    4: 'Hay una falta de formación profesional para sus vendedores del mercado?',
    5: '¿Tiene dificultad para sustituir sus entradas para otros (calidad, precio, etc.)?',
    6: 'Hay investigaciones para mejorar la tecnología en el ámbito de sus proveedores?',
  };

  amenazaDeNuevosCompetidores = {
    1: 'El costo para iniciar un nuevo negocio dentro de su industria es baja?',
    2: 'Hay espacio para más competidores fuera de la ya establecida?',
    3: 'La industria es pequeña escala?',
    4: 'Los costes de cambio para los clientes son bajos?',
    5: 'Hay una escasez de puntos de venta de este tipo de negocio?',
    6: 'Hay una escasez de puntos de venta de este tipo de negocio?',
  };

  amenazaDeSustitucion = {
    1: 'Hay reemplazos directos a su producto / servicio?',
    2: 'productos sustitutos tienen un alto grado de innovación?',
    3: 'Hay propensión de sus clientes para cambiar su oferta de sustitutos?',
    4: 'El cambio en el costo de los clientes a sustituir es baja?',
    5: 'El precio de los productos de sustitución es menor que su producto o servicio?',
    6: 'La calidad de los productos de sustitución es mayor que la calidad de su producto o servicio?',
  };

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
