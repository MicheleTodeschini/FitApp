import Dexie from 'dexie'

export const db = new Dexie('gymtracker')

db.version(1).stores({
    workouts: '++id, name, createdAt'
})

db.version(2).stores({
    sessions: `++id, workoutId, startedAt, endedAt`,
    setLogs: `++id, sessionId, workoutId, exerciseName, setNumber, reps, weight, note, date, [workoutId+exerciseName]`
})