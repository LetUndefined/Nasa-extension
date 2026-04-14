# NASA API Reference

## Setup
- Get your free API key: https://api.nasa.gov
- Use `DEMO_KEY` for testing (rate limited: 30 req/hour, 50 req/day)

---

## 1. APOD — Astronomy Picture of the Day

```
GET https://api.nasa.gov/planetary/apod?api_key=YOUR_KEY
```

**Response fields:**
```json
{
  "title": "string",
  "date": "YYYY-MM-DD",
  "explanation": "string",
  "url": "image or video URL",
  "hdurl": "high res image URL",
  "media_type": "image | video",
  "copyright": "string (if not public domain)"
}
```

**Params:**
| Param   | Type    | Description                        |
|---------|---------|------------------------------------|
| `date`  | string  | Specific date e.g. `2026-04-10`    |
| `count` | number  | Returns N random images            |
| `thumbs`| boolean | Returns video thumbnail if video   |

> Check `media_type` before rendering — sometimes it's a YouTube video, not an image.

---

## 2. Mars Rover Photos — Curiosity, Perseverance, Opportunity

```
GET https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=YOUR_KEY
```

**Rovers:** `curiosity` | `perseverance` | `opportunity`

**Response fields:**
```json
{
  "photos": [
    {
      "id": 123,
      "sol": 1000,
      "img_src": "image URL",
      "earth_date": "YYYY-MM-DD",
      "camera": {
        "name": "FHAZ",
        "full_name": "Front Hazard Avoidance Camera"
      },
      "rover": {
        "name": "Curiosity",
        "status": "active"
      }
    }
  ]
}
```

**Params:**
| Param       | Type   | Description                                  |
|-------------|--------|----------------------------------------------|
| `sol`       | number | Martian day (sol 0 = landing day)            |
| `earth_date`| string | Earth date instead of sol e.g. `2026-04-10` |
| `camera`    | string | Filter by camera (see below)                 |
| `page`      | number | Paginate results (25 per page)               |

**Cameras:**
- `FHAZ` — Front Hazard Avoidance
- `RHAZ` — Rear Hazard Avoidance
- `MAST` — Mast Camera (landscape shots)
- `NAVCAM` — Navigation Camera
- `CHEMCAM` — Chemistry Camera

---

## 3. Near Earth Objects — Asteroids passing Earth

```
GET https://api.nasa.gov/neo/rest/v1/feed?start_date=2026-04-10&end_date=2026-04-10&api_key=YOUR_KEY
```

**Response fields (per asteroid):**
```json
{
  "name": "string",
  "nasa_jpl_url": "link to more info",
  "is_potentially_hazardous_asteroid": true,
  "estimated_diameter": {
    "kilometers": {
      "estimated_diameter_min": 0.1,
      "estimated_diameter_max": 0.3
    }
  },
  "close_approach_data": [
    {
      "close_approach_date": "YYYY-MM-DD",
      "relative_velocity": {
        "kilometers_per_hour": "12345.67"
      },
      "miss_distance": {
        "kilometers": "500000.00",
        "lunar": "1.3"
      }
    }
  ]
}
```

> `miss_distance.lunar` = how many moon distances away it passed. Anything under 1 is inside the moon's orbit.

---

## 4. ISS Current Location

**No API key needed.**

```
GET http://api.open-notify.org/iss-now.json
```

**Response:**
```json
{
  "iss_position": {
    "latitude": "45.123",
    "longitude": "-93.456"
  },
  "timestamp": 1712345678
}
```

> Poll every 5 seconds to track it live. Plug lat/lng into a map (Leaflet or Google Maps).

---

## 5. ISS Crew — Who is in space right now

**No API key needed.**

```
GET http://api.open-notify.org/astros.json
```

**Response:**
```json
{
  "number": 7,
  "people": [
    { "name": "Oleg Kononenko", "craft": "ISS" },
    { "name": "Nikolai Chub", "craft": "ISS" }
  ]
}
```

---

## 6. ISS Telemetry — The Fun Stuff (urine tank, CO2, power, etc.)

These are real ISS system readings pulled from NASA's live telemetry.

```
GET https://isslive.com/feeds/PARAMETER_ID.json
```

**Fun parameters:**

| What it is                        | Parameter ID     |
|-----------------------------------|------------------|
| Urine Tank Level (%)              | `USLAB000058`    |
| Water Recovery System Tank (%)    | `USLAB000059`    |
| Cabin CO2 Level (mmHg)            | `USLAB000041`    |
| Cabin Pressure (psi)              | `USLAB000032`    |
| Cabin Temperature (°F)            | `USLAB000033`    |
| Total Solar Power Generated (kW)  | `USLAB000049`    |
| O2 Partial Pressure               | `USLAB000035`    |

**Response:**
```json
{
  "label": "Urine Tank Level",
  "unit": "%",
  "value": "72.4",
  "timestamp": "2026-04-10T14:23:00Z"
}
```

> Source: isslive.com aggregates NASA's public OSDR telemetry stream.
> Values update every ~5-10 seconds when ISS is in communication range.

---

## Quick Fetch Example

```js
const NASA_KEY = 'YOUR_KEY'

// APOD
const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`)
const data = await res.json()

// ISS Location
const iss = await fetch('http://api.open-notify.org/iss-now.json')
const issData = await iss.json()

// ISS Urine Tank (just for fun)
const urine = await fetch('https://isslive.com/feeds/USLAB000058.json')
const urineData = await urine.json()
```
