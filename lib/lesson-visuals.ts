export type LessonVisual = {
  src: string;
  alt: string;
  caption: string;
};

const visuals = {
  placeValue: {
    src: '/lesson-images/place-value-v2.png',
    alt: 'Material base diez organizado en unidades, decenas, centenas y millares.',
    caption:
      'Observar cómo se agrupan y relacionan los números facilita su comparación y descomposición.',
  },
  additionSubtraction: {
    src: '/lesson-images/addition-subtraction.png',
    alt: 'Grupos de objetos que representan una suma y una resta.',
    caption:
      'Los objetos permiten visualizar las cantidades que se juntan, se comparan o se quitan.',
  },
  multiplicationDivision: {
    src: '/lesson-images/multiplication-division.png',
    alt: 'Arreglos rectangulares y grupos iguales para representar multiplicación y división.',
    caption:
      'Los arreglos y repartos muestran la relación entre multiplicar, agrupar y dividir.',
  },
  fractions: {
    src: '/lesson-images/fractions.png',
    alt: 'Círculos y barras divididos en mitades, cuartos y octavos.',
    caption:
      'Cada figura muestra cómo un entero puede dividirse en partes iguales.',
  },
  geometry: {
    src: '/lesson-images/geometry.png',
    alt: 'Cubo, prisma, cilindro y una figura con eje de simetría.',
    caption:
      'Las formas permiten reconocer caras, aristas, vértices y relaciones de simetría.',
  },
  measurement: {
    src: '/lesson-images/measurement.png',
    alt: 'Regla, balanza y recipientes para medir longitud, peso y capacidad.',
    caption:
      'Elegir el instrumento adecuado ayuda a comparar y expresar distintas medidas.',
  },
  time: {
    src: '/lesson-images/time-calendar.png',
    alt: 'Reloj analógico y calendario representando el paso del tiempo.',
    caption:
      'El reloj y el calendario ayudan a ordenar actividades, horas, días y periodos.',
  },
  spatial: {
    src: '/lesson-images/spatial-map.png',
    alt: 'Croquis sobre una cuadrícula con una ruta y referencias de orientación.',
    caption:
      'Una ruta en cuadrícula permite practicar ubicación, dirección, giros y referencias espaciales.',
  },
  data: {
    src: '/lesson-images/data-charts.png',
    alt: 'Pictograma, tabla sencilla y gráfica de barras para organizar datos.',
    caption:
      'Organizar los datos visualmente permite compararlos y obtener conclusiones con mayor facilidad.',
  },
  chance: {
    src: '/lesson-images/chance.png',
    alt: 'Dados, fichas y una ruleta usados en una experiencia de azar.',
    caption:
      'Repetir y registrar resultados ayuda a observar qué resultados son posibles y con qué frecuencia aparecen.',
  },
} satisfies Record<string, LessonVisual>;

const categoriesByLesson: Record<number, keyof typeof visuals> = {
  1: 'placeValue',
  2: 'additionSubtraction',
  3: 'placeValue',
  4: 'additionSubtraction',
  5: 'multiplicationDivision',
  6: 'geometry',
  7: 'geometry',
  8: 'geometry',
  9: 'data',
  10: 'time',
  11: 'time',
  12: 'data',
  13: 'data',
  14: 'placeValue',
  15: 'placeValue',
  16: 'multiplicationDivision',
  17: 'multiplicationDivision',
  18: 'placeValue',
  19: 'geometry',
  20: 'spatial',
  21: 'spatial',
  22: 'measurement',
  23: 'measurement',
  24: 'data',
  25: 'data',
  26: 'fractions',
  27: 'additionSubtraction',
  28: 'placeValue',
  29: 'multiplicationDivision',
  30: 'multiplicationDivision',
  31: 'geometry',
  32: 'geometry',
  33: 'measurement',
  34: 'data',
  35: 'fractions',
  36: 'additionSubtraction',
  37: 'multiplicationDivision',
  38: 'multiplicationDivision',
  39: 'geometry',
  40: 'spatial',
  41: 'measurement',
  42: 'multiplicationDivision',
  43: 'fractions',
  44: 'fractions',
  45: 'placeValue',
  46: 'fractions',
  47: 'multiplicationDivision',
  48: 'multiplicationDivision',
  49: 'spatial',
  50: 'measurement',
  51: 'data',
  52: 'chance',
};

export function getLessonVisual(lessonNumber: number): LessonVisual {
  return visuals[categoriesByLesson[lessonNumber] ?? 'placeValue'];
}
