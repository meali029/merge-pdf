import PDFMerger from 'pdf-merger-js';
var merger = new PDFMerger();
export const mergePdfs = async (p1,p2) => {
  await merger.add(p1);  
  await merger.add(p2); 
 await merger.save('public/merged.pdf'); 
}
