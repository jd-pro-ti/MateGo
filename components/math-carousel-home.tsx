'use client';

import {
  ArrowRight,
  BookMarked,
  CheckCircle2,
  Lightbulb,
  ListChecks,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, type WheelEvent } from 'react';

import { LessonArea, SiteFooter, SiteHeader } from '@/components/math-site';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { bookBlocks, type BookBlock, type Lesson } from '@/lib/book-data';
import { getLessonVisual } from '@/lib/lesson-visuals';

type Selection = {
  block: BookBlock;
  lesson: Lesson;
};

const learningTimeline = [
  {
    title: 'Números hasta 10 000',
    topics: ['Valor posicional', 'Comparar y ordenar', 'Estimación'],
  },
  {
    title: 'Sumar y restar con seguridad',
    topics: ['Cálculo mental', 'Llevadas', 'Comprobación'],
  },
  {
    title: 'Dominar las tablas y multiplicar',
    topics: ['Tablas del 2 al 10', 'Grupos iguales', 'Por 10 y 100'],
  },
  {
    title: 'Comprender la división',
    topics: ['Repartos', 'Cociente y residuo', 'Operación inversa'],
  },
  {
    title: 'Usar fracciones sencillas',
    topics: ['Representación', 'Equivalencias', 'Suma y resta'],
  },
];

