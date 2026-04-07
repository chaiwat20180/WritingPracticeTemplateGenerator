// assets/js/ui.js

const el = id => document.getElementById(id);

function renderDonateInfo() {
        const lang = currentLang;
        el('tab-qr').innerHTML = `
            <div class="qr-placeholder"><img src="https://promptpay.io/${DONATE_CONFIG.promptpay.phone}.png" alt="PromptPay QR"></div>
            <div style="color: #666; font-size: 14px; margin-bottom: 5px;" data-i18n="qrDesc">${lang === 'th' ? 'สแกน QR Code ด้วยแอปพลิเคชันธนาคาร' : 'Scan QR Code with any banking app'}</div>
            <div style="font-size: 16px; font-weight: bold; color: var(--primary); margin-bottom: 12px;">
                ${lang === 'th' ? DONATE_CONFIG.promptpay.accNameTH : DONATE_CONFIG.promptpay.accNameEN}
            </div>
            <div class="bank-item" style="justify-content: center; background: #f8f9fa;">
                <span style="font-size: 18px; font-weight: bold; letter-spacing: 1px; color: var(--primary); font-family: monospace; margin-right: 10px;">${DONATE_CONFIG.promptpay.formatted}</span>
                <button class="copy-btn" onclick="copyText('${DONATE_CONFIG.promptpay.phone}')">📋 ${lang === 'th' ? 'คัดลอก' : 'Copy'}</button>
            </div>
        `;
        el('tab-tmw').innerHTML = `
            <div class="bank-item">
                <div class="bank-logo-wrap">
                    <img src="${DONATE_CONFIG.truemoney.icon}" alt="TrueMoney" class="bank-img" onerror="this.src='https://via.placeholder.com/40?text=TM'">
                    <div class="bank-info">
                        <div>${lang === 'th' ? 'ทรูมันนี่ วอเล็ต (TrueMoney)' : 'TrueMoney Wallet'}</div>
                        <div class="acc-name">${lang === 'th' ? DONATE_CONFIG.truemoney.accNameTH : DONATE_CONFIG.truemoney.accNameEN}</div>
                        <span>${DONATE_CONFIG.truemoney.formatted}</span>
                    </div>
                </div>
                <button class="copy-btn" onclick="copyText('${DONATE_CONFIG.truemoney.phone}')">📋 ${lang === 'th' ? 'คัดลอก' : 'Copy'}</button>
            </div>
        `;
        el('tab-bank').innerHTML = DONATE_CONFIG.banks.map(bank => `
            <div class="bank-item">
                <div class="bank-logo-wrap">
                    <img src="${bank.icon}" alt="${bank.id}" class="bank-img" onerror="this.src='https://via.placeholder.com/40?text=Bank'">
                    <div class="bank-info">
                        <div>${lang === 'th' ? bank.nameTH : bank.nameEN}</div>
                        <div class="acc-name">${lang === 'th' ? bank.accNameTH : bank.accNameEN}</div>
                        <span>${bank.accNum}</span>
                    </div>
                </div>
                <button class="copy-btn" onclick="copyText('${bank.rawNum}')">📋 ${lang === 'th' ? 'คัดลอก' : 'Copy'}</button>
            </div>
        `).join('');
    }

    function copyText(text) {
        navigator.clipboard.writeText(text).then(() => {
            const toast = el('copyToast');
            toast.innerText = currentLang === 'th' ? `✅ คัดลอกเบอร์ ${text} สำเร็จ!` : `✅ Copied ${text} successfully!`;
            toast.classList.add('show');
            setTimeout(() => { toast.classList.remove('show'); }, 2500);
        }).catch(err => {
            alert('ไม่สามารถคัดลอกได้ กรุณาทำรายการด้วยตนเอง');
        });
    }

    function changeZoom(step) { manualZoom = Math.max(0.3, Math.min(3.0, manualZoom + step)); scalePaper(); }
    function resetZoom() { manualZoom = 1.0; scalePaper(); }
    function toggleSidebar() { $('#sidebar').toggleClass('open'); $('#sidebarOverlay').toggleClass('open'); }

    function openDonateModal() { el('donateModal').classList.add('show'); }
    function closeDonateModal(e) { if(e && e.target !== el('donateModal')) return; el('donateModal').classList.remove('show'); }
    function switchDonateTab(tabId) {
        $('.tab-btn').removeClass('active'); $('.tab-pane').removeClass('active');
        $(`.tab-btn[onclick="switchDonateTab('${tabId}')"]`).addClass('active');
        $(`#${tabId}`).addClass('active');
    }

function setLanguage(lang) {
    currentLang = lang;
    $('.lang-option').removeClass('active');
    $(`#btn-${lang}-desk, #btn-${lang}-mob`).addClass('active');

    const t = translations[currentLang];
    $('[data-i18n]').each(function() { $(this).html(t[$(this).attr('data-i18n')]); });
    $('[data-i18n-ph]').each(function() { $(this).attr('placeholder', t[$(this).attr('data-i18n-ph')]); });
    $('[data-i18n-opt]').each(function() { $(this).text(t[$(this).attr('data-i18n-opt')]); });
    $('[data-i18n-grp]').each(function() { $(this).attr('label', t[$(this).attr('data-i18n-grp')]); });
    
    const val = el('preset').value;
    if(val !== 'custom') {
        const txt = presets[val];
        // เช็คก่อนว่ามี txt ป้องกัน Error
        if (txt) {
            el('customMeaningInput').value = txt.split(',').map(c => {
                return (meaningMap[c] && meaningMap[c][currentLang]) || '';
            }).join(',');
        }
    }

    // 🟢 เพิ่ม #paperSize, #paperOrientation เข้าไปในชุดทำลาย UI เดิมเพื่อโหลดภาษาใหม่
    $('#preset, #direction, #fillMode, #gridStyle, #gridLayout, #fontSelect, #textStyle, #paperSize, #paperOrientation').select2('destroy');
    initSelect2(); update(); renderDonateInfo(); 
}

