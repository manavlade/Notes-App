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

            <DialogContent className="bg-white rounded-2xl shadow-xl">

                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Note" : "Create Note"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">

                    <Input
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                    />

                    <Textarea
                        placeholder="Content"
                        value={form.content}
                        onChange={(e) =>
                            setForm({ ...form, content: e.target.value })
                        }
                    />

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

                            setForm({
                                ...form,
                                image: file
                            });
                        }}
                    />

                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : isEdit
                                ? "Update Note"
                                : "Create Note"}
                    </Button>

                </div>

            </DialogContent>
        </Dialog>
    );
}