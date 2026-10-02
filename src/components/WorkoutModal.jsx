import { useState } from 'react'
import { db } from '../db/db'

const emptyRow = () => ({ name: '', reps: '' })

export default function WorkoutModal({ onClose }) {
    const [name, setName] = useState('')
    const [rows, setRows] = useState([emptyRow()])
    const [error, setError] = useState('')

    const updateRow = (i, field, value) =>
        setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [field]: value } : r)))

    const addRow = () => setRows((prev) => [...prev, emptyRow()])

    const removeRow = (i) =>
        setRows((prev) => (prev.length === 1 ? prev : prev.filter((_, idx) => idx !== i)))

    const confirm = async () => {
        const exercises = rows
            .map((r) => ({ name: r.name.trim(), reps: r.reps.trim() }))
            .filter((r) => r.name)

        if (!name.trim()) return setError('Inserisci il nome della scheda')
        if (exercises.length === 0) return setError('Aggiungi almeno un esercizio')

        await db.workouts.add({ name: name.trim(), exercises, createdAt: Date.now() })
        onClose()
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-head">
                    <h2>Nuova scheda</h2>
                    <button className="icon-btn" onClick={onClose} aria-label="Chiudi">✕</button>
                </div>

                <div className="modal-body">
                    <label className="field-label">Nome scheda</label>
                    <input
                        className="input"
                        placeholder="es. Push, Gambe..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label className="field-label">Esercizi</label>
                    {rows.map((r, i) => (
                        <div key={i} className="exercise-row">
                            <input
                                className="input"
                                placeholder="Esercizio"
                                value={r.name}
                                onChange={(e) => updateRow(i, 'name', e.target.value)}
                            />
                            <input
                                className="input reps-input"
                                placeholder="4x10"
                                value={r.reps}
                                onChange={(e) => updateRow(i, 'reps', e.target.value)}
                            />
                            <button className="icon-btn" onClick={() => removeRow(i)} aria-label="Rimuovi riga">
                                ✕
                            </button>
                        </div>
                    ))}

                    <button className="ghost-btn" onClick={addRow}>+ Aggiungi esercizio</button>
                    {error && <p className="error">{error}</p>}
                </div>

                <button className="confirm-btn" onClick={confirm}>Conferma</button>
            </div>
        </div>
    )
}