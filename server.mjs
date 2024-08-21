import express from 'express';
import path from 'path';
const app = express()
import multer from 'multer';
import { fileURLToPath } from 'url';
import {mergePdfs} from './merge.mjs';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload = multer({dest: 'uploads/'})

const port = 3000
app.use('/static', express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})
app.post('/merge', upload.array('pdfs', 2), (req, res) => {
 console.log(req.files)
 mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    .then(() => {
      res.redirect("/static/merged.pdf");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error merging PDFs');
    });
 })
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})