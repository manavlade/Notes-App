import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import createNote, { updateNote } from "@/api/notes/notes";
import { FilePlus, Pen, Image, Loader2 } from "lucide-react";

type Note = {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
};

export default function NoteDialog({
    open,
    onOpenChange,
    note,
    onSuccess
}: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    note: Note | null;
    onSuccess: () => void;
}) {

    const isEdit = !!note;
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        content: "",
        image: null as File | null
    });

    useEffect(() => {
        setForm({
            title: note?.title || "",
            content: note?.content || "",
            image: null
        });
    }, [note, open]);

    const handleSubmit = async () => {
        setLoading(true);

        let res;
        if (isEdit && note) {
            res = await updateNote(note.id, form.title, form.content, form.image);
        } else {
            res = await createNote(form.title, form.content, form.image);
        }

        setLoading(false);

        if (res.success) {
            onOpenChange(false);
            onSuccess();
        } else {
            alert(res.message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">

                {/* HEADER */}
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                        {isEdit ? <Pen className="h-5 w-5 text-blue-600" /> : <FilePlus className="h-5 w-5 text-blue-600" />}
                        {isEdit ? "Edit Note" : "Create Note"}
                    </DialogTitle>
                </DialogHeader>

                {/* FORM */}
                <div className="space-y-4 mt-4">

                    {/* TITLE */}
                    <div className="flex flex-col">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Pen className="h-4 w-4 text-gray-500" /> Title
                        </label>
                        <Input
                            placeholder="Enter note title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                        />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Pen className="h-4 w-4 text-gray-500" /> Content
                        </label>
                        <Textarea
                            placeholder="Write your note here..."
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            className="resize-none"
                            rows={4}
                        />
                    </div>

                    {/* IMAGE UPLOAD */}
                    <div className="flex flex-col">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Image className="h-4 w-4 text-gray-500" /> Image (optional)
                        </label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                if (!file.type.startsWith("image/")) {
                                    alert("Only image files are allowed");
                                    e.target.value = "";
                                    return;
                                }
                                setForm({ ...form, image: file });
                            }}
                        />
                    </div>

                    {/* SUBMIT BUTTON */}
                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {loading ? "Saving..." : isEdit ? "Update Note" : "Create Note"}
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    );
}