export function MathCarouselHome() {
  const [selection, setSelection] = useState<Selection | null>(null);
  const selectedVisual = selection
    ? getLessonVisual(selection.lesson.number)
    : null;

  return (
    <div className="home-page">
      <SiteHeader
        onLessonSelect={(block, lesson) => setSelection({ block, lesson })}
      />

      <main>
        <section className="welcome-hero" aria-labelledby="welcome-title">
          <div className="welcome-copy">
            <span className="eyebrow">
              <Sparkles aria-hidden="true" /> Aprende a tu ritmo
            </span>
            <h1 id="welcome-title">
              ¡Bienvenido a tu guía de <em>Matemáticas!</em>
            </h1>
            <p>
              Recorre los temas de cada bloque sin salir de esta página. Elige
              una lección para consultar su explicación, ejemplo resuelto y
              procedimiento paso a paso.
            </p>
          </div>

          <div className="welcome-visual" aria-hidden="true">
            <span className="visual-number">3</span>
            <span className="visual-fraction">
              <b>1</b>
              <i />
              <b>2</b>
            </span>
            <span className="visual-times">×</span>
            <span className="visual-dots">
              {Array.from({ length: 9 }).map((_, index) => (
                <i key={index} />
              ))}
            </span>
          </div>
        </section>

        <section className="learning-timeline" aria-labelledby="timeline-title">
          <div className="timeline-heading">
            <span>Aprendizajes fundamentales</span>
            <h2 id="timeline-title">Lo imprescindible de tercero</h2>
            <span className="timeline-scroll-hint" aria-hidden="true">
              Desliza para avanzar →
            </span>
          </div>

          <ol className="timeline-list">
            {learningTimeline.map((milestone, index) => (
              <li
                className="timeline-item"
                data-block={(index % 5) + 1}
                key={milestone.title}
              >
                <span className="timeline-marker" aria-hidden="true">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <article className="timeline-card">
                  <span className="timeline-step">Etapa {index + 1}</span>
                  <h3>{milestone.title}</h3>
                  <ul
                    className="timeline-topics"
                    aria-label={`Temas de ${milestone.title}`}
                  >
                    {milestone.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section className="carousel-library" aria-labelledby="library-title">
          <div className="section-heading library-heading">
            <div>
              <span>Contenido del libro</span>
              <h2 id="library-title">Explora los temas por bloque</h2>
            </div>
          </div>

          <div className="block-carousel-list">
            {bookBlocks.map((block) => (
              <section
                className="block-carousel"
                id={`block-${block.id}`}
                key={block.id}
                data-block={block.id}
                aria-labelledby={`block-${block.id}-title`}
              >
                <div className="block-carousel-heading">
                  <span className="block-number">{block.numeral}</span>
                  <div>
                    <span className="block-kicker">Bloque {block.numeral}</span>
                    <h3 id={`block-${block.id}-title`}>{block.label}</h3>
                    <p>{block.description}</p>
                  </div>
                  <span className="lesson-count">
                    <BookMarked aria-hidden="true" /> {block.lessons.length}{' '}
                    lecciones
                  </span>
                </div>

                <LessonCarousel
                  block={block}
                  onSelect={(lesson) => setSelection({ block, lesson })}
                />
              </section>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />

      <Dialog
        open={selection !== null}
        onOpenChange={(open) => {
          if (!open) setSelection(null);
        }}
      >
        {selection ? (
          <DialogContent
            className="lesson-modal"
            data-block={selection.block.id}
          >
            <DialogHeader className="lesson-modal-header">
              <div className="modal-meta">
                <span>
                  Bloque {selection.block.numeral} · Lección{' '}
                  {selection.lesson.number}
                </span>
                <LessonArea lesson={selection.lesson} />
              </div>
              <DialogTitle>{selection.lesson.title}</DialogTitle>
              <DialogDescription>{selection.lesson.summary}</DialogDescription>
            </DialogHeader>

            {selectedVisual ? (
              <figure className="lesson-visual">
                <Image
                  src={selectedVisual.src}
                  alt={selectedVisual.alt}
                  width={1024}
                  height={768}
                  sizes="(max-width: 780px) calc(100vw - 54px), 380px"
                />
                <figcaption>
                  <strong>Observa:</strong> {selectedVisual.caption}
                </figcaption>
              </figure>
            ) : null}

            <div className="lesson-modal-body">
              <section className="modal-content-card explanation-card">
                <span className="modal-card-label">
                  <Lightbulb aria-hidden="true" /> Explicación
                </span>
                <p>{selection.lesson.explanation}</p>
              </section>

              <section className="modal-content-card example-card">
                <span className="modal-card-label">
                  <CheckCircle2 aria-hidden="true" /> Ejemplo resuelto
                </span>
                <p>{selection.lesson.example}</p>
              </section>

              <section className="modal-content-card procedure-card">
                <span className="modal-card-label">
                  <ListChecks aria-hidden="true" /> Procedimiento
                </span>
                <ol>
                  {selection.lesson.steps.map((step, index) => (
                    <li key={step}>
                      <span>{index + 1}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
}

function LessonCarousel({
  block,
  onSelect,
}: {
  block: BookBlock;
  onSelect: (lesson: Lesson) => void;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const lastWheelNavigation = useRef(0);

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    if (!api) return;

    const horizontalDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.shiftKey
          ? event.deltaY
          : 0;
    if (Math.abs(horizontalDelta) < 6) return;

    const canMove =
      horizontalDelta > 0 ? api.canScrollNext() : api.canScrollPrev();
    if (!canMove) return;

    event.preventDefault();

    const now = performance.now();
    if (now - lastWheelNavigation.current < 420) return;
    lastWheelNavigation.current = now;

    if (horizontalDelta > 0) api.scrollNext();
    else api.scrollPrev();
  };

  return (
    <div className="lesson-carousel">
      <Carousel
        className="topic-carousel"
        opts={{ align: 'start', dragFree: true, slidesToScroll: 1 }}
        setApi={setApi}
        onWheel={handleWheel}
        aria-label={`Temas del bloque ${block.numeral}`}
      >
        <CarouselContent>
          {block.lessons.map((lesson) => {
            const visual = getLessonVisual(lesson.number);

            return (
              <CarouselItem className="topic-slide" key={lesson.number}>
                <button
                  className="topic-card"
                  type="button"
                  onClick={() => onSelect(lesson)}
                  aria-label={`Abrir lección ${lesson.number}: ${lesson.title}`}
                >
                  <Image
                    className="topic-card-image"
                    src={visual.src}
                    alt=""
                    width={1024}
                    height={768}
                    sizes="(max-width: 560px) 75vw, (max-width: 1050px) 34vw, 280px"
                  />
                  <span className="topic-card-content">
                    <span className="topic-card-number">
                      {lesson.number.toString().padStart(2, '0')}
                    </span>
                    <LessonArea lesson={lesson} />
                    <span className="topic-card-title">{lesson.title}</span>
                    <span className="topic-card-summary">{lesson.summary}</span>
                    <span className="topic-card-action">
                      Ver lección <ArrowRight aria-hidden="true" />
                    </span>
                  </span>
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
