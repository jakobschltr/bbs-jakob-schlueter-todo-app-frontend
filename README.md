# Mach ich morgen — Todo-Listen Frontend

Web-Oberfläche für Todo-Sammlungen und Einträge. Das Frontend spricht mit einer separaten REST-API (Python/Flask).

**Backend-Repository:** [jakobschltr/bbs-jakob-schlueter-todo-app-backend](https://github.com/jakobschltr/bbs-jakob-schlueter-todo-app-backend)

Dort findest du die OpenAPI-Spezifikation (`todolistenverwaltung_openapi.yaml`), das Deployment auf dem Raspberry Pi und Hinweise zum Betrieb der API.

## Setup

Abhängigkeiten installieren:

```bash
npm install
```
## Development Server

Entwicklungsserver starten:

```bash
npm run dev
```

Die App läuft unter `http://localhost:3000`.

## Benutzung

### 1. Backend starten

Das Backend muss erreichbar sein, bevor du im Frontend arbeitest. Kurz prüfen:

```bash
curl http://localhost:5000/todo-list
```

Auf dem Raspberry Pi im Heimnetzwerk z. B.:

```bash
curl http://192.168.24.114:5000/todo-list
```

Ausführliche Anleitung zum Aufsetzen des Backends: [Backend-README](https://github.com/jakobschltr/bbs-jakob-schlueter-todo-app-backend#readme).

### 2. API-URL beim ersten Besuch

Beim ersten Öffnen der App wirst du zur **Setup-Seite** geleitet. Dort die **Basis-URL deiner API** eintragen — ohne abschließenden Schrägstrich:

| Szenario | Beispiel-URL |
| -------- | ------------ |
| Backend lokal auf dem gleichen Rechner | `http://localhost:5000` |
| Backend auf Raspberry Pi / Server im WLAN | `http://192.168.24.114:5000` |
| Backend nur lokal, Reverse-Proxy auf Port 80 | `http://192.168.24.114` |

Nach **Verbinden** prüft die App die Erreichbarkeit (`GET /todo-list`). Erst bei Erfolg wird die URL gespeichert.

### 3. API-URL später ändern

Unter **Einstellungen** (Zahnrad im Header) kannst du die URL jederzeit anpassen, die Verbindung testen und auf die Standard-URL zurücksetzen.

Die gewählte URL wird im Browser unter dem Schlüssel `todo-api-url` in `localStorage` gespeichert.

### 4. Frontend auf Vercel + Backend im Heimnetzwerk

Läuft das Frontend über **HTTPS** (z. B. Vercel) und das Backend unter einer **lokalen HTTP-Adresse**, blockiert der Browser die Anfrage standardmäßig (Mixed Content).

In **Chrome** (aktuell):

1. In Setup oder Einstellungen die LAN-IP des Pi eintragen (z. B. `http://192.168.24.114:5000`)
2. **Browser-Berechtigung anfordern** klicken
3. Im Dialog **Zulassen** wählen („Auf andere Apps und Dienste auf diesem Gerät zugreifen“)
4. Verbindung speichern

Alternativen:

- Frontend lokal mit `npm run dev` nutzen (alles über HTTP, kein Mixed Content)
- Backend per HTTPS bereitstellen (z. B. Reverse-Proxy)

> **Hinweis:** Pi und Gerät mit dem Browser müssen im **gleichen Netzwerk** sein. `localhost` in der API-URL bezieht sich immer auf den Rechner, auf dem der Browser läuft — nicht auf den Raspberry Pi.

### 5. App-Funktionen

- **Sammlung** (Sidebar / Hamburger-Menü auf dem Handy): Listen wechseln, neue Liste anlegen, Listen löschen
- **Startseite:** Übersicht aller Listen, schnell neue Liste erstellen
- **Listenseite:** Einträge anlegen, bearbeiten und löschen
- **Dark Mode:** Umschalter im Header

## Production

Build für Produktion:

```bash
npm run build
```

Lokalen Produktions-Build testen:

```bash
npm run preview
```

Deployment-Dokumentation: [Nuxt Deployment](https://nuxt.com/docs/getting-started/deployment)

## Credits

Icons by [Heroicons](https://heroicons.com) (MIT).
