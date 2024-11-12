import multer from "multer";
import fs from "fs";
import path from "path";

const tempDir = path.join(process.cwd(), "public/temp");

// Ensure the 'public/temp' directory exists at runtime
if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, tempDir); // Use the ensured directory
      },
      filename: function (req, file, cb) {
            const uniqueSuffix =
                  Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, file.originalname + "-" + uniqueSuffix);
      },
});

export const upload = multer({ storage });
