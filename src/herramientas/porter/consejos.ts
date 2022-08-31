import { Fuerza } from './fuerza';

export class Consejos {
  static rivalidadEntreCompetidores = {
    1: {
      consejo:
        'Mira satisfacer parte insatisfecha del mercado en el que está insertado',
      pregunta: 1,
    },
    2: {
      consejo:
        'Trate de aprender de sus competidores que hicieron que sean un éxito',
      pregunta: 1,
    },
    3: {
      consejo:
        'Analizar la posibilidad de abrir tiendas en los alrededores de crear un polo de su clase y disfrutar de una demanda de su competidor no sabe',
      pregunta: 2,
    },
    4: {
      consejo:
        'Trate de desarrollar reglas de buena conducta con sus competidores y si no es posible, trate de mantenerse a la vanguardia en relación con las ventajas competitivas',
      pregunta: 3,
    },
    5: {
      consejo:
        'Esté preparado para los precios y la comercialización de los conflictos',
      pregunta: 3,
    },
    6: {
      consejo:
        'Desarrollar un grupo con miembros de su empresa y los competidores de las medidas adoptadas por las agencias gubernamentales',
      pregunta: 5,
    },
    7: {
      consejo:
        'Tratar de establecer su posición en el primer lugar. Si el precio, por ejemplo, permanecer fiel a su estrategia y hacer cambios cuando sea necesario',
      pregunta: 5,
    },
    8: {
      consejo:
        'A pesar de que el artículo no sea totalmente importante para usted, siempre en la búsqueda de nuevos competidores',
      pregunta: 5,
    },
  };

  static poderDeNegociacionConElCliente = {
    1: {
      consejo:
        'Si siempre preocuparse de mantener el precio estándar, y cuando eso no es posible, explique los cambios',
      pregunta: 1,
    },
    2: {
      consejo:
        'Piense acerca de cómo mejorar las encuestas de satisfacción de servicio al cliente e implementar mejoras en la lealtad del cliente',
      pregunta: 4,
    },
    3: {
      consejo:
        'Invitar a los clientes a más conversaciones pr; oximas y los intentos de fidelidad',
      pregunta: 5,
    },
    4: {
      consejo:
        'Preocuparse de su proceso de producción y buscar siempre la reducción de costes para aumentar su margen de beneficio',
      pregunta: 1,
    },
    5: {
      consejo:
        'Pensar en formas de colaboración de producción que reducen los costos y proporcionar más asequible para los clientes',
      pregunta: 4,
    },
    6: {
      consejo:
        'Invitar a los clientes a más conversaciones pr; oximas y los intentos de fidelidad',
      pregunta: 5,
    },
    7: {
      consejo:
        'Invitar a los clientes a más conversaciones pr; oximas y los intentos de fidelidad',
      pregunta: 5,
    },
    8: {
      consejo:
        'Invitar a los clientes a más conversaciones pr; oximas y los intentos de fidelidad',
      pregunta: 5,
    },
  };

  static poderDeNegociacionConLosProveedores = {
    1: 'Mira satisfacer parte insatisfecha del mercado en el que está insertado',
    2: 'Trate de aprender de sus competidores que hicieron que sean un éxito',
    3: 'Trate de desarrollar reglas de buena conducta con sus competidores y si no es posible, trate de mantenerse a la vanguardia en relación con las ventajas competitivas',
    4: 'Esté preparado para los precios y la comercialización de los conflictos',
    5: 'Desarrollar un grupo con miembros de su empresa y los competidores de las medidas adoptadas por las agencias gubernamentales',
    6: 'Tratar de establecer su posición en el primer lugar. Si el precio, por ejemplo, permanecer fiel a su estrategia y hacer cambios cuando sea necesario',
    7: 'Analizar la posibilidad de abrir tiendas en los alrededores de crear un polo de su clase y disfrutar de una demanda de su competidor no sabe',
    8: 'A pesar de que el artículo no sea totalmente importante para usted, siempre en la búsqueda de nuevos competidores',
  };

  static amenazaDeNuevosCompetidores = {
    1: 'Mira satisfacer parte insatisfecha del mercado en el que está insertado',
    2: 'Trate de aprender de sus competidores que hicieron que sean un éxito',
    3: 'Trate de desarrollar reglas de buena conducta con sus competidores y si no es posible, trate de mantenerse a la vanguardia en relación con las ventajas competitivas',
    4: 'Esté preparado para los precios y la comercialización de los conflictos',
    5: 'Desarrollar un grupo con miembros de su empresa y los competidores de las medidas adoptadas por las agencias gubernamentales',
    6: 'Tratar de establecer su posición en el primer lugar. Si el precio, por ejemplo, permanecer fiel a su estrategia y hacer cambios cuando sea necesario',
    7: 'Analizar la posibilidad de abrir tiendas en los alrededores de crear un polo de su clase y disfrutar de una demanda de su competidor no sabe',
    8: 'A pesar de que el artículo no sea totalmente importante para usted, siempre en la búsqueda de nuevos competidores',
  };

  static amenazaDeProductosSubstitutos = {}; //TODO

  static getConsejos(fuerza: Fuerza) {
    switch (fuerza) {
      case Fuerza.RIVALIDAD_ENTRE_COMPETIDORES:
        return this.rivalidadEntreCompetidores;
      case Fuerza.AMENAZA_DE_NUEVOS_COMPETIDORES:
        return this.amenazaDeNuevosCompetidores;
      case Fuerza.AMENAZA_DE_PRODUCTOS_SUBSTITUTOS:
        return this.amenazaDeProductosSubstitutos;
      case Fuerza.PODER_DE_NEGOCIACION_CON_LOS_PROVEEDORES:
        return this.poderDeNegociacionConLosProveedores;
      case Fuerza.PODER_DE_NEGOCIACION_CON_LOS_CLIENTES:
        return this.poderDeNegociacionConElCliente;
    }
  }
}
