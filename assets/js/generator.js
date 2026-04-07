// assets/js/generator.js

const strokeCache = {};

async function getStrokeSVG(char) {
    if (strokeCache[char]) return strokeCache[char];
    const code = char.charCodeAt(0);
    let url = null;
    if (code >= 0x4E00 && code <= 0x9FFF) { // Kanji
        const hex = code.toString(16).padStart(5, '0');
        url = `https://kanjivg.tagaini.net/kanji/${hex}.svg`;
    } else if (code >= 0x3400 && code <= 0x4DBF || code >= 0x20000 && code <= 0x2A6DF || code >= 0x2A700 && code <= 0x2B73F || code >= 0x2B740 && code <= 0x2B81F || code >= 0x2B820 && code <= 0x2CEAF) { // Chinese
        // For Chinese, use Makemeahanzi data
        url = `https://cdn.jsdelivr.net/npm/hanzi-writer-data@latest/${char}.json`;
    }
    if (!url) return null;
    try {
        const response = await fetch(url);
        if (response.ok) {
            if (url.includes('kanjivg')) {
                const svgText = await response.text();
                strokeCache[char] = svgText;
                return svgText;
            } else { // Makemeahanzi JSON
                const data = await response.json();
                if (data.strokes) {
                    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="100" height="100"><g transform="scale(1,-1) translate(0,-900)">${data.strokes.map((path, i) => `<path d="${path}" stroke="black" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}</g></svg>`;
                    strokeCache[char] = svg;
                    return svg;
                }
            }
        }
    } catch (e) {}
    return null;
}

function getDynamicRowsPerPage(cols, isFirstPage) {
    const size = el('paperSize') ? el('paperSize').value : 'a4';
    const orient = el('paperOrientation') ? el('paperOrientation').value : 'p';
    const layout = el('gridLayout') ? el('gridLayout').value : 'spaced';
    
    // ตั้งค่าขนาดกระดาษ (มิลลิเมตร)
    const dims = {
        'a4p': [210, 297], // width and height in mm or other units
        'a4l': [297, 210],
        'b5p': [176, 250],
        'b5l': [250, 176],
        'letterp': [216, 279],
        'letterl': [279, 216],
        'legalp': [216, 356],
        'legall': [356, 216]
    };
    const [pW, pH] = dims[size + orient] || [210, 297];

    const showRuby = el('showRuby') ? el('showRuby').checked : false;
    const showMeaning = el('showMeaning') ? el('showMeaning').checked : false;
    const autoRead = el('autoRead') ? el('autoRead').checked : false;

    let gapX = (layout === 'connected') ? 0 : 8;
    let gapY = (layout === 'connected') ? 0 : 8;

    const rubyHeight = showRuby ? 26 : 0;
    const meaningHeight = showMeaning ? 26 : 0;
    const legendHeight = (showRuby && autoRead) ? 35 : 0;
    
    const hTitle = el('headerTitle') ? el('headerTitle').value : "";
    const hName = el('headerName') ? el('headerName').value : "";
    const hClass = el('headerClass') ? el('headerClass').value : "";
    const headerAllowance = (isFirstPage && (hTitle || hName || hClass)) ? 50 : 0;
    
    const contentW = (pW - 30) * 3.7795;
    const contentH = (pH - 30) * 3.7795 - legendHeight - headerAllowance - 40; 

    let boxSize = Math.floor((contentW - (cols - 1) * gapX) / cols);
    if (boxSize < 10) boxSize = 10; // ป้องกันขนาดกล่องเล็กเกินไป
    let rpp = Math.floor((contentH + gapY) / (boxSize + rubyHeight + meaningHeight + gapY));
    
    return { rpp: Math.max(1, rpp), boxSize, pW, pH };
}

function autoAdjustRows(force) {
    if (!force) return;
    const textStr = el('textInput').value;
    const readStr = el('customReadingInput').value;
    const meanStr = el('customMeaningInput').value;
    
    const charArray = textStr ? (textStr.includes(',') ? textStr.split(',').map(s=>s.trim()) : Array.from(textStr)) : [];
    const readArray = readStr ? readStr.split(',').map(s=>s.trim()) : [];
    const meanArray = meanStr ? meanStr.split(',').map(s=>s.trim()) : [];
    
    const maxLen = Math.max(charArray.length, readArray.length, meanArray.length);

    const cols = parseInt(el('cols').value) || 10;
    const dir = el('direction').value;
    const fill = el('fillMode').value;
    const isAltRows = el('altRows') ? el('altRows').checked : false;
    
    const { rpp } = getDynamicRowsPerPage(cols, true);
    let targetRows = rpp;

    if (maxLen === 0) {
        targetRows = rpp; 
    } else {
        if (fill === 'model') {
            if (dir === 'horiz') targetRows = isAltRows ? maxLen * 2 : maxLen;
            else targetRows = isAltRows ? maxLen * 2 : maxLen;
        }
        else if (fill === 'all') {
            targetRows = Math.ceil(maxLen / cols);
            if (isAltRows) targetRows *= 2;
        }
        else if (fill === 'repeat') {
            targetRows = rpp; 
        }
    }
    
    el('rows').value = Math.max(1, targetRows || 1);
}

function toggleRepeatRow() {
    const dir = el('direction').value, fill = el('fillMode').value;
    el('repeatGroupHoriz').style.display = (fill === 'model') ? 'block' : 'none';
    el('repeatGroupVert').style.display = 'none';
}

function getGridSVG(style, color) {
    const hex = encodeURIComponent(color);
    // 🟢 ดึงค่าความหนาจาก Slider (ถ้าไม่มีให้ใช้ 1)
    const weight = el('gridThickness') ? el('gridThickness').value : 1;
    if (style === 'tian') return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'><line x1='50' y1='0' x2='50' y2='100' stroke='${hex}' stroke-dasharray='4' stroke-width='1'/><line x1='0' y1='50' x2='100' y2='50' stroke='${hex}' stroke-dasharray='4' stroke-width='${weight}'/></svg>")`;
    if (style === 'tianDotted') return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'><line x1='50' y1='0' x2='50' y2='100' stroke='${hex}' stroke-dasharray='1 4' stroke-width='1'/><line x1='0' y1='50' x2='100' y2='50' stroke='${hex}' stroke-dasharray='1 4' stroke-width='${weight}'/></svg>")`;
    if (style === 'mi') return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'><line x1='50' y1='0' x2='50' y2='100' stroke='${hex}' stroke-dasharray='4' stroke-width='1'/><line x1='0' y1='50' x2='100' y2='50' stroke='${hex}' stroke-dasharray='4' stroke-width='1'/><line x1='0' y1='0' x2='100' y2='100' stroke='${hex}' stroke-dasharray='4' stroke-width='1'/><line x1='100' y1='0' x2='0' y2='100' stroke='${hex}' stroke-dasharray='4' stroke-width='1'/></svg>")`;
    if (style === 'jiu') return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'><line x1='33.3' y1='0' x2='33.3' y2='100' stroke='${hex}' stroke-dasharray='4' stroke-width='1'/><line x1='66.6' y1='0' x2='66.6' y2='100' stroke='${hex}' stroke-dasharray='4' stroke-width='${weight}'/><line x1='0' y1='33.3' x2='100' y2='33.3' stroke='${hex}' stroke-dasharray='4' stroke-width='1'/><line x1='0' y1='66.6' x2='100' y2='66.6' stroke='${hex}' stroke-dasharray='4' stroke-width='1'/></svg>")`;
    if (style === 'hui') return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'><rect x='25' y='25' width='50' height='50' fill='none' stroke='${hex}' stroke-dasharray='4' stroke-width='1'/><rect x='0' y='0' width='100' height='100' fill='none' stroke='${hex}' stroke-width='${weight}'/><line x1='0' y1='0' x2='25' y2='25' stroke='${hex}' stroke-dasharray='4' stroke-width='1'/><line x1='100' y1='0' x2='75' y2='25' stroke='${hex}' stroke-dasharray='4' stroke-width='1'/><line x1='0' y1='100' x2='25' y2='75' stroke='${hex}' stroke-dasharray='4' stroke-width='1'/><line x1='100' y1='100' x2='75' y2='75' stroke='${hex}' stroke-dasharray='4' stroke-width='1'/></svg>")`;
    if (style === 'diagonal') return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'><line x1='0' y1='0' x2='100' y2='100' stroke='${hex}' stroke-dasharray='4' stroke-width='1'/><line x1='100' y1='0' x2='0' y2='100' stroke='${hex}' stroke-dasharray='4' stroke-width='${weight}'/></svg>")`;
    if (style === 'cross') return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'><line x1='50' y1='0' x2='50' y2='100' stroke='${hex}' stroke-dasharray='4' stroke-width='1'/><line x1='0' y1='50' x2='100' y2='50' stroke='${hex}' stroke-dasharray='4' stroke-width='${weight}'/></svg>")`;
    if (style === 'bottom') return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'><line x1='0' y1='100' x2='100' y2='100' stroke='${hex}' stroke-dasharray='4' stroke-width='${weight}'/></svg>")`;
    if (style === 'english') return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'><line x1='0' y1='33.3' x2='100' y2='33.3' stroke='${hex}' stroke-dasharray='4' stroke-width='1' opacity='0.6'/><line x1='0' y1='66.6' x2='100' y2='66.6' stroke='${hex}' stroke-dasharray='4' stroke-width='${weight}' opacity='0.6'/></svg>")`;
    if (style === 'circle') return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'><circle cx='50' cy='50' r='40' fill='none' stroke='${hex}' stroke-dasharray='4' stroke-width='${weight}'/></svg>")`;
    return '';
}

function update() {
    const textStr = el('textInput') ? el('textInput').value : "";
    const readStr = el('customReadingInput') ? el('customReadingInput').value : "";
    const meanStr = el('customMeaningInput') ? el('customMeaningInput').value : "";

    const charArray = textStr ? (textStr.includes(',') ? textStr.split(',').map(s=>s.trim()) : Array.from(textStr)) : [];
    const customRArr = readStr ? readStr.split(',').map(s=>s.trim()) : [];
    const customMArr = meanStr ? meanStr.split(',').map(s=>s.trim()) : [];

    const maxLen = Math.max(charArray.length, customRArr.length, customMArr.length);

    let sourceData = [];
    for (let i = 0; i < maxLen; i++) {
        let ch = charArray[i] || "";
        
        let rd = "";
        if (readStr === "" && el('preset').value !== 'custom') rd = readingMap[ch] || "";
        else if (readStr !== "") rd = customRArr[i] !== undefined ? customRArr[i] : "";
        else rd = readingMap[ch] || "";

        let mn = "";
        if (meanStr === "" && el('preset').value !== 'custom') mn = meaningMap[ch] ? (meaningMap[ch][currentLang] || "") : "";
        else if (meanStr !== "") mn = customMArr[i] !== undefined ? customMArr[i] : "";
        else mn = meaningMap[ch] ? (meaningMap[ch][currentLang] || "") : "";

        sourceData.push({ char: ch, reading: rd, meaning: mn });
    }

    const cols = Math.max(1, parseInt(el('cols').value) || 1);
    let rowsRequested = Math.max(1, parseInt(el('rows').value) || 1); 
    
    const dir = el('direction').value, fill = el('fillMode').value, style = el('gridStyle').value;
    const layout = el('gridLayout').value, fontFam = el('fontSelect').value, textStyle = el('textStyle').value;
    const color = el('gridColor').value;
    const showRuby = el('showRuby') ? el('showRuby').checked : false;
    const showMeaning = el('showMeaning') ? el('showMeaning').checked : false;
    const autoRead = el('autoRead') ? el('autoRead').checked : false;
    const repeatRowHoriz = el('repeatRowHoriz') ? el('repeatRowHoriz').checked : false;
    const repeatRowVert = el('repeatRowVert') ? el('repeatRowVert').checked : false;

    const isAltRows = el('altRows') ? el('altRows').checked : false;
    const textOpacity = el('textOpacity') ? (el('textOpacity').value / 100) : 1;
    const size = el('paperSize') ? el('paperSize').value : 'a4';
    const orient = el('paperOrientation') ? el('paperOrientation').value : 'p';

    const hTitle = el('headerTitle') ? el('headerTitle').value : "";
    const hName = el('headerName') ? el('headerName').value : "";
    const hClass = el('headerClass') ? el('headerClass').value : "";
    const hasHeader = (hTitle || hName || hClass);

    document.documentElement.style.setProperty('--grid-color', color);
    const gridWeight = el('gridThickness') ? el('gridThickness').value : 1;
    document.documentElement.style.setProperty('--grid-weight', `${gridWeight}px`);
    const previewArea = el('all-pages'); previewArea.innerHTML = ""; 

    let gapX = 8, gapY = 8;
    if (layout === 'connected') { gapX = 0; gapY = 0; }
    else if (layout === 'stripes') { gapX = 0; gapY = 8; }
    else if (layout === 'stripes-vert') { gapX = 8; gapY = 0; }

    const firstPageMetrics = getDynamicRowsPerPage(cols, hasHeader);
    const otherPageMetrics = getDynamicRowsPerPage(cols, hasHeader);
    
    if (fill !== 'model') {
        if (lastCalculatedRpp > 0 && rowsRequested === lastCalculatedRpp) {
            rowsRequested = firstPageMetrics.rpp; el('rows').value = rowsRequested;
        } else if (lastCalculatedRpp === 0 && (rowsRequested === 10 || rowsRequested === 12)) {
            rowsRequested = firstPageMetrics.rpp; el('rows').value = rowsRequested;
        }
    }
    lastCalculatedRpp = firstPageMetrics.rpp;

    const actualTotalRows = Math.max(1, rowsRequested); 
    
    let gridMatrix = [];
    for (let r = 0; r < actualTotalRows; r++) {
        let rowArr = [];
        for (let c = 0; c < cols; c++) {
            rowArr.push({ char: "", reading: "", meaning: "" });
        }
        gridMatrix.push(rowArr);
    }

    let validRows = [];
    for (let r = 0; r < actualTotalRows; r++) {
        if (isAltRows && r % 2 !== 0) continue;
        validRows.push(r);
    }

    let dataIdx = 0;
    if (sourceData.length > 0 && validRows.length > 0) {
        if (fill === 'all' || fill === 'repeat') {
            if (dir === 'horiz') {
                for (let r of validRows) {
                    for (let c = 0; c < cols; c++) {
                        if (gridMatrix[r]) {
                            if (fill === 'all' && dataIdx < sourceData.length) {
                                gridMatrix[r][c] = sourceData[dataIdx];
                            } else if (fill === 'repeat') {
                                gridMatrix[r][c] = sourceData[dataIdx % sourceData.length];
                            }
                        }
                        dataIdx++;
                    }
                }
            } else { // แนวตั้ง
                for (let r of validRows) {
                    for (let c = 0; c < cols; c++) {
                        if (gridMatrix[r]) {
                            if (fill === 'all' && dataIdx < sourceData.length) {
                                gridMatrix[r][c] = sourceData[dataIdx];
                            } else if (fill === 'repeat') {
                                gridMatrix[r][c] = sourceData[dataIdx % sourceData.length];
                            }
                        }
                        dataIdx++;
                    }
                }
            }
        } else if (fill === 'model') {
            if (dir === 'horiz') {
                let charIdx = 0;
                for (let r of validRows) {
                    if (charIdx < sourceData.length && gridMatrix[r]) {
                        gridMatrix[r][0] = sourceData[charIdx]; // First column only
                        if (repeatRowHoriz) {
                            for (let c = 1; c < cols; c++) gridMatrix[r][c] = sourceData[charIdx];
                        }
                        charIdx++;
                    }
                }
            } else { // แนวตั้ง
                let charIdx = 0;
                for (let r of validRows) {
                    if (charIdx < sourceData.length && gridMatrix[r]) {
                        gridMatrix[r][0] = sourceData[charIdx]; // First column only
                        if (repeatRowHoriz) {
                            for (let c = 1; c < cols; c++) gridMatrix[r][c] = sourceData[charIdx];
                        }
                        charIdx++;
                    }
                }
            }
        }
    }

    let cellMap = [];
    for (let r = 0; r < actualTotalRows; r++) {
        for (let c = 0; c < cols; c++) cellMap.push(gridMatrix[r][c]);
    }

    const fragment = document.createDocumentFragment();
    let cellIdx = 0;
    let currentRow = 0;
    let pageNum = 0;

    while (currentRow < actualTotalRows) {
        let isFirstPage = (pageNum === 0);
        let rowsPerPage = isFirstPage ? firstPageMetrics.rpp : otherPageMetrics.rpp;
        let boxSize = isFirstPage ? firstPageMetrics.boxSize : otherPageMetrics.boxSize;
        
        const page = document.createElement('div');
        page.className = `page-a4 page-${size} ${orient === 'l' ? 'landscape' : ''} ${showRuby ? 'show-pinyin' : ''} ${showMeaning ? 'show-meaning' : ''}`;
        
        if (hasHeader) {
            const headerDiv = document.createElement('div');
            headerDiv.className = 'paper-header-info';
            
            const lblName = (typeof currentLang !== 'undefined' && currentLang === 'en') ? "Name-Surname:" : "ชื่อ-สกุล:";
            const lblClass = (typeof currentLang !== 'undefined' && currentLang === 'en') ? "Class/No.:" : "ชั้น/เลขที่:";

            headerDiv.innerHTML = `
                <div class="paper-header-title">${hTitle}</div>
                <div class="paper-header-details">
                    ${hName ? `<div>${lblName} <span style="text-align:center; border-bottom: 1px dotted #333; display:inline-block; min-width:150px;">${hName}</span></div>` : ''}
                    ${hClass ? `<div>${lblClass} <span style="text-align:center; border-bottom: 1px dotted #333; display:inline-block; min-width:80px;">${hClass}</span></div>` : ''}
                </div>
            `;
            page.appendChild(headerDiv);
        }

        const grid = document.createElement('div');
        grid.className = `grid-container layout-${layout}`;
        grid.style.gridTemplateColumns = `repeat(${cols}, ${boxSize}px)`;
        grid.style.gap = `${gapY}px ${gapX}px`;

        for (let r = 0; r < rowsPerPage; r++) {
            if (currentRow >= actualTotalRows) break;
            for (let c = 0; c < cols; c++) {
                const cellData = cellMap[cellIdx++] || { char: "", reading: "", meaning: "" };
                grid.appendChild(createCell(cellData, boxSize, style, layout, fontFam, textStyle, showRuby, showMeaning, autoRead, fill, dir, repeatRowHoriz, repeatRowVert, c, currentRow, color, textOpacity));
            }
            currentRow++;
        }
        page.appendChild(grid);

        if (showRuby && autoRead) {
            const legend = document.createElement('div');
            legend.className = 'page-legend';
            legend.innerHTML = typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang].legendTxt ? translations[currentLang].legendTxt : "* หมายเหตุ: แถบสีเทา คือ สระ";
            page.appendChild(legend);
        }

        const pageNumDiv = document.createElement('div');
        pageNumDiv.className = 'page-numbering';
        const pageTxt = typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang].pageN ? translations[currentLang].pageN : 'หน้า';
        pageNumDiv.innerText = `${pageTxt} ${pageNum + 1}`;
        page.appendChild(pageNumDiv);
        
        if (currentRow < actualTotalRows) page.classList.add('page-break-target');
        
        // 🌟 ใส่โค้ดลายน้ำตรงนี้ (ใช้ Inline CSS บังคับให้อยู่ตรงกลางแน่นอน 100%) 🌟
        if (window.customWatermark) {
            const wm = document.createElement('img');
            wm.src = window.customWatermark;
            wm.className = 'watermark-img';
            // บังคับ Style ในนี้เลย เพื่อป้องกันปัญหา CSS เดิมติดแคช
            wm.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.15; max-width: 75%; max-height: 75%; pointer-events: none; z-index: 10;';
            page.appendChild(wm);
        }
        fragment.appendChild(page);
        pageNum++;
    }

    previewArea.appendChild(fragment);
    scalePaper();
}

