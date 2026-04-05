// assets/js/main.js

let typingTimer; // ตัวแปรสำหรับ Debounce

$(document).ready(function() {
    initSelect2();
    renderDonateInfo(); 
    updatePresetDropdown();
    
    // โหลดการตั้งค่าเดิม (ถ้ามี)
    loadSettings();
    el('gridThickness').addEventListener('input', (e) => {
        el('weightVal').innerText = parseFloat(e.target.value).toFixed(1);
        debouncedUpdate();
    });

    // ผูก Event ให้สไลเดอร์ Opacity
    el('textOpacity').addEventListener('input', (e) => {
        el('opacityVal').innerText = e.target.value;
        debouncedUpdate();
    });

    // 🟢 แก้ไข: ใช้ .on('select2:select') เพื่อดักจับการเปลี่ยนกระดาษให้ตอบสนองทันที
    $('#paperSize, #paperOrientation').on('select2:select', function() {
        autoAdjustRows(true); // ให้คำนวณแถวใหม่ตามขนาดกระดาษ
        debouncedUpdate();
    });
    
    // โหมดสลับบรรทัดต้องคำนวณแถวใหม่เสมอ
    el('altRows').addEventListener('change', function() {
        autoAdjustRows(true);
        debouncedUpdate();
    });

    $('#preset').on('select2:select', function (e) {
        const val = e.params.data.id;

        if (val.startsWith('user_')) {
            el('btnDeletePreset').style.display = 'block'; // แสดงปุ่มลบ
            const idx = parseInt(val.split('_')[1], 10); // Extract the numeric ID from the value
            const presets = JSON.parse(localStorage.getItem('wptg_user_presets')) || []; // Ensure presets is an array
            const p = presets[idx]; // Safely access the preset by index

            if (p) {
                el('textInput').value = p.text || '';
                el('customReadingInput').value = p.read || '';
                el('customMeaningInput').value = p.mean || '';
            } else {
                console.error(`Preset not found for index: ${idx}`);
                el('textInput').value = '';
                el('customReadingInput').value = '';
                el('customMeaningInput').value = '';
            }
            autoAdjustRows(true);
        } else if (val !== 'custom') { 
            el('btnDeletePreset').style.display = 'none'; // ซ่อนปุ่มลบ
            const txt = presets[val];
            el('textInput').value = txt; 
            el('customReadingInput').value = txt.split(',').map(c => readingMap[c] || '').join(',');
            el('customMeaningInput').value = txt.split(',').map(c => (meaningMap[c] && meaningMap[c][currentLang]) || '').join(',');
            autoAdjustRows(true); 
        } else { 
            el('btnDeletePreset').style.display = 'none'; // ซ่อนปุ่มลบ
            el('textInput').value = ''; 
            el('customReadingInput').value = '';
            el('customMeaningInput').value = '';
        }
        
        debouncedUpdate();
    });
    
    $('#direction, #fillMode').on('select2:select', function () {
        autoAdjustRows(true);
        toggleRepeatRow(); debouncedUpdate();
    });
    
    $('#gridStyle, #gridLayout, #fontSelect, #textStyle').on('select2:select', debouncedUpdate);
    
    ['textInput', 'customReadingInput', 'customMeaningInput', 'cols', 'rows', 'gridColor', 'headerTitle', 'headerName', 'headerClass'].forEach(id => {
        el(id).addEventListener('input', () => {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(debouncedUpdate, 300);
        });
    });
    
    ['showRuby', 'autoRead', 'showMeaning', 'repeatRowHoriz', 'repeatRowVert'].forEach(id => {
        el(id).addEventListener('change', debouncedUpdate);
    });

    $(window).on('resize', scalePaper);
    
    $('.sidebar-section-title').each(function() {
        if ($(this).find('.toggle-icon').length === 0) {
            $(this).append('<span class="toggle-icon">▼</span>');
        }
    });

    $(document).off('click', '.sidebar-section-title').on('click', '.sidebar-section-title', function() {
        $(this).parent('.sidebar-section').toggleClass('collapsed');
    });

    update();
});

