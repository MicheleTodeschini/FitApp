# Workout flow – ToDo

Flow: Workout → (Start) → ActiveWorkout → ExercisePage ⇄ TimerPage → ActiveWorkout

---

## 0. Database & routing (do this first)

- [X] Update the workout creation modal: each exercise needs `name`, `sets`, `reps`, `rest` (seconds)
- [X] Save exercises in the workout as `{ name, sets, reps, rest }`
- [X] Dexie `version(2)` (keep version 1 untouched) with new tables:
  - `sessions`: `++id, workoutId, startedAt, endedAt`
  - `setLogs`: `++id, sessionId, workoutId, exerciseName, setNumber, reps, weight, note, date`
  - compound index `[workoutId+exerciseName]` to get "last time" data
- [X] Add routes:
  - `/workout/:id/active`
  - `/workout/:id/exercise/:exIndex`
  - `/workout/:id/rest/:exIndex`
- [X] Hide the TabBar on these three pages

---

## 1. Workout page (existing)

- [X] Add a "Start" button to each workout card
- [X] On press: create a row in `sessions` with `startedAt = Date.now()`
- [ ] Save the `sessionId` (route state or localStorage) and navigate to `/workout/:id/active`
- [ ] If an unfinished session exists (`endedAt` missing), offer "Resume"

---

## 2. ActiveWorkout page (page 2 in the mockup)

- [ ] Create the page and read the workout from the DB
- [ ] List all exercises as cards: name, sets, reps, rest time
- [ ] Count the sets already logged in this session for each exercise (`useLiveQuery` on `setLogs`)
- [ ] Mark an exercise as completed (green) when `logged sets === sets`
- [ ] Tap on an exercise → navigate to its ExercisePage
- [ ] "Finish workout" button: set `endedAt`, compute total time and show it **only now**
- [ ] The total timer runs at the top page from `startedAt` 

---

## 3. ExercisePage (page 1 in the mockup)

- [ ] Header: close (X), number of sets, timer
- [ ] Progress bar: one segment per set, green when that set is logged
- [ ] Exercise name
- [ ] "Last time" table: query the latest session where this exercise was logged (set number, reps, kg)
- [ ] "Today" table: sets already logged in this session + the current/next ones empty ("-")
- [ ] Reps and weight editable directly in the "Today" table
- [ ] Exercise notes field
- [ ] "Start set" button → turns into "Done" while the set is in progress
- [ ] On "Done": save the set in `setLogs` (reps, weight, note, setNumber)
- [ ] If it was not the last set → navigate to TimerPage
- [ ] If it was the last set → go back to ActiveWorkout (progress bar now fully green)
- [ ] "Skip exercise" button → back to ActiveWorkout without logging

---

## 4. TimerPage (page 3 in the mockup)

- [ ] Header: close (X) and exercise name
- [ ] Countdown preset with the exercise's `rest` value (mm:ss)
- [ ] Timer based on timestamps (`Date.now()`), not on counting seconds, so it stays correct with the screen locked
- [ ] Reps / weight box, editable here too (updates the log of the set just done)
- [ ] Notes box (RIR, feelings...) saved on the set
- [ ] "Continue" button: disabled until the timer reaches 0, then enabled → back to ExercisePage for the next set
- [ ] "Skip rest" button: go to the next set immediately
- [ ] Vibration / sound at the end of the timer (`navigator.vibrate`, not supported on iOS)
- [ ] Keep the screen on with `navigator.wakeLock` while the timer page is open

---

## 5. Final checks

- [ ] Progress must survive a page reload (everything derived from the DB, not from component state)
- [ ] Series-rest-series-rest-series: rest pages = sets − 1
- [ ] Test the whole flow with 3 sets, with an exercise skipped, and with a reload in the middle
- [ ] Test the installed PWA on the phone (HTTPS link)