function customSearchMatcher(params, data) {
    // 1. ถ้าไม่ได้พิมพ์ค้นหา ให้แสดงทั้งหมด
    if ($.trim(params.term) === '') return data;

    // 2. ถ้าไม่มีข้อมูล text ให้ข้าม
    if (typeof data.text === 'undefined') return null;

    let term = params.term.toLowerCase();
    let text = data.text.toLowerCase();
    let aliases = data.element && $(data.element).data('search') ? $(data.element).data('search').toLowerCase() : "";

    // 3. ถ้าค้นหาเจอตรงๆ ในระดับนี้ ให้คืนค่ากลับไปเลย
    if (text.indexOf(term) > -1 || aliases.indexOf(term) > -1) {
        return data;
    }

    // 4. 🟢 สำคัญมาก: ถ้ามันเป็น <optgroup> (มีเมนูย่อยข้างใน) ต้องเจาะเข้าไปค้นหาในลูกๆ ด้วย!
    if (data.children && data.children.length > 0) {
        let match = $.extend(true, {}, data); // สร้างสำเนาของกลุ่ม
        let matchedChildren = [];

        // ลูปหาในเมนูย่อยแต่ละตัว
        for (let i = 0; i < data.children.length; i++) {
            let child = data.children[i];
            let childText = child.text.toLowerCase();
            let childAliases = child.element && $(child.element).data('search') ? $(child.element).data('search').toLowerCase() : "";

            // ถ้าลูกตัวไหนตรงกับที่พิมพ์หา ให้เก็บใส่ Array ไว้
            if (childText.indexOf(term) > -1 || childAliases.indexOf(term) > -1) {
                matchedChildren.push(child);
            }
        }

        // ถ้ามีลูกที่ค้นเจออย่างน้อย 1 ตัว ให้แสดงกลุ่มนี้พร้อมลูกที่ค้นเจอ
        if (matchedChildren.length > 0) {
            match.children = matchedChildren;
            return match;
        }
    }

    return null; // ถ้าไม่เจออะไรเลย ให้ซ่อนไป
}

function initSelect2() {
    $('#preset').select2({ matcher: customSearchMatcher });
    // 🟢 เพิ่ม #paperSize, #paperOrientation เข้าไปเพื่อให้ระบบแปลงเป็น UI สวยงาม
    $('#direction, #fillMode, #gridStyle, #gridLayout, #fontSelect, #textStyle, #paperSize, #paperOrientation').select2({ minimumResultsForSearch: -1 });
}

let confirmCallback1 = null;
let confirmCallback2 = null;

function showConfirmModal(title, text, btn1Text, btn1Class, btn1Callback, btn2Text, btn2Class, btn2Callback) {
    el('confirmModalTitle').innerText = title;
    el('confirmModalText').innerHTML = text;
    
    let buttonsHtml = '';
    if (btn1Text) {
        buttonsHtml += `<button class="btn ${btn1Class}" onclick="executeConfirm(1)">${btn1Text}</button>`;
        confirmCallback1 = btn1Callback;
    }
    if (btn2Text) {
        buttonsHtml += `<button class="btn ${btn2Class}" onclick="executeConfirm(2)">${btn2Text}</button>`;
        confirmCallback2 = btn2Callback;
    }
    
    el('confirmModalButtons').innerHTML = buttonsHtml;
    el('customConfirmModal').classList.add('show');
}
// --- วางต่อท้ายไฟล์ assets/js/ui.js ---

function executeConfirm(btnIndex) {
    closeConfirmModal(); // ปิดหน้าต่างยืนยันก่อน
    if (btnIndex === 1 && confirmCallback1) confirmCallback1();
    if (btnIndex === 2 && confirmCallback2) confirmCallback2();
}

function closeConfirmModal(e) {
    // ถ้าคลิกข้างนอกหน้าต่าง (Overlay) หรือกดปุ่มปิด ให้ซ่อน Modal
    if (e && e.target !== el('customConfirmModal')) return;
    el('customConfirmModal').classList.remove('show');
}

function showAlertModal(title, text, isSuccess = true) {
    el('alertModalTitle').innerText = title;
    el('alertModalText').innerText = text;
    el('alertIcon').innerText = isSuccess ? '✅' : '❌';
    el('customAlertModal').classList.add('show');
}

function closeAlertModal(e) {
    // ถ้าคลิกข้างนอกหน้าต่าง หรือกดปุ่ม OK ให้ซ่อน Modal แจ้งเตือน
    if (e && e.target !== el('customAlertModal')) return;
    el('customAlertModal').classList.remove('show');
}
// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('wptg_dark_mode', isDark);
}

// ตรวจสอบ Dark Mode ตอนโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('wptg_dark_mode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});
