import { useEffect, useState } from "react";
import {
    FilePenLine,
    Loader2,
    Trash2,
    ImageOff,
    Plus,
    Pencil,
    Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteNote, getAllNotes } from "@/api/notes/notes";
import NoteDialog from "./components/createNotes";

type Note = {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt?: string;
};

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const res = await getAllNotes();

            if (res.success) setNotes(res.notes);
            else setError(res.message);
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleDelete = async (id: string) => {
        const res = await deleteNote(id);
        if (res.success) setNotes(prev => prev.filter(n => n.id !== id));
        else alert(res.message);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 py-16">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-12 px-6">

                {/* LEFT: TITLE + SUBTITLE */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full">

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 relative">
                        Your Notes
                        <span className="absolute left-0 -bottom-2 h-1.5 w-24 bg-blue-600 rounded-full"></span>
                    </h1>

                    {/* Subtitle */}
                    {/* <p className="text-blue-600 text-base md:text-lg font-medium flex items-center gap-2">
                        <span className="hidden md:inline-flex">
                            🗒️
                        </span>
                        Organize, create, and manage your thoughts effortlessly
                    </p> */}

                </div>

                {/* RIGHT: CREATE BUTTON */}
                <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-3 px-6 py-3 rounded-2xl shadow-md hover:shadow-xl transition-all font-semibold"
                    onClick={() => {
                        setSelectedNote(null);
                        setModalOpen(true);
                    }}
                >
                    <Plus className="h-5 w-5 text-white" />
                    <h1 className="text-white" >Create Note</h1>
                </Button>

            </div>

            {/* STATES */}
            <div className="max-w-7xl mx-auto">

                {loading && (
                    <div className="flex items-center justify-center py-20 text-gray-500 text-lg gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" /> Loading notes...
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-500 py-10 text-lg">
                        {error}
                    </div>
                )}

                {!loading && notes.length === 0 && (
                    <div className="text-center py-20 text-gray-500 text-lg flex flex-col items-center gap-2">
                        <ImageOff className="h-8 w-8" />
                        No notes found 🚀
                    </div>
                )}

                {/* GRID */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {notes.map(note => (
                        <div
                            key={note.id}
                            className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col"
                        >

                            {/* IMAGE */}
                            <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                                {note.imageUrl ? (
                                    <img
                                        src={note.imageUrl}
                                        alt={note.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-gray-400">
                                        <ImageOff className="h-6 w-6 mb-1" />
                                        <span className="text-xs">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* CONTENT */}
                            <div className="p-6 flex flex-col flex-1">

                                <h2 className="font-semibold text-lg flex items-center gap-2 mb-2">
                                    <FilePenLine className="h-5 w-5 text-blue-600" />
                                    {note.title}
                                </h2>

                                <p className="text-gray-600 text-sm line-clamp-4 flex-1">
                                    {note.content}
                                </p>

                                <div className="mt-4 flex justify-between items-center text-gray-400 text-xs">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {note.createdAt &&
                                            new Date(note.createdAt).toLocaleDateString()
                                        }
                                    </span>

                                    <div className="flex gap-2">
                                        {/* EDIT */}
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="text-blue-600 border-blue-200 hover:bg-blue-50 flex items-center gap-1"
                                            onClick={() => {
                                                setSelectedNote(note);
                                                setModalOpen(true);
                                            }}
                                        >
                                            <Pencil className="h-3 w-3" /> Edit
                                        </Button>

                                        {/* DELETE */}
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            className="flex items-center gap-1"
                                            onClick={() => handleDelete(note.id)}
                                        >
                                            <Trash2 className="h-3 w-3" /> Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL */}
            <NoteDialog
                open={modalOpen}
                onOpenChange={setModalOpen}
                note={selectedNote}
                onSuccess={fetchNotes}
            />
        </div>
    );
}