'use client';

import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Calculator,
  Dices,
  Menu,
  Ruler,
  Search,
  Shapes,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState, type FocusEvent } from 'react';

import { bookBlocks, type BookBlock, type Lesson } from '@/lib/book-data';

export const areaIcons = {
  Números: Calculator,
  Geometría: Shapes,
  Medición: Ruler,
  Información: BarChart3,
  Azar: Dices,
};

const blockLinks = [1, 2, 3, 4, 5];

const searchableLessons = bookBlocks.flatMap((block) =>
  block.lessons.map((lesson) => ({ block, lesson })),
);

const normalizeSearchText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('es');

export function SiteHeader({
  backHref,
  onLessonSelect,
}: {
  backHref?: string;
  onLessonSelect?: (block: BookBlock, lesson: Lesson) => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isMobileMenuOpen]);

  return (
    <header className={`site-header${backHref ? '' : ' has-mobile-menu'}`}>
      <Link
        className="site-brand site-brand-desktop"
        href="/"
        aria-label="Ir a la página principal"
      >
        <Image
          className="brand-logo"
          src="/logo.png"
          alt=""
          width={520}
          height={464}
          priority
        />
        <span>
          <strong>Matego</strong>
          <small>Tercer grado</small>
        </span>
      </Link>

      {backHref ? (
        <Link className="header-back" href={backHref}>
          <ArrowLeft aria-hidden="true" /> Regresar
        </Link>
      ) : (
        <>
          <button
            className="mobile-nav-toggle"
            type="button"
            aria-label={
              isMobileMenuOpen
                ? 'Cerrar menú de navegación'
                : 'Abrir menú de navegación'
            }
            aria-controls="mobile-block-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            {isMobileMenuOpen ? (
              <X aria-hidden="true" />
            ) : (
              <Menu aria-hidden="true" />
            )}
          </button>

          <Link
            className="mobile-nav-brand"
            href="/"
            aria-label="Ir a la página principal"
          >
            <Image
              className="brand-logo"
              src="/logo.png"
              alt=""
              width={520}
              height={464}
              priority
            />
          </Link>

          <nav className="block-nav" aria-label="Navegación por bloques">
            {blockLinks.map((block) => (
              <Link
                className="block-nav-link"
                href={`#block-${block}`}
                data-block-link={block}
                key={block}
                aria-label={`Ir al bloque ${block}`}
              >
                Bloque {block}
              </Link>
            ))}
          </nav>
          {onLessonSelect ? (
            <LessonSearch onLessonSelect={onLessonSelect} />
          ) : null}

          <nav
            className="mobile-nav-panel"
            id="mobile-block-menu"
            aria-label="Menú móvil por bloques"
            hidden={!isMobileMenuOpen}
          >
            <div className="mobile-menu-heading">
              <strong>Matego</strong>
              <small>Tercer grado</small>
            </div>

            <div className="mobile-block-nav">
              {blockLinks.map((block) => (
                <Link
                  className="mobile-block-nav-link"
                  href={`#block-${block}`}
                  data-block-link={block}
                  key={block}
                  aria-label={`Ir al bloque ${block}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Bloque {block}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}

function LessonSearch({
  onLessonSelect,
}: {
  onLessonSelect: (block: BookBlock, lesson: Lesson) => void;
}) {
  const [query, setQuery] = useState('');
  const [hasFocus, setHasFocus] = useState(false);

  const results = useMemo(() => {
    const terms = normalizeSearchText(query)
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (terms.length === 0) return [];

    return searchableLessons
      .filter(({ block, lesson }) => {
        const searchableText = normalizeSearchText(
          `${lesson.number} ${lesson.title} ${lesson.area} ${lesson.summary} bloque ${block.id} ${block.numeral}`,
        );
        return terms.every((term) => searchableText.includes(term));
      })
      .slice(0, 6);
  }, [query]);

  const showResults = hasFocus && query.trim().length > 0;

  const selectLesson = (block: BookBlock, lesson: Lesson) => {
    onLessonSelect(block, lesson);
    setQuery('');
    setHasFocus(false);
  };

  const handleBlur = (event: FocusEvent<HTMLFormElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setHasFocus(false);
    }
  };

  return (
    <search className="lesson-search">
      <form
        aria-label="Buscar lecciones"
        onSubmit={(event) => {
          event.preventDefault();
          if (results[0]) selectLesson(results[0].block, results[0].lesson);
        }}
        onFocusCapture={() => setHasFocus(true)}
        onBlurCapture={handleBlur}
      >
        <label className="visually-hidden" htmlFor="lesson-search-input">
          Buscar una lección
        </label>
        <Search className="lesson-search-icon" aria-hidden="true" />
        <input
          className="lesson-search-input"
          id="lesson-search-input"
          type="search"
          role="combobox"
          autoComplete="off"
          placeholder="Buscar lecciones…"
          value={query}
          aria-expanded={showResults}
          aria-autocomplete="list"
          aria-controls={showResults ? 'lesson-search-results' : undefined}
          onChange={(event) => {
            setQuery(event.target.value);
            setHasFocus(true);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setQuery('');
              setHasFocus(false);
            }
          }}
        />

        {showResults ? (
          <ul className="lesson-search-results" id="lesson-search-results">
            {results.length > 0 ? (
              results.map(({ block, lesson }) => (
                <li key={lesson.number}>
                  <button
                    className="lesson-search-result"
                    type="button"
                    onClick={() => selectLesson(block, lesson)}
                  >
                    <span className="lesson-search-number">
                      {lesson.number.toString().padStart(2, '0')}
                    </span>
                    <span>
                      <strong>{lesson.title}</strong>
                      <small>
                        Bloque {block.numeral} · {lesson.area}
                      </small>
                    </span>
                  </button>
                </li>
              ))
            ) : (
              <li className="lesson-search-empty">No hay coincidencias.</li>
            )}
          </ul>
        ) : null}
      </form>
    </search>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <BookOpen aria-hidden="true" />
      <p>
        Adaptación didáctica basada en <cite>Matemáticas. Tercer grado</cite>,
        SEP, ciclo escolar 2013-2014. Material educativo de consulta.
      </p>
    </footer>
  );
}

export function LessonArea({ lesson }: { lesson: Lesson }) {
  const Icon = areaIcons[lesson.area];
  return (
    <span className="area-label">
      <Icon aria-hidden="true" /> {lesson.area}
    </span>
  );
}