function createCell(cellData, size, style, layout, fontFam, textStyle, showRuby, showMeaning, autoRead, fill, dir, repH, repV, colIndex, rowIndex, color, textOpacity) {
    const unit = document.createElement('div');
    unit.className = 'cell-unit'; unit.style.width = `${size}px`;

    const char = cellData.char;
    const reading = cellData.reading;
    const meaningText = cellData.meaning;

    if (layout === 'stripes' && colIndex === 0) unit.style.borderLeft = `2px solid ${color}`;
    if (layout === 'stripes-vert') {
        unit.style.borderLeft = `2px solid ${color}`;
        unit.style.borderRight = `2px solid ${color}`;
        unit.style.borderBottom = `2px solid ${color}`;
        unit.style.marginLeft = (colIndex > 0) ? '-2px' : '0';
    }

    const ruby = document.createElement('div');
    ruby.className = 'pinyin-box';
    let showMetaHere = true;
    if (fill === 'model') {
        if (dir === 'horiz' && repH && colIndex > 0) showMetaHere = false;
        if (dir === 'vert' && repH && colIndex > 0) showMetaHere = false;
    }

    if (showRuby && autoRead && (char || reading) && showMetaHere) {
        if (reading) {
            const rSpan = document.createElement('span'); rSpan.innerText = reading;
            if (char && typeof vowels !== 'undefined' && vowels.has(char)) rSpan.className = 'vowel-highlight';
            ruby.appendChild(rSpan);
        }
    }
    
    const main = document.createElement('div');
    main.className = 'main-box'; main.style.width = `100%`; main.style.height = `${size}px`;
    
    const bgSvg = getGridSVG(style, color);
    if (bgSvg) { main.style.backgroundImage = bgSvg; main.style.backgroundSize = '100% 100%'; }
    
    const mixedMode = document.getElementById('mixedMode') ? document.getElementById('mixedMode').checked : false;
    let shouldHideText = false;
    
    // โหมดผสม: คัดแค่ 2 คอลัมน์แรก ที่เหลือให้เขียนเอง
    if (mixedMode && colIndex >= 2) shouldHideText = true; 
    
    // ช่องว่างเจาะจง: ถ้าพิมพ์ _ (Underscore) ให้เว้นว่างไปเลย
    if (char === '_') shouldHideText = true;

    if (char && !shouldHideText) {
        let fSize = size * 0.60; 
        if (/[ゃゅょっャュョッ]/.test(char)) fSize = size * 0.45; 
        else if (char.length > 1) {
            if (/[\u0E00-\u0E7F]/.test(char)) fSize = size * (char.length >= 3 ? 0.40 : 0.55);
            else fSize = size * Math.min(0.55, 1.0 / char.length);
        }

        if (textStyle === 'dotted') {
            const svgNS = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("width", "100%"); svg.setAttribute("height", "100%");
            svg.style.position = "absolute"; svg.style.overflow = "visible"; svg.style.pointerEvents = "none";
            
            const textEl = document.createElementNS(svgNS, "text");
            textEl.setAttribute("x", "50%"); textEl.setAttribute("y", "50%");
            textEl.setAttribute("dominant-baseline", "central"); textEl.setAttribute("text-anchor", "middle");
            textEl.setAttribute("fill", "none"); textEl.setAttribute("stroke", "#aaaaaa");
            textEl.setAttribute("stroke-width", Math.max(1, size * 0.015));
            textEl.setAttribute("stroke-dasharray", `${size * 0.04}, ${size * 0.04}`);
            textEl.style.fontFamily = fontFam; textEl.style.fontSize = `${fSize}px`;
            textEl.textContent = char;
            textEl.style.opacity = textOpacity; 
            
            svg.appendChild(textEl); main.appendChild(svg);
        } else if (textStyle === 'stroke') {
            const strokeDiv = document.createElement('div');
            strokeDiv.className = 'stroke-placeholder';
            strokeDiv.setAttribute('data-char', char);
            strokeDiv.style.width = '100%';
            strokeDiv.style.height = '100%';
            strokeDiv.style.display = 'flex';
            strokeDiv.style.alignItems = 'center';
            strokeDiv.style.justifyContent = 'center';
            strokeDiv.style.fontFamily = fontFam;
            strokeDiv.style.fontSize = `${fSize}px`;
            strokeDiv.innerHTML = char; // placeholder for preview
            main.appendChild(strokeDiv);
        } else {
            const s = document.createElement('span'); 
            s.innerText = char; s.className = `text-${textStyle}`;
            s.style.fontFamily = fontFam; s.style.fontSize = `${fSize}px`; 
            s.style.whiteSpace = "nowrap"; 
            s.style.opacity = textOpacity; 
            main.appendChild(s);
        }
    }
    
    const meaning = document.createElement('div');
    meaning.className = 'meaning-box';
    if (showMeaning && (char || meaningText) && showMetaHere) {
        if (meaningText) {
            const mText = document.createElement('span'); mText.className = 'meaning-text';
            mText.innerText = meaningText;
            meaning.appendChild(mText);
        }
    }
    
    unit.appendChild(ruby); unit.appendChild(main); unit.appendChild(meaning);
    return unit;
}

