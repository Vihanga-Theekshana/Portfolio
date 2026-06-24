const pool = require("../db");
const fs = require("fs").promises;
const path = require("path");

const project = async (req, res) => {
    try {
        const [values] = await pool.query("SELECT * FROM projects");
        console.log(values);
        return res.status(200).json(values);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "error getting projects" });
    }
}

const deleteproject = async (req, res) => {
    try {
        const id = req.params.id;

        // Retrieve the project images before deleting from database
        const [rows] = await pool.query("SELECT image, moreImages FROM projects WHERE id = ?", [id]);
        if (rows.length > 0) {
            const projectData = rows[0];
            const filesToDelete = [];

            if (projectData.image) {
                filesToDelete.push(projectData.image);
            }

            if (projectData.moreImages) {
                try {
                    const more = typeof projectData.moreImages === 'string' ? JSON.parse(projectData.moreImages) : projectData.moreImages;
                    if (Array.isArray(more)) {
                        filesToDelete.push(...more);
                    }
                } catch (e) {
                    console.error("Error parsing moreImages for deletion:", e);
                }
            }

            // Unlink each file from uploads directory
            for (const file of filesToDelete) {
                if (file && !file.startsWith("http://") && !file.startsWith("https://") && !file.startsWith("data:")) {
                    const filePath = path.join(__dirname, "../uploads", file);
                    try {
                        await fs.unlink(filePath);
                        console.log("Deleted file from disk:", filePath);
                    } catch (err) {
                        console.warn("Could not delete file:", filePath, err.message);
                    }
                }
            }
        }

        const value = await pool.query("DELETE from projects WHERE id = ?", [id]);
        return res.status(200).json({ message: "project deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "error deleting project" });
    }
}

const addproject = async (req, res) => {
    try {
        const { id, title, desc, tags, github, live, moreImages, features, details } = req.body;
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No images uploaded" });
        }
        const imagepaths = req.files.map(file => file.filename);
        const image = imagepaths[0];

        const [values] = await pool.query("INSERT INTO projects (id,title,`desc`,tags,github,live,image,moreImages,features,details) VALUES (?,?,?,?,?,?,?,?,?,?)", [id, title, desc, tags, github, live, image, JSON.stringify(imagepaths.slice(1)), features, details]);
        return res.status(200).json({ message: "project added successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "error adding project" });
    }
}

module.exports = { project, deleteproject, addproject };
