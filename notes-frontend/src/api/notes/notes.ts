export default async function createNote(
    title: string,
    content: string,
    image: File | null
) {
    try {
        const formData = new FormData();

        formData.append("title", title);

        formData.append("content", content);

        if (image) {
            formData.append("image", image);
        }
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                message: data.message || "Failed to create note",
            };
        }

        return {
            success: true,
            statusCode: response.status,
            message: data.message || "Note created successfully",
            note: data.note,
        };
    } catch (error) {
        console.error("Error creating note:", error);
        return {
            success: false,
            statusCode: 500,
            message: "Network error. Please try again later."
        };
    }
}

export const getAllNotes = async () => {

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes`, {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                message: data.message || "Failed to fetch notes",
            };
        }

        return {
            success: true,
            statusCode: response.status,
            notes: data.notes,
        };
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
    }
}

export const deleteNote = async (noteId: string) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${noteId}`, {
            method: "DELETE",
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                message: data.message || "Failed to delete note",
            };
        }

        return {
            success: true,
            statusCode: response.status,
            message: data.message || "Note deleted successfully",
        };
    } catch (error) {
        console.error("Error deleting note:", error);
        throw error;
    }
}

export const updateNote = async (
    noteId: string,
    title: string,
    content: string,
    image: File | null
) => {

    try {
        const formData = new FormData();

        formData.append("title", title);

        formData.append("content", content);

        if (image) {
            formData.append("image", image);
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${noteId}`, {
            method: "PUT",
            credentials: "include",
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                message: data.message || "Failed to update note",
            };
        }

        return {
            success: true,
            statusCode: response.status,
            message: data.message || "Note updated successfully",
            note: data.note,
        };
    } catch (error) {
        console.error("Error updating note:", error);
        throw error;
    }
}

export const getSingleNote = async (noteId: string) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${noteId}`, {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                message: data.message || "Failed to fetch note",
            };
        }

        return {
            success: true,
            statusCode: response.status,
            message: data.message || "Note fetched successfully",
            note: data.note,
        };
    } catch (error) {
        console.error("Error fetching note:", error);
        throw error;
    }
}
