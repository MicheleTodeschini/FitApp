import Dexie from 'dexie'

export const db = new Dexie('gymtracker')

db.version(1).stores({
    workouts: '++id, name, createdAt'
})