function scalePaper() {
    let finalZoom = typeof manualZoom !== 'undefined' ? manualZoom : 1.0;
    if (window.innerWidth <= 768) {
        const previewWidth = $('.preview').width();
        const paperWidth = 210 * 3.7795; 
        //const paperWidth = [pW, pH];
        const autoScale = Math.min(1, (previewWidth - 20) / paperWidth);
        finalZoom = autoScale * finalZoom;
    }
    document.documentElement.style.setProperty('--zoom-level', finalZoom);
}


function saveSettings() {
    const ids = ['preset', 'fontSelect', 'textStyle', 'textInput', 'customReadingInput', 'customMeaningInput', 
                 'cols', 'rows', 'direction', 'fillMode', 'gridLayout', 'gridStyle', 'gridColor', 
                 'headerTitle', 'headerName', 'headerClass', 'paperSize', 'paperOrientation'];
    const checks = ['showMeaning', 'repeatRowHoriz', 'repeatRowVert', 'showRuby', 'autoRead', 'altRows'];
    
    let settings = {};
    ids.forEach(id => { if (el(id)) settings[id] = el(id).value; });
    checks.forEach(id => { if (el(id)) settings[id] = el(id).checked; });
    
    localStorage.setItem('wptg_settings_v2', JSON.stringify(settings));
}

function loadSettings() {
    const saved = localStorage.getItem('wptg_settings_v2');
    if (saved) {
        try {
            const settings = JSON.parse(saved);
            for (let id in settings) {
                if (el(id)) {
                    if (el(id).type === 'checkbox') el(id).checked = settings[id];
                    else el(id).value = settings[id];
                }
            }
            $('.select-ui').trigger('change.select2');
        } catch (e) { console.error("Error loading settings"); }
    }
}
