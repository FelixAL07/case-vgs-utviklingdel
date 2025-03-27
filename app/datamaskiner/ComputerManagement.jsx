'use client'

import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

export default function Home() {
    const [computers, setComputers] = useState([]);
    const [type, setType] = useState('bærbar');
    const [location, setLocation] = useState('Bygning A1: Bibliotek');
    const [year, setYear] = useState('');
    const [threshold, setThreshold] = useState('');
    const [state, setState] = useState('I bruk');
    const [ownerRole, setOwnerRole] = useState('Lærer');
    const [ownerName, setOwnerName] = useState('John Doe');
    const [filterState, setFilterState] = useState('Alle');

    useEffect(() => {
        fetchComputers();
    }, []);

    async function fetchComputers() {
        const querySnapshot = await getDocs(collection(db, 'computers'));
        setComputers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }

    async function addComputer() {
        await addDoc(collection(db, 'computers'), { type, location, year: parseInt(year), state, ownerRole, ownerName});
        fetchComputers();
        setYear('');
    }

    async function removeComputer(id) {
        await deleteDoc(doc(db, 'computers', id));
        fetchComputers();
    }

    async function updateComputer(id) {
        await updateDoc(doc(db, 'computers', id), { state });
        fetchComputers();
    }

    function findOldComputers() {
        const currentYear = new Date().getFullYear();
        const filtered = computers.filter(computer => currentYear - computer.year >= parseInt(threshold));

        // If "Alle" is selected, return all computers that match the age criteria
        if (filterState === 'Alle') {
            return filtered;
        }

        // Otherwise, filter by both age and state
        return filtered.filter(computer => computer.state === filterState);
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Skolens Datamaskiner</h1>

            {/* Add Computer Form */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Legg til ny datamaskin</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            onChange={e => setType(e.target.value)}
                            value={type}
                        >
                            <option value="bærbar">Bærbar</option>
                            <option value="stasjonær">Stasjonær</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Plassering</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            onChange={e => setLocation(e.target.value)}
                            value={location}
                        >
                            <option value="Ekstern/Hjemmekontor">Ekstern/Hjemmekontor</option>
                            <option value="Bygning A1: Bibliotek">Bygning A1: Bibliotek</option>
                            <option value="Bygning A1: Ekspedisjon">Bygning A1: Ekspedisjon</option>
                            <option value="Bygning A1: Ledelse">Bygning A1: Ledelse</option>
                            <option value="Bygning A1: Personalrom">Bygning A1: Personalrom</option>
                            <option value="Bygning A1: Lærernes arbeidsrom">Bygning A1: Lærernes arbeidsrom</option>
                            <option value="Bygning A2: Klasserom (1. etasje)">Bygning A2: Klasserom (1. etasje)</option>
                            <option value="Bygning A2: Klasserom (2. etasje)">Bygning A2: Klasserom (2. etasje)</option>
                            <option value="Bygning A2: Datarom 2">Bygning A2: Datarom 2</option>
                            <option value="Bygning B: Klasserom (1. etasje)">Bygning B: Klasserom (1. etasje)</option>
                            <option value="Bygning B: Klasserom (2. etasje)">Bygning B: Klasserom (2. etasje)</option>
                            <option value="Bygning B: Datarom 3">Bygning B: Datarom 3</option>
                            <option value="Bygning B: Klasserom (3. etasje)">Bygning B: Klasserom (3. etasje)</option>
                            <option value="Bygning C: Klasserom (1. etasje)">Bygning C: Klasserom (1. etasje)</option>
                            <option value="Bygning C: Datarom 1">Bygning C: Datarom 1</option>
                            <option value="Bygning C: Klasserom (2. etasje)">Bygning C: Klasserom (2. etasje)</option>
                            <option value="Bygning C: Datarom 4">Bygning C: Datarom 4</option>
                        </select>
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lærer/Student</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            onChange={e => setOwnerRole(e.target.value)}
                            value={ownerRole}
                        >
                            <option value="lærer">Lærer</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Navn på eier</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            onChange={e => setOwnerName(e.target.value)}
                            value={ownerName}
                        />
                    </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Produksjonsår</label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                onChange={e => setYear(e.target.value)}
                                value={year}
                            />
                        </div>

                        <div className="flex items-end space-x-2">
                            <button
                                onClick={addComputer}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                            >
                                Legg til
                            </button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Existing Computers */}
                    <div className="bg-white shadow-md rounded-lg p-6 mb-8 min-h-full">
                        <h2 className="text-xl font-semibold mb-4">Eksisterende datamaskiner</h2>
                        {computers.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {computers.map(computer => (
                                    <li key={computer.id} className="py-3 flex justify-between items-center">
                                        <div>
                                            <span className="font-medium">{computer.type}</span>
                                            <span className="text-gray-500"> • {computer.location}</span>
                                            <span className="text-gray-500"> • {computer.year}</span>
                                            <br />
                                            <span className="text-gray-500">{computer.ownerName}: {computer.ownerRole}</span>
                                        </div>
                                        <select name="status"
                                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            onChange={e => {
                                                setState(e.target.value);
                                                updateComputer(computer.id);
                                            }}
                                            value={computer.state}
                                        >
                                            <option value="I bruk">I bruk</option>
                                            <option value="Kassert">Kassert</option>
                                        </select>
                                        <button
                                            onClick={() => removeComputer(computer.id)}
                                            className="text-red-600 hover:text-red-900 hover:bg-red-500 font-medium py-2 px-4 rounded-md transition-colors"
                                        >
                                            Slett
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">Ingen datamaskiner registrert.</p>
                        )}
                    </div>

                    {/* Old Computers */}
                    <div className="bg-white shadow-md rounded-lg p-6 min-h-full">
    <h2 className="text-xl font-semibold mb-4">Gamle datamaskiner</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Søk på alder (år)</label>
            <input
                type="number"
                placeholder="Alder"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                onChange={e => setThreshold(e.target.value)}
                value={threshold}
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrer på status</label>
            <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                onChange={e => setFilterState(e.target.value)}
                value={filterState}
            >
                <option value="Alle">Alle</option>
                <option value="I bruk">I bruk</option>
                <option value="Kassert">Kassert</option>
            </select>
        </div>
    </div>

                        {threshold && (
                            <div>
                                <h3 className="font-medium mb-2">Datamaskiner eldre enn {threshold} år:</h3>
                                {findOldComputers().length > 0 ? (
                                    <ul className="divide-y divide-gray-200">
                                        {findOldComputers().map(computer => (
                                            <li key={computer.id} className="py-2">
                                                <span className="font-medium">{computer.type}</span>
                                                <span className="text-gray-500"> • {computer.location}</span>
                                                <span className="text-gray-500"> • {computer.year}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 italic">Ingen datamaskiner funnet.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            );
}