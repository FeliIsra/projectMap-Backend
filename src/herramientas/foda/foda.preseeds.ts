import { Preesed } from './Preesed';
import { Area } from './enums';

export class Preseeds {
  static getPreseeds = [
    new Preesed(
      Area.FORTALEZA,
      'Producto de alta calidad',
      'Si la alta calidad de su producto representa el valor agregado diferenciativo del mismo, busque mantenerlo para no perder competitividad. De no serlo, no le de prioridad absoluta sobre los costos.',
    ),
    new Preesed(
      Area.FORTALEZA,
      'Producto barato de producir',
      'Un producto barato de producir es un producto con posibilidades de producción en escala. Busque aprovechar nuevos mercados/regiones.',
    ),
    new Preesed(
      Area.FORTALEZA,
      'Gran cantidad de clientes',
      'Una base de clientes sana es clave a la hora de mantener su actividad económica en curso. Mantener esta base debe ser prioridad, considere utilizar estrategias de retención preventivas.',
    ),
    new Preesed(
      Area.FORTALEZA,
      'Demografía objetivo con buenos medios económicos',
      'Si su demografía posee los medios, busque generar un producto de alta calidad que los mismos, o nuevos clientes, puedan percibir como de lujo.',
    ),
    new Preesed(
      Area.FORTALEZA,
      'Producto de uso primario',
      'Un producto de uso primario es un producto necesario. Busque cubrir la mayor cantidad de necesidad con su producto, pero esté al tanto de posibles productos sustitutos.',
    ),
    new Preesed(
      Area.FORTALEZA,
      'Producto reconocido por la demografía cliente',
      'Si su producto es reconocido por su base de posibles clientes, usted está un paso por delante de la competencia. Busque mantener este status mediante marketing targeteado u manteniendo el valor agregado de su producto.',
    ),
    new Preesed(
      Area.FORTALEZA,
      'Gran calidad de soporte al cliente',
      'Dependiendo de la naturaleza de su producto, mantener una buena calidad de soporte al cliente puede ser esencial. Si su producto es un servicio o es de calidad baja u manufactura precaria, dele más importancia a mantener esta calidad.',
    ),
    new Preesed(
      Area.OPORTUNIDAD,
      'Posible línea de producto de lujo',
      'Diferenciar su producto utilizando mejores materias primas o modos de manufactura superiores puede resultar en un producto diferenciado para acceder a nuevas demografías, en general con más poder económico.',
    ),
    new Preesed(
      Area.OPORTUNIDAD,
      'Utilizar marketing específico a demografías clientes',
      'Es importante mantener la base de clientes actual e intentar apelar a nuevas demografías mediante marketing targeteado. Importante de realizar en respuesta a campañas de marketing de competidores.',
    ),
    new Preesed(
      Area.OPORTUNIDAD,
      'Posibilidad de creación de productos alternativos para atacar demografias similares ',
      'Cambios mínimos en su producto pueden representar la apertura de nuevos mercados no representados actualmente. Esto puede ser desde cómo se presenta el producto (colores, forma), a cambios funcionales leves para apelar a nuevos clientes.',
    ),
    new Preesed(
      Area.DEBILIDAD,
      'Percepción de producto de baja calidad',
      'Un producto con percepción negativa puede representar un gran problema a la hora de compararse con competidores. Si el problema es simplemente la percepción, busque generar campañas publicitarias remarcando los positivos de su producto. Si la calidad de su producto es realmente baja busque o remediarlo, o producir su producto en escala o bajar los precios para poder competir.',
    ),
    new Preesed(
      Area.DEBILIDAD,
      'Falta de capital para publicidad tradicional',
      'La publicidad es muy importante a la hora de mantener y adquirir nuevos clientes. Si su producto es de excelente calidad, puede tener buenos resultados del “boca a boca”, pero aun así las campañas publicitarias son de vital importancia. De no tener capital para las mismas, intente recurrir a medios digitales, con los que con menos inversión puede aumentar su alcance considerablemente. Si su base no se encuentra activa en estos medios, quizá requiera adquirir un préstamo o crédito.',
    ),
    new Preesed(
      Area.DEBILIDAD,
      'Poca variedad de productos',
      'No necesariamente una debilidad, pero riesgoso. No ponga todos sus huevos en la misma canasta, un producto sustituto puede arruinar sus ingresos completamente, en muy poco tiempo. Busque diversificar, quizá dentro del mismo rubro, buscando valores agregados en nuevas demografías.',
    ),
    new Preesed(
      Area.DEBILIDAD,
      'Poca cantidad de clientes',
      'Si su base es pequeña, debe hacer todo lo que pueda para ampliarla o para afianzarla. No puede darse el lujo de perder clientela, por lo que su producto o servicio debe ser de calidad o irremplazable. Busque utilizar campañas de marketing si el problema que se tiene es la visibilidad.',
    ),
    new Preesed(
      Area.DEBILIDAD,
      'Producto caro',
      'Dependiendo de su producto, busque o sacrifique calidad por costo, o generar la percepción de un producto de lujo. Vale aclarar que para que esta última estrategia funcione, el producto debe ser considerablemente mejor a sus alternativas.',
    ),
    new Preesed(
      Area.DEBILIDAD,
      'Producto de uso secundario',
      'Su producto es de uso secundario, por lo que en momentos de crisis sus ventas se verán gravemente afectadas. Planee acorde, intente establecerse como un producto de necesidad.',
    ),
    new Preesed(
      Area.DEBILIDAD,
      'Mal soporte al cliente',
      'Extremadamente problemático si su producto es de mala calidad u es un servicio. Necesita invertir o en su producto o en su suporte, ambas no pueden coexistir (a menos que su producto no sea reemplazable.',
    ),
    new Preesed(
      Area.AMENAZA,
      'Mal soporte al cliente',
      'Si su producto es de baja calidad, no es necesario que aparezcan productos competidores para perder ventas. Busque mejorar la calidad de su producto o la percepción del mismo. Las mejoras no necesariamente deben ser drásticas, pero será importante escuchar el feedback de sus clientes.',
    ),
    new Preesed(
      Area.AMENAZA,
      'Pérdidas de clientes por productos caros',
      'Si su producto es caro, o de lujo, es propenso a ante crisis o inseguridad económica ser reemplazado por productos inferiores. Esto es parte de la naturaleza de tener estos productos, por lo que la posibilidad de tener una línea inferior es una buena consideración. Aprovechar el nombre de su marca principal será esencial.',
    ),
    new Preesed(
      Area.AMENAZA,
      'Aparición de imitaciones baratas consumiendo mercado',
      'La economía de escala de sustitutos baratos son una amenaza constante. Tenga claro cuáles son sus ventajas y utilice el marketing a su favor. Deje en claro que estos productos no son sustitutos, sino productos inferiores a evitar a toda costa.',
    ),
    new Preesed(
      Area.AMENAZA,
      'Aparición de productos sustitutos superiores',
      'La posibilidad de aparición productos superiores debe ser algo que usted tenga en su mente constantemente. Busque oportunidades de mejora donde las haya, pero si un producto es claro y absolutamente superior no busque competir a toda costa. Quizá sea mejor entregar el mercado “de lujo” y apelar a consumidores de menos poderío económico.',
    ),
    new Preesed(
      Area.AMENAZA,
      'Problemas para conseguir materias primas',
      'Si el lugar en el que realiza su actividad económica es riesgoso a la hora de adquirir materias primas, considere generar un stock sano de las mismas para subsanar posibles desabastecimientos. No espere a estos momentos de crisis para buscar posibles formas alternativas de adquisición de estos componentes básicos.',
    ),
  ];
}
