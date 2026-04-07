// ฟังก์ชันส่งออก (Export) เป็นไฟล์ .json
function exportUserPresets() {
    const saved = localStorage.getItem('wptg_user_presets');
    if (!saved || saved === "[]") {
        alert(currentLang === 'th' ? "ไม่มีชุดคำศัพท์ที่บันทึกไว้" : "No saved presets found.");
        return;
    }
    const blob = new Blob([saved], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "wptg_my_presets.json";
    link.click();
    URL.revokeObjectURL(url);
}

async function exportPDF() {
    const size = el('paperSize') ? el('paperSize').value : 'a4';
    const orient = el('paperOrientation') ? el('paperOrientation').value : 'p';
    const jsOrient = orient === 'l' ? 'landscape' : 'portrait';

    el('loadingOverlay').style.display = 'flex';
    // 🟢 แก้ไขปัญหาฟอนต์เปลี่ยน: รอให้เบราว์เซอร์โหลดฟอนต์เสร็จ 100% ก่อนเริ่ม
    await document.fonts.ready;
    
    document.body.classList.add('pdf-exporting');
    
    // Replace stroke placeholders with SVGs
    const placeholders = document.querySelectorAll('.stroke-placeholder');
    for (const ph of placeholders) {
        const char = ph.getAttribute('data-char');
        const svg = await getStrokeSVG(char);
        if (svg) {
            ph.innerHTML = svg;
            const svgEl = ph.querySelector('svg');
            if (svgEl) {
                svgEl.setAttribute('width', '100%');
                svgEl.setAttribute('height', '100%');
                svgEl.style.maxWidth = '100%';
                svgEl.style.maxHeight = '100%';
                svgEl.style.objectFit = 'contain';
            }
        }
    }
    
    const element = el('all-pages');
    const opt = {
        margin: 0, filename: 'handwriting_practice.pdf', image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'mm', format: size, orientation: jsOrient }, 
        pagebreak: { mode: 'css', after: '.page-break-target' } 
    };
    
    setTimeout(() => {
        html2pdf().set(opt).from(element).save().then(() => { 
            document.body.classList.remove('pdf-exporting');
            el('loadingOverlay').style.display = 'none';
        });
    }, 200);
}

async function exportImage() {
    el('loadingOverlay').style.display = 'flex';
    // 🟢 แก้ไขปัญหาฟอนต์เปลี่ยน: รอให้เบราว์เซอร์โหลดฟอนต์เสร็จ 100% ก่อนเริ่ม
    await document.fonts.ready;
    document.body.classList.add('pdf-exporting');
    
    try {
        // 🟢 1. หน่วงเวลาให้ CSS ยืดหน้ากระดาษ (ซ่อนแถบเมนู) ให้เสร็จสมบูรณ์ "ก่อน"
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Replace stroke placeholders with SVGs
        const placeholders = document.querySelectorAll('.stroke-placeholder');
        for (const ph of placeholders) {
            const char = ph.getAttribute('data-char');
            const svg = await getStrokeSVG(char);
            if (svg) {
                ph.innerHTML = svg;
                const svgEl = ph.querySelector('svg');
                if (svgEl) {
                    svgEl.setAttribute('width', '100%');
                    svgEl.setAttribute('height', '100%');
                    svgEl.style.maxWidth = '100%';
                    svgEl.style.maxHeight = '100%';
                    svgEl.style.objectFit = 'contain';
                }
            }
        }
        
        // 🟢 2. ค่อยสั่งดึงข้อมูลหน้ากระดาษ (เพื่อให้ได้กระดาษปัจจุบันที่ติดอยู่กับหน้าเว็บจริงๆ)
        const pages = document.querySelectorAll('#all-pages > div');
        
        if (pages.length === 0) throw new Error("ไม่พบหน้ากระดาษ");

        const scaleVal = 2; // ความละเอียดระดับ 2 เท่า (คมชัดพอสำหรับพิมพ์)

        if (pages.length === 1) {
            // 📝 กรณีมีหน้าเดียว (ถ่ายจาก Container หลักเลยเพื่อความปลอดภัย 100%)
            const canvas = await html2canvas(el('all-pages'), { scale: scaleVal, useCORS: true, scrollY: 0 });
            
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.download = 'handwriting_practice.png';
            link.href = url;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
        } else {
            // 🗂️ กรณีมีหลายหน้า (บันทึกใส่ ZIP)
            const zip = new JSZip();
            const loadingText = el('loadingText');
            const originalText = loadingText.innerText;
            
            for (let i = 0; i < pages.length; i++) {
                loadingText.innerText = (typeof currentLang !== 'undefined' && currentLang === 'en') 
                    ? `Processing page ${i + 1} of ${pages.length}...`
                    : `กำลังถ่ายรูปหน้า ${i + 1} จาก ${pages.length}...`;
                
                const canvas = await html2canvas(pages[i], { scale: scaleVal, useCORS: true, scrollY: 0 });
                
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
                zip.file(`handwriting_practice_page_${i + 1}.png`, blob);
            }
            
            loadingText.innerText = (typeof currentLang !== 'undefined' && currentLang === 'en') ? "Creating ZIP file..." : "กำลังบีบอัดไฟล์ ZIP...";
            
            // บีบอัด ZIP
            const content = await zip.generateAsync({type:"blob", compression: "STORE"});
            const url = URL.createObjectURL(content);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = "handwriting_practice_images.zip";
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            loadingText.innerText = originalText;
        }
    } catch (error) {
        console.error("Export Image Error:", error);
        alert((typeof currentLang !== 'undefined' && currentLang === 'en') ? "An error occurred while generating images." : "เกิดข้อผิดพลาดในการสร้างรูปภาพ");
    } finally {
        document.body.classList.remove('pdf-exporting');
        el('loadingOverlay').style.display = 'none';
    }
}

