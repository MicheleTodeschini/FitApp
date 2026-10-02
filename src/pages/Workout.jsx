import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/db'
import WorkoutModal from '../components/WorkoutModal'
import TabBar from '../components/TabBar'


export default function Workout() {
    const [open, setOpen] = useState(false)
    const workouts = useLiveQuery(() => db.workouts.orderBy('createdAt').reverse().toArray(), [])

    const remove = (id) => {
        if (confirm('Eliminare questa scheda?')) db.workouts.delete(id)
    }

    return (
        <>

            <div className="page">
                <header className="top-header workout-header">
                    <h1>Workout</h1>
                    <button className="add-btn" onClick={() => setOpen(true)} aria-label="Aggiungi workout">
                        +
                    </button>
                </header>

                <main className="page-main">
                    {workouts && workouts.length === 0 && (
                        <div className="empty-box">Ancora nessun workout aggiunto</div>
                    )}
                    <section className="workout-card">

                        {workouts?.map((w) => (
                            <section key={w.id} >
                                <div className="workout-card-head">
                                    <h2>{w.name}</h2>
                                    <button className="icon-btn" onClick={() => remove(w.id)} aria-label="Elimina">
                                        ✕
                                    </button>
                                </div>
                                <ul>
                                    {w.exercises.map((ex, i) => (
                                        <li key={i}>
                                            <span>{ex.name}</span>
                                            <span className="reps">{ex.reps}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                        <div className='workout-card-bottom'>
                            <button className='btn btn-success'>Inizia</button>
                        </div>
                    </section>
                </main>

                {open && <WorkoutModal onClose={() => setOpen(false)} />}
            </div>
            <div>
                <TabBar />
            </div>
        </>
    )
}