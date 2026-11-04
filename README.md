# Quiz

Eine Quiz-App mit React und Vite. Die Fragen kommen aus der [Open Trivia DB](https://opentdb.com/) oder aus eigenen Themen (`public/questions.json`).

## Funktionen

- Kategorie, Schwierigkeit und Anzahl der Fragen (5–15) auswählen
- Eigene Themen: PHP, JavaScript und React
- 20 Sekunden Zeit pro Frage
- Punktesystem mit Serien-Bonus: Bei mehreren richtigen Antworten in Folge steigt der Multiplikator bis ×2
- Rangliste im `localStorage` mit Filter nach Mindestpunktzahl und Sortierung nach Punkten oder Datum
- Heller und dunkler Modus

## Starten

```bash
npm install
npm run dev
```

Weitere Befehle:

| Befehl            | Beschreibung                  |
| ----------------- | ----------------------------- |
| `npm run build`   | Produktions-Build erstellen   |
| `npm run preview` | Build lokal ansehen           |
| `npm run lint`    | Code mit ESLint prüfen        |
| `npm test`        | Unit-Tests mit Vitest         |
| `npm run format`  | Code mit Prettier formatieren |

## Eigene Fragen hinzufügen

Eigene Themen stehen in `public/questions.json`. Jede `id` muss mit `custom-` beginnen:

```json
{
    "id": "custom-beispiel",
    "name": "Beispiel",
    "questions": [
        {
            "question": "Frage?",
            "difficulty": "easy",
            "correctAnswer": "Richtig",
            "incorrectAnswers": ["Falsch 1", "Falsch 2", "Falsch 3"]
        }
    ]
}
```

Erlaubte Werte für `difficulty` sind `easy`, `medium` und `hard`.

## Projektstruktur

Der Code ist nach Features gegliedert. Reine Logik (Punkte, Quiz-Ablauf, Filter) liegt in eigenen Dateien ohne React und ist mit Unit-Tests abgedeckt.

```
src/
├── app/                  # Routing und Layout
├── api/                  # Endpunkte und fetchJson
├── components/           # Gemeinsame UI-Komponenten
├── hooks/                # useFetch, useCountdown, useDebouncedValue, useTheme
├── lib/                  # Hilfsfunktionen (shuffle)
└── features/
    ├── settings/         # Startseite mit Einstellungen
    ├── quiz/             # Fragen laden, Quiz-Ablauf (useReducer), Punkte
    ├── result/           # Ergebnis speichern
    └── leaderboard/      # Rangliste, localStorage, Filter und Sortierung
```
