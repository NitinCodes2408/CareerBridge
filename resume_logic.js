/**
 * resume_logic.js
 * Handles the interactive functionality for the Smart Resume Builder.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Accordion Logic ---
    const accordions = document.querySelectorAll('.form-accordion');
    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Toggle current
            acc.classList.toggle('active');
            const body = acc.querySelector('.accordion-body');
            if (acc.classList.contains('active')) {
                body.style.display = 'block';
            } else {
                body.style.display = 'none';
            }
        });
    });

    // --- 2. Dynamic Field Management (Add More) ---
    function attachRemoveEvent(btn) {
        btn.addEventListener('click', (e) => {
            const itemBox = e.target.closest('.form-group-box');
            if (itemBox) {
                itemBox.remove();
                updatePreview();
                saveToLocalStorage();
            }
        });
    }

    // Education
    const addEduBtn = document.getElementById('addEduBtn');
    const eduContainer = document.getElementById('educationContainer');
    if (addEduBtn && eduContainer) {
        addEduBtn.addEventListener('click', () => {
            const html = `
                <div class="edu-item form-group-box" style="margin-top: 1rem;">
                  <button type="button" class="remove-btn"><i class='bx bx-x'></i></button>
                  <div class="form-group full-width">
                    <label>Institution Name</label>
                    <input type="text" class="live-input form-control edu-inst" placeholder="e.g. IIT Bombay">
                  </div>
                  <div class="form-group">
                    <label>Degree</label>
                    <input type="text" class="live-input form-control edu-deg" placeholder="e.g. B.Tech">
                  </div>
                  <div class="form-group">
                    <label>Branch</label>
                    <input type="text" class="live-input form-control edu-branch" placeholder="e.g. Computer Science">
                  </div>
                  <div class="form-group">
                    <label>Year</label>
                    <input type="text" class="live-input form-control edu-year" placeholder="e.g. 2021 - 2025">
                  </div>
                  <div class="form-group">
                    <label>CGPA</label>
                    <input type="text" class="live-input form-control edu-cgpa" placeholder="e.g. 9.0">
                  </div>
                </div>
            `;
            eduContainer.insertAdjacentHTML('beforeend', html);
            const newItem = eduContainer.lastElementChild;
            attachRemoveEvent(newItem.querySelector('.remove-btn'));
            bindLiveInputs(newItem);
        });
    }

    // Experience
    const addExpBtn = document.getElementById('addExpBtn');
    const expContainer = document.getElementById('expContainer');
    if (addExpBtn && expContainer) {
        addExpBtn.addEventListener('click', () => {
            const html = `
                <div class="exp-item form-group-box" style="margin-top: 1rem;">
                  <button type="button" class="remove-btn"><i class='bx bx-x'></i></button>
                  <div class="form-group full-width">
                    <label>Company Name</label>
                    <input type="text" class="live-input form-control exp-company" placeholder="e.g. Google">
                  </div>
                  <div class="form-group">
                    <label>Role</label>
                    <input type="text" class="live-input form-control exp-role" placeholder="e.g. SDE Intern">
                  </div>
                  <div class="form-group">
                    <label>Duration</label>
                    <input type="text" class="live-input form-control exp-dur" placeholder="e.g. May 2024 - Aug 2024">
                  </div>
                  <div class="form-group full-width">
                    <label>Description (Use bullets '-' )</label>
                    <textarea class="live-input form-control exp-desc" rows="3" placeholder="- Optimized database queries..."></textarea>
                  </div>
                </div>
            `;
            expContainer.insertAdjacentHTML('beforeend', html);
            const newItem = expContainer.lastElementChild;
            attachRemoveEvent(newItem.querySelector('.remove-btn'));
            bindLiveInputs(newItem);
        });
    }

    // Projects
    const addProjBtn = document.getElementById('addProjBtn');
    const projContainer = document.getElementById('projectContainer');
    if (addProjBtn && projContainer) {
        addProjBtn.addEventListener('click', () => {
            const html = `
                <div class="proj-item form-group-box" style="margin-top: 1rem;">
                  <button type="button" class="remove-btn"><i class='bx bx-x'></i></button>
                  <div class="form-group full-width">
                    <label>Project Name</label>
                    <input type="text" class="live-input form-control proj-name" placeholder="e.g. E-Commerce Platform">
                  </div>
                  <div class="form-group full-width">
                    <label>Tech Stack</label>
                    <input type="text" class="live-input form-control proj-tech" placeholder="e.g. MERN, AWS">
                  </div>
                  <div class="form-group full-width">
                    <label>Description (Use bullets '-' )</label>
                    <textarea class="live-input form-control proj-desc" rows="3" placeholder="- Built a scalable platform..."></textarea>
                  </div>
                </div>
            `;
            projContainer.insertAdjacentHTML('beforeend', html);
            const newItem = projContainer.lastElementChild;
            attachRemoveEvent(newItem.querySelector('.remove-btn'));
            bindLiveInputs(newItem);
        });
    }

    // --- 3. Live Preview & Binding ---
    function bindLiveInputs(container = document) {
        const inputs = container.querySelectorAll('.live-input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                updatePreview();
                saveToLocalStorage();
            });
        });
    }
    
    // Initial binding
    bindLiveInputs();

    function updatePreview() {
        // Personal
        document.getElementById('prevName').textContent = document.getElementById('resName').value || 'Your Name';
        document.getElementById('prevRole').textContent = document.getElementById('resRole').value || 'Your Target Role';
        
        const pEmail = document.getElementById('pEmail');
        const pPhone = document.getElementById('pPhone');
        pEmail.textContent = document.getElementById('resEmail').value || '';
        pPhone.textContent = document.getElementById('resPhone').value || '';
        
        // Hide/Show Separator if both exist
        const separator = document.querySelector('.contact-info .separator');
        if (separator) {
            if (pEmail.textContent && pPhone.textContent) separator.style.display = 'inline';
            else separator.style.display = 'none';
        }

        const lnk = document.getElementById('resLinkedin').value;
        const gh = document.getElementById('resGithub').value;
        const pLinkedin = document.getElementById('pLinkedin');
        const pGithub = document.getElementById('pGithub');
        
        if(lnk) { pLinkedin.innerHTML = `<i class='bx bxl-linkedin-square'></i> ${lnk}`; pLinkedin.style.display = 'inline-flex'; pLinkedin.style.alignItems = 'center'; pLinkedin.style.gap = '4px';} else { pLinkedin.style.display = 'none'; }
        if(gh) { pGithub.innerHTML = `<i class='bx bxl-github'></i> ${gh}`; pGithub.style.display = 'inline-flex'; pGithub.style.alignItems = 'center'; pGithub.style.gap = '4px';} else { pGithub.style.display = 'none'; }

        // Education
        const prevEduList = document.getElementById('prevEduList');
        prevEduList.innerHTML = '';
        const edus = document.querySelectorAll('.edu-item');
        let hasEdu = false;
        edus.forEach(edu => {
            const inst = edu.querySelector('.edu-inst').value;
            const deg = edu.querySelector('.edu-deg').value;
            const branch = edu.querySelector('.edu-branch').value;
            const year = edu.querySelector('.edu-year').value;
            const cgpa = edu.querySelector('.edu-cgpa').value;
            
            if (inst || deg) {
                hasEdu = true;
                prevEduList.innerHTML += `
                    <div class="res-item-box">
                        <div class="res-item-header">
                            <span class="res-item-title">${inst}</span>
                            <span class="res-item-date">${year}</span>
                        </div>
                        <div class="res-item-subtitle">${deg} ${branch ? 'in ' + branch : ''}</div>
                        ${cgpa ? `<div class="res-item-desc" style="font-size: 0.85rem;">CGPA: ${cgpa}</div>` : ''}
                    </div>
                `;
            }
        });
        document.getElementById('secEdu').style.display = hasEdu ? 'block' : 'none';

        // Skills
        const lang = document.getElementById('resSkillsLang').value;
        const tools = document.getElementById('resSkillsTools').value;
        const pLang = document.getElementById('prevLang');
        const pTools = document.getElementById('prevTools');
        const cLang = document.getElementById('catLang');
        const cTools = document.getElementById('catTools');
        
        if (lang) { pLang.textContent = lang; cLang.style.display = 'block'; } else { cLang.style.display = 'none'; }
        if (tools) { pTools.textContent = tools; cTools.style.display = 'block'; } else { cTools.style.display = 'none'; }
        document.getElementById('secSkills').style.display = (lang || tools) ? 'block' : 'none';

        // Experience
        const prevExpList = document.getElementById('prevExpList');
        prevExpList.innerHTML = '';
        const exps = document.querySelectorAll('.exp-item');
        let hasExp = false;
        exps.forEach(exp => {
            const comp = exp.querySelector('.exp-company').value;
            const role = exp.querySelector('.exp-role').value;
            const dur = exp.querySelector('.exp-dur').value;
            const desc = exp.querySelector('.exp-desc').value;
            
            if (comp || role) {
                hasExp = true;
                let listHtml = '';
                if (desc) {
                    const items = desc.split('\n').filter(i => i.trim());
                    listHtml = '<ul>' + items.map(i => `<li>${i.replace(/^-/,'').trim()}</li>`).join('') + '</ul>';
                }
                
                prevExpList.innerHTML += `
                    <div class="res-item-box">
                        <div class="res-item-header">
                            <span class="res-item-title">${comp}</span>
                            <span class="res-item-date">${dur}</span>
                        </div>
                        <div class="res-item-subtitle">${role}</div>
                        <div class="res-item-desc">${listHtml}</div>
                    </div>
                `;
            }
        });
        document.getElementById('secExp').style.display = hasExp ? 'block' : 'none';

        // Projects
        const prevProjList = document.getElementById('prevProjList');
        prevProjList.innerHTML = '';
        const projs = document.querySelectorAll('.proj-item');
        let hasProj = false;
        projs.forEach(proj => {
            const name = proj.querySelector('.proj-name').value;
            const tech = proj.querySelector('.proj-tech').value;
            const desc = proj.querySelector('.proj-desc').value;
            
            if (name) {
                hasProj = true;
                let listHtml = '';
                if (desc) {
                    const items = desc.split('\n').filter(i => i.trim());
                    listHtml = '<ul>' + items.map(i => `<li>${i.replace(/^-/,'').trim()}</li>`).join('') + '</ul>';
                }
                
                prevProjList.innerHTML += `
                    <div class="res-item-box">
                        <div class="res-item-header">
                            <span class="res-item-title">${name} ${tech ? `| <span style="font-weight:400; font-size:0.85rem;">${tech}</span>` : ''}</span>
                        </div>
                        <div class="res-item-desc">${listHtml}</div>
                    </div>
                `;
            }
        });
        document.getElementById('secProj').style.display = hasProj ? 'block' : 'none';

        calculateATS();
    }

    // --- 4. ATS Score & Completion Tracker ---
    function calculateATS() {
        let score = 0;
        let fieldsFilled = 0;
        let totalFields = 8; // Core fields benchmark
        let suggestions = [];

        // Check fields
        if (document.getElementById('resName').value) { fieldsFilled++; score += 5; }
        if (document.getElementById('resEmail').value) { fieldsFilled++; score += 5; }
        if (document.getElementById('resPhone').value) { fieldsFilled++; score += 5; }
        
        if (document.getElementById('resLinkedin').value) { fieldsFilled++; score += 10; }
        else suggestions.push('Add LinkedIn profile to boost credibility.');

        if (document.getElementById('resGithub').value) { fieldsFilled++; score += 10; }
        else suggestions.push('Adding a GitHub profile highlights your technical work.');

        // Sections Check
        if (document.getElementById('resSkillsLang').value.length > 5) { fieldsFilled++; score += 15; }
        else suggestions.push('Add more technical skills and languages.');

        const hasEdu = document.querySelector('.edu-inst').value.length > 2;
        if (hasEdu) { fieldsFilled++; score += 15; }
        else suggestions.push('Education details are completely missing.');

        const hasExp = document.querySelector('.exp-company').value.length > 2;
        const hasProj = document.querySelector('.proj-name').value.length > 2;
        
        if (hasExp) { fieldsFilled++; score += 20; }
        if (hasProj) { fieldsFilled++; score += 15; }

        if (!hasExp && !hasProj) suggestions.push('Add Projects or Experience to pass ATS parsers.');

        // Cap score
        if (score > 100) score = 100;
        
        // Update UI
        const atsMeter = document.getElementById('atsMeter');
        const atsText = document.getElementById('atsScoreText');
        const atsSug = document.getElementById('atsSuggestion');
        
        atsMeter.style.setProperty('--progress', score);
        atsText.textContent = `${score}%`;

        if (score > 80) {
            atsMeter.style.background = `conic-gradient(#10B981 calc(var(--progress) * 1%), rgba(255,255,255,0.1) 0deg)`;
            atsText.style.color = '#10B981';
            atsSug.innerHTML = `<i class='bx bx-check-circle text-success'></i> Your resume is highly ATS optimized!`;
            atsSug.style.color = '#10B981';
        } else if (score > 50) {
            atsMeter.style.background = `conic-gradient(#F59E0B calc(var(--progress) * 1%), rgba(255,255,255,0.1) 0deg)`;
            atsText.style.color = '#F59E0B';
            atsSug.innerHTML = `<i class='bx bx-bulb'></i> ${suggestions[0] || 'Keep adding more details.'}`;
            atsSug.style.color = '#F59E0B';
        } else {
            atsMeter.style.background = `conic-gradient(#EF4444 calc(var(--progress) * 1%), rgba(255,255,255,0.1) 0deg)`;
            atsText.style.color = '#EF4444';
            atsSug.innerHTML = `<i class='bx bx-error-circle'></i> ${suggestions[0] || 'Your resume lacks critical information.'}`;
            atsSug.style.color = '#EF4444';
        }

        // Completion bar
        let completionPercent = Math.min(100, Math.floor((fieldsFilled / totalFields) * 100));
        document.getElementById('completionBar').style.width = `${completionPercent}%`;
        document.getElementById('completionText').textContent = `${completionPercent}%`;
    }

    // --- 5. Template Switcher ---
    const templateSelect = document.getElementById('templateSelect');
    const resumePreview = document.getElementById('resumePreview');
    
    if (templateSelect && resumePreview) {
        templateSelect.addEventListener('change', (e) => {
            const theme = e.target.value;
            // Remove existing themes
            resumePreview.classList.remove('theme-modern', 'theme-minimal', 'theme-corporate');
            // Add new
            resumePreview.classList.add(`theme-${theme}`);
        });
    }

    // --- 6. Export PDF ---
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // --- 7. Local Storage (Simple Auto Save/Load) ---
    function saveToLocalStorage() {
        const formData = {};
        document.querySelectorAll('.live-input').forEach(input => {
            // Give inputs an ID if they don't have one, or just save by index/class for complex ones
            // For simplicity, we just save single fields here. Array fields require more complex serialization.
            if(input.id) {
                formData[input.id] = input.value;
            }
        });
        localStorage.setItem('careerBridgeResume', JSON.stringify(formData));
    }

    function loadFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem('careerBridgeResume'));
        if (data) {
            for (const key in data) {
                const el = document.getElementById(key);
                if (el) el.value = data[key];
            }
            updatePreview();
        }
    }

    // Load initial data
    loadFromLocalStorage();

    // To prevent default form submission
    const form = document.getElementById('resumeForm');
    if(form) {
        form.addEventListener('submit', (e) => e.preventDefault());
    }

});