function debouncedUpdate() {
    update();
    saveSettings();
}

function resetForm() {
    localStorage.removeItem('wptg_settings_v2'); 
    el('preset').value = 'custom'; el('textInput').value = ''; 
    el('customReadingInput').value = ''; el('customMeaningInput').value = '';
    el('headerTitle').value = ''; el('headerName').value = ''; el('headerClass').value = '';
    el('cols').value = 10; el('rows').value = 10; 
    el('direction').value = 'horiz'; el('fillMode').value = 'all'; 
    el('gridLayout').value = 'spaced'; el('gridStyle').value = 'square'; 
    el('fontSelect').value = "'Sarabun', sans-serif";
    el('textStyle').value = "light";
    el('gridColor').value = '#888888'; 
    el('showRuby').checked = true; el('autoRead').checked = true; el('showMeaning').checked = false;
    el('repeatRowHoriz').checked = false; el('repeatRowVert').checked = false;
    el('altRows').checked = false;
    el('paperSize').value = 'a4'; el('paperOrientation').value = 'p';
    el('textOpacity').value = 50; el('opacityVal').innerText = "50";
    
    manualZoom = 1.0; lastCalculatedRpp = 0;
    $('.select-ui').trigger('change'); toggleRepeatRow(); debouncedUpdate();
}

// --- ระบบจัดการหน้าต่าง Save Preset (Modal) ---
function openSavePresetModal() {
    el('presetNameInput').value = '';
    el('savePresetModal').classList.add('show');
    setTimeout(() => el('presetNameInput').focus(), 100);
}

function closeSavePresetModal(e) {
    if (e && e.target !== el('savePresetModal')) return; 
    el('savePresetModal').classList.remove('show');
}

function confirmSavePreset() {
    const name = el('presetNameInput').value.trim();
    if (!name) {
        alert(currentLang === 'th' ? "กรุณาตั้งชื่อชุดคำศัพท์" : "Please enter a preset name.");
        return;
    }
    
    const newPreset = {
        name: name,
        text: el('textInput').value,
        read: el('customReadingInput').value,
        mean: el('customMeaningInput').value
    };
    
    let saved = JSON.parse(localStorage.getItem('wptg_user_presets') || "[]");
    saved.push(newPreset);
    localStorage.setItem('wptg_user_presets', JSON.stringify(saved));
    
    updatePresetDropdown();
    closeSavePresetModal();
    
    // เลือกชุดคำศัพท์ที่เพิ่งเซฟให้อัตโนมัติ และแสดงปุ่มลบ
    const newIdx = saved.length - 1;
    $('#preset').val(`user_${newIdx}`).trigger('change.select2');
    el('btnDeletePreset').style.display = 'block';

    const toast = el('copyToast');
    toast.innerText = currentLang === 'th' ? `✅ บันทึก "${name}" สำเร็จ!` : `✅ Saved "${name}" successfully!`;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2500);
}

// --- ระบบลบชุดคำศัพท์ (Delete) ---
function deleteCustomPreset() {
    const val = el('preset').value;
    if (!val || !val.startsWith('user_')) return;

    // Show confirmation modal before deleting
    const confirmTitle = currentLang === 'th' ? "ยืนยันการลบ" : "Confirm Deletion";
    const confirmMessage = currentLang === 'th' ? "คุณแน่ใจหรือไม่ที่จะลบชุดคำศัพท์นี้?" : "Are you sure you want to delete this preset?";

    showConfirmModal(
        confirmTitle,
        confirmMessage,
        currentLang === 'th' ? "ยกเลิก" : "Cancel",
        "btn-secondary",
        null, // No action for cancel
        currentLang === 'th' ? "ลบ" : "Delete",
        "btn-danger",
        () => { // Action for confirm delete
            const idx = parseInt(val.split('_')[1], 10); // Correctly extract the numeric index
            let saved = JSON.parse(localStorage.getItem('wptg_user_presets') || "[]");

            if (!isNaN(idx) && idx >= 0 && idx < saved.length) {
                saved.splice(idx, 1); // Remove the preset from the array
                localStorage.setItem('wptg_user_presets', JSON.stringify(saved)); // Save the updated array

                updatePresetDropdown(); // Refresh the dropdown

                // Reset the form to default values
                el('preset').value = 'custom';
                $('#preset').trigger('change.select2');
                el('btnDeletePreset').style.display = 'none';
                el('textInput').value = '';
                el('customReadingInput').value = '';
                el('customMeaningInput').value = '';
                debouncedUpdate();

                // Show feedback to the user
                const toast = el('copyToast');
                toast.innerText = currentLang === 'th' ? "✅ ลบชุดคำศัพท์สำเร็จ!" : "✅ Preset deleted successfully!";
                toast.classList.add('show');
                setTimeout(() => { toast.classList.remove('show'); }, 2500);
            } else {
                console.error(`Invalid preset index: ${idx}`);
            }
        }
    );
}
function updatePresetDropdown() {
    // 🟢 แก้ไขบั๊ก: ต้องลบแท็ก optgroup ของเดิมทิ้งก่อนเสมอ
    $('#preset optgroup[data-user="true"]').remove();
    
    const saved = JSON.parse(localStorage.getItem('wptg_user_presets') || "[]");
    
    // ถ้าไม่มีข้อมูลแล้ว ให้หยุดแค่นี้ (ตัวเลือกผีจะหายไป)
    if (saved.length === 0) return;

    const groupLabel = typeof translations !== 'undefined' ? translations[currentLang].savedGroup : '⭐ ชุดคำที่บันทึกไว้';
    const group = $('<optgroup label="' + groupLabel + '" data-user="true"></optgroup>');
    saved.forEach((p, idx) => {
        group.append(`<option value="user_${idx}">${p.name}</option>`);
    });
    $('#preset').append(group);
}

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

// ฟังก์ชันเรียกใช้ตัวเลือกไฟล์
function triggerImport() { el('importFile').click(); }

// ฟังก์ชันนำเข้า (Import)
// ฟังก์ชันนำเข้า (Import) แบบใช้ Custom Modal
function importUserPresets(event) {
    const file = event.target.files[0]; // Access the first file
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (!Array.isArray(importedData)) throw new Error("Invalid format");

            const confirmMsg = currentLang === 'th' 
                ? "คุณต้องการเพิ่มข้อมูลเข้าไป (Append) หรือลบของเดิมแล้วทับ (Replace)?" 
                : "Do you want to Add (Append) or Overwrite (Replace) existing presets?";
            
            let currentData = JSON.parse(localStorage.getItem('wptg_user_presets') || "[]");

            showConfirmModal(
                currentLang === 'th' ? "ยืนยันการนำเข้า" : "Confirm Import",
                confirmMsg,
                currentLang === 'th' ? "เขียนทับ" : "Overwrite",
                "btn-danger",
                () => { // Overwrite
                    localStorage.setItem('wptg_user_presets', JSON.stringify(importedData));
                    finishImport();
                },
                currentLang === 'th' ? "เพิ่มต่อท้าย" : "Append",
                "btn-primary",
                () => { // Append
                    localStorage.setItem('wptg_user_presets', JSON.stringify([...currentData, ...importedData]));
                    finishImport();
                }
            );

            function finishImport() {
                updatePresetDropdown();
                showAlertModal(
                    currentLang === 'th' ? "นำเข้าสำเร็จ" : "Import Successful", 
                    currentLang === 'th' ? "นำเข้าชุดคำศัพท์เรียบร้อยแล้ว!" : "Presets imported successfully!", 
                    true
                );
            }
        } catch (err) {
            showAlertModal(
                currentLang === 'th' ? "ข้อผิดพลาด" : "Error", 
                currentLang === 'th' ? "ไฟล์ไม่ถูกต้อง หรือข้อมูลเกิดความเสียหาย" : "Invalid file format.", 
                false
            );
        }
    };
    reader.readAsText(file); // Pass the file directly
    event.target.value = ""; // Reset input
}
