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

| Befehl            | Beschreibung                    |
| ----------------- | ------------------------------- |
| `npm run build`   | Produktions-Build erstellen     |
| `npm run preview` | Build lokal ansehen             |
| `npm run lint`    | Code mit ESLint prüfen          |

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

```
src/
├── App.jsx           # Routing
├── Home.jsx          # Einstellungen
├── Quiz.jsx          # Quiz-Ablauf und Punkte
├── Result.jsx        # Ergebnis speichern
├── Leaderboard.jsx   # Rangliste
├── results.js        # Filtern und Sortieren
├── constants.js      # Konfiguration
├── components/       # UI-Komponenten
└── hooks/            # useFetch, useStorage
```
