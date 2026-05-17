import { useEffect, useState } from "react";
import { FilePenLine, Loader2, Trash2, ImageOff } from "lucide-react";
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

            if (res.success) {
                setNotes(res.notes);
            } else {
                setError(res.message);
            }

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

        if (res.success) {
            setNotes(prev => prev.filter(n => n.id !== id));
        } else {
            alert(res.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 py-10">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto flex items-center justify-between mb-10">
                <h1 className="text-3xl font-bold text-gray-900">
                    Your Notes
                </h1>

                {/* CREATE */}
                <Button
                    onClick={() => {
                        setSelectedNote(null);
                        setModalOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    + Create Note
                </Button>
            </div>

            {/* STATES */}
            <div className="max-w-7xl mx-auto">

                {loading && (
                    <div className="flex items-center justify-center py-20 text-gray-500">
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Loading notes...
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-500 py-10">
                        {error}
                    </div>
                )}

                {!loading && notes.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No notes found 🚀
                    </div>
                )}

                {/* GRID */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {notes.map(note => (
                        <div
                            key={note.id}
                            className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col"
                        >

                            {/* IMAGE */}
                            <div className="h-44 bg-gray-100">
                                {note.imageUrl ? (
                                    <img
                                        src={note.imageUrl}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                        <ImageOff className="h-6 w-6" />
                                        <span className="text-xs">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* CONTENT */}
                            <div className="p-5 flex flex-col flex-1">

                                <h2 className="font-semibold text-lg flex items-center gap-2">
                                    <FilePenLine className="h-4 w-4 text-blue-600" />
                                    {note.title}
                                </h2>

                                <p className="text-sm text-gray-600 mt-2 line-clamp-4 flex-1">
                                    {note.content}
                                </p>

                                {/* ACTIONS */}
                                <div className="mt-5 flex justify-between items-center">

                                    <span className="text-xs text-gray-400">
                                        {note.createdAt &&
                                            new Date(note.createdAt).toLocaleDateString()
                                        }
                                    </span>

                                    <div className="flex gap-2">

                                        {/* EDIT */}
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                            onClick={() => {
                                                setSelectedNote(note);
                                                setModalOpen(true);
                                            }}
                                        >
                                            Edit
                                        </Button>

                                        {/* DELETE */}
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(note.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
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