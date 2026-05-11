// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const role = document.querySelector('input[name="role"]:checked').value;
            
            // Simple mock redirect
            const btn = loginForm.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Authenticating...';
            
            // Extract name from "database" or fallback to email
            const email = document.getElementById('email').value.trim().toLowerCase();
            let users = JSON.parse(localStorage.getItem('careerBridgeUsers')) || {};
            let displayName = users[email];
            
            if (!displayName) {
                let namePart = email.split('@')[0];
                namePart = namePart.replace(/[0-9]/g, ''); // Remove numbers
                namePart = namePart.replace(/[._]/g, ' ').trim();
                displayName = namePart.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'User';
            }
            localStorage.setItem('careerBridgeUser', displayName);
            
            setTimeout(() => {
                if (role === 'student') {
                    window.location.href = 'dashboard-home.html';
                } else {
                    window.location.href = 'employee-dashboard.html';
                }
            }, 1000);
        });
    }

    // Signup Form Handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const pwd = document.getElementById('password').value;
            const confirmPwd = document.getElementById('confirmPassword').value;
            
            if (pwd !== confirmPwd) {
                alert("Passwords do not match!");
                return;
            }
            
            const btn = signupForm.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Creating Account...';
            
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim().toLowerCase();
            
            let users = JSON.parse(localStorage.getItem('careerBridgeUsers')) || {};
            users[email] = fullName;
            localStorage.setItem('careerBridgeUsers', JSON.stringify(users));
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        });
    }

    // Load User Profile Data
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userAvatar = document.getElementById('userAvatar');
    const welcomeName = document.getElementById('welcomeName');
    const profilePageAvatar = document.getElementById('profilePageAvatar');
    const profName = document.getElementById('profName');
    const welcomeAvatar = document.getElementById('welcomeAvatar');
    const profileHeadlineDisplay = document.getElementById('profileHeadlineDisplay');
    const profHeadline = document.getElementById('profHeadline');
    const profileNameDisplay = document.getElementById('profileNameDisplay');

    let storedName = localStorage.getItem('careerBridgeUser') || 'Student User';
    let storedHeadline = localStorage.getItem('careerBridgeHeadline') || 'Aspiring Software Developer';
    
    // Clean up name by removing numbers (fixes existing sessions)
    storedName = storedName.replace(/[0-9]/g, '').trim() || 'Student User';
    
    function updateAllNameDisplays(name, headline) {
        if (userNameDisplay) userNameDisplay.textContent = name;
        if (welcomeName) welcomeName.textContent = name.split(' ')[0];
        if (profName) profName.value = name;
        if (profileNameDisplay) profileNameDisplay.textContent = name;
        
        if (headline) {
            if (profileHeadlineDisplay) profileHeadlineDisplay.innerHTML = `<i class='bx bx-code-alt'></i> ${headline}`;
            if (profHeadline) profHeadline.value = headline;
            localStorage.setItem('careerBridgeHeadline', headline);
        }
        
        const customAvatar = localStorage.getItem('careerBridgeAvatar');
        const defaultAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366F1&color=fff`;
        const avatarUrl = customAvatar ? customAvatar : defaultAvatarUrl;
        
        if (userAvatar) userAvatar.src = avatarUrl;
        if (profilePageAvatar) profilePageAvatar.src = customAvatar ? customAvatar : `${defaultAvatarUrl}&size=120`;
        if (welcomeAvatar) welcomeAvatar.src = customAvatar ? customAvatar : `${defaultAvatarUrl}&size=80`;
    }

    // Initial load
    updateAllNameDisplays(storedName, storedHeadline);

    // Profile Save Logic
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    if (saveProfileBtn && profName) {
        saveProfileBtn.addEventListener('click', () => {
            const newName = profName.value.trim() || 'Student User';
            const newHeadline = profHeadline ? profHeadline.value.trim() : '';
            
            localStorage.setItem('careerBridgeUser', newName);
            if (newHeadline) localStorage.setItem('careerBridgeHeadline', newHeadline);
            
            updateAllNameDisplays(newName, newHeadline);
            
            // Show feedback
            const originalText = saveProfileBtn.innerHTML;
            saveProfileBtn.innerHTML = '<i class="bx bx-check"></i> Saved!';
            saveProfileBtn.style.backgroundColor = '#10B981';
            saveProfileBtn.style.borderColor = '#10B981';
            
            setTimeout(() => {
                saveProfileBtn.innerHTML = originalText;
                saveProfileBtn.style.backgroundColor = '';
                saveProfileBtn.style.borderColor = '';
            }, 2000);
        });
    }

    // 4. Global Avatar Upload & Sync Logic
    const initGlobalAvatarUpload = () => {
        const topAvatar = document.getElementById('userAvatar');
        if (!topAvatar) return;

        topAvatar.style.cursor = 'pointer';
        topAvatar.setAttribute('title', 'Click to change profile picture');

        // Check for existing global input or create one
        let globalInput = document.getElementById('globalAvatarUploadInput');
        if (!globalInput) {
            globalInput = document.createElement('input');
            globalInput.type = 'file';
            globalInput.id = 'globalAvatarUploadInput';
            globalInput.accept = 'image/*';
            globalInput.style.display = 'none';
            document.body.appendChild(globalInput);
        }

        const triggerUpload = (e) => {
            if (e.target.closest('.dropdown-menu-custom')) return; // Don't trigger if clicking menu links
            globalInput.click();
        };

        topAvatar.addEventListener('click', triggerUpload);

        globalInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target.result;
                    localStorage.setItem('careerBridgeAvatar', dataUrl);
                    
                    // Update all images on the page
                    const allAvatars = document.querySelectorAll('#userAvatar, #profilePageAvatar, #welcomeAvatar');
                    allAvatars.forEach(img => {
                        img.src = dataUrl;
                    });
                    
                    console.log('Global avatar updated');
                };
                reader.readAsDataURL(file);
            }
        });
    };

    initGlobalAvatarUpload();

    // 5. Sidebar Toggle (Mobile)
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
        });
    }

    // Close sidebar on overlay click
    if (sidebarOverlay && sidebar) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }

    // Resume Builder Preview Update
    const resumeForm = document.getElementById('resumeForm');
    if (resumeForm) {
        resumeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('resName').value;
            const role = document.getElementById('resRole').value;
            const education = document.getElementById('resEducation').value;
            const skills = document.getElementById('resSkills').value;
            const exp = document.getElementById('resExp').value;
            
            if(document.getElementById('prevName')) document.getElementById('prevName').textContent = name;
            if(document.getElementById('prevRole')) document.getElementById('prevRole').textContent = role;
            if(document.getElementById('prevEdu')) document.getElementById('prevEdu').textContent = education;
            if(document.getElementById('prevExpText')) document.getElementById('prevExpText').textContent = exp || "No experience provided.";
            
            const skillsContainer = document.getElementById('prevSkillsContainer');
            if(skillsContainer) {
                skillsContainer.innerHTML = '';
                skills.split(',').forEach(skill => {
                    if(skill.trim()) {
                        const span = document.createElement('span');
                        span.textContent = skill.trim();
                        skillsContainer.appendChild(span);
                    }
                });
            }
        });
    }

    // Learning Domain Filtering
    const catPills = document.querySelectorAll('.learning-categories .cat-pill');
    const domainSections = document.querySelectorAll('.domain-section');

    if (catPills.length > 0 && domainSections.length > 0) {
        catPills.forEach(pill => {
            pill.addEventListener('click', () => {
                catPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                const filter = pill.getAttribute('data-filter');

                domainSections.forEach(section => {
                    // Slight animation reset
                    section.style.opacity = '0';
                    setTimeout(() => {
                        if (filter === 'all' || section.getAttribute('data-domain') === filter) {
                            section.style.display = 'block';
                            setTimeout(() => section.style.opacity = '1', 50);
                        } else {
                            section.style.display = 'none';
                        }
                    }, 150);
                });
            });
        });
    }

    // Modal Logic
    const contentModal = document.getElementById('contentModal');
    const modalTitle = document.getElementById('modalTitle');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const courseBtns = document.querySelectorAll('.course-btn');
    
    if (contentModal && closeModalBtn) {
        courseBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modalTitle.textContent = btn.getAttribute('data-title') || 'Course Content';
                contentModal.classList.add('active');
            });
        });

        closeModalBtn.addEventListener('click', () => {
            contentModal.classList.remove('active');
        });

        contentModal.addEventListener('click', (e) => {
            if (e.target === contentModal) {
                contentModal.classList.remove('active');
            }
        });
    }

    // Print/Download PDF Logic
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Apply Now Button Logic
    const applyBtns = document.querySelectorAll('.apply-btn');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (btn.classList.contains('applied')) return;
            
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i>';
            btn.style.pointerEvents = 'none';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="bx bx-check"></i> Applied';
                btn.classList.add('applied');
                btn.classList.remove('btn-outline');
                btn.classList.add('btn-primary');
                btn.style.backgroundColor = '#10B981';
                btn.style.borderColor = '#10B981';
                btn.style.pointerEvents = 'auto';
            }, 1000);
        });
    });

    // Advanced Quiz Logic
    const quizQuestions = [
        { q: "Q1. A train running at 72 km/hr crosses a pole in 15 seconds. What is the length of the train?", options: ["200m", "250m", "300m"], correct: 2 },
        { q: "Q2. If A is the brother of B, and B is the sister of C, how is A related to C?", options: ["Brother", "Cousin", "Uncle"], correct: 0 },
        { q: "Q3. What is the next number in the series? 2, 6, 12, 20, ?", options: ["24", "30", "36"], correct: 1 },
        { q: "Q4. A shopkeeper sells an article at 10% loss. If he had sold it for Rs 50 more, he would have gained 10%. What is the cost price?", options: ["Rs 250", "Rs 300", "Rs 200"], correct: 0 },
        { q: "Q5. Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?", options: ["His own", "His son's", "His father's"], correct: 1 }
    ];
    let currentQuizIndex = 0;
    let score = 0;
    
    const quizQuestionText = document.getElementById('quizQuestionText');
    const quizOptionsContainer = document.getElementById('quizOptionsContainer');
    const quizSubmitBtn = document.getElementById('quizSubmitBtn');
    const quizPrevBtn = document.getElementById('quizPrevBtn');
    const qCurrent = document.getElementById('qCurrent');
    const quizForm = document.getElementById('quizForm');
    const quizResultCard = document.getElementById('quizResult');
    const finalScoreDisplay = document.getElementById('finalScore');
    const quizTimerDisplay = document.getElementById('quizTimerDisplay');
    
    let timerInterval;
    let timeLeft = 900; // 15 mins
    let userAnswers = new Array(quizQuestions.length).fill(null);
    
    function updateTimer() {
        if(!quizTimerDisplay) return;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        quizTimerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        } else {
            timeLeft--;
        }
    }
    
    if(quizTimerDisplay) {
        timerInterval = setInterval(updateTimer, 1000);
    }
    
    function loadQuizQuestion(index) {
        if (!quizQuestionText) return;
        const qData = quizQuestions[index];
        quizQuestionText.textContent = qData.q;
        if(qCurrent) qCurrent.textContent = index + 1;
        quizOptionsContainer.innerHTML = '';
        
        qData.options.forEach((optText, i) => {
            const optDiv = document.createElement('div');
            optDiv.className = 'quiz-option';
            optDiv.textContent = optText;
            
            if (userAnswers[index] === i) {
                optDiv.classList.add('selected');
            }
            
            optDiv.addEventListener('click', function() {
                const siblings = quizOptionsContainer.querySelectorAll('.quiz-option');
                siblings.forEach(s => s.classList.remove('selected'));
                this.classList.add('selected');
                userAnswers[index] = i;
            });
            
            quizOptionsContainer.appendChild(optDiv);
        });
        
        if(quizPrevBtn) quizPrevBtn.disabled = index === 0;
        if(quizSubmitBtn) quizSubmitBtn.textContent = index === quizQuestions.length - 1 ? "Submit Test" : "Next Question";
    }

    if (quizQuestionText) {
        loadQuizQuestion(currentQuizIndex);
    }
    
    if (quizPrevBtn) {
        quizPrevBtn.addEventListener('click', () => {
            if (currentQuizIndex > 0) {
                currentQuizIndex--;
                loadQuizQuestion(currentQuizIndex);
            }
        });
    }

    if (quizForm && quizResultCard) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (currentQuizIndex < quizQuestions.length - 1) {
                currentQuizIndex++;
                loadQuizQuestion(currentQuizIndex);
            } else {
                finishQuiz();
            }
        });
    }
    
    function finishQuiz() {
        clearInterval(timerInterval);
        score = userAnswers.reduce((total, answer, index) => {
            return total + (answer === quizQuestions[index].correct ? 1 : 0);
        }, 0);
        
        if(quizForm) quizForm.style.display = 'none';
        if(quizResultCard) quizResultCard.style.display = 'block';
        if(finalScoreDisplay) finalScoreDisplay.textContent = `${score}/${quizQuestions.length}`;
        const timerEl = document.querySelector('.quiz-timer');
        if(timerEl) timerEl.style.display = 'none';
    }

    // Query Submission & Recent List
    const recentQueriesList = document.getElementById('recentQueriesList');
    const queryForm = document.getElementById('queryForm');
    if (queryForm) {
        queryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = queryForm.querySelector('button[type="submit"]');
            const subjectInput = document.getElementById('querySubject');
            const originalText = btn.textContent;
            
            btn.innerHTML = '<i class="bx bx-check"></i> Submitted';
            btn.style.backgroundColor = '#10B981';
            btn.style.borderColor = '#10B981';
            
            if (recentQueriesList) {
                const queryTitle = subjectInput.value;
                const newQueryDiv = document.createElement('div');
                newQueryDiv.className = 'query-item fade-in-up';
                newQueryDiv.innerHTML = `
                    <span style="color: var(--text-dark); font-weight: 500;">${queryTitle}</span>
                    <span class="query-status">Pending Reply</span>
                `;
                recentQueriesList.appendChild(newQueryDiv);
            }
            
            queryForm.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
            }, 2500);
        });
    }

    // Initialize Learning Growth Chart
    const chartCanvas = document.getElementById('learningGrowthChart');
    if (chartCanvas && typeof Chart !== 'undefined') {
        const ctx = chartCanvas.getContext('2d');
        
        // Create a beautiful gradient for the line
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)'); // Indigo
        gradient.addColorStop(1, 'rgba(217, 70, 239, 0.0)'); // Fuchsia fade

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
                datasets: [{
                    label: 'Hours Studied',
                    data: [5, 12, 18, 15, 25, 32, 40],
                    borderColor: '#6366F1',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    pointBackgroundColor: '#D946EF',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    fill: true,
                    tension: 0.4 // Smooth curves
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#94A3B8',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false,
                        },
                        ticks: {
                            color: '#94A3B8'
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            color: '#94A3B8'
                        }
                    }
                }
            }
        });
    }

    // Initialize Application Progress Chart
    const appChartCanvas = document.getElementById('applicationProgressChart');
    if (appChartCanvas && typeof Chart !== 'undefined') {
        const ctx = appChartCanvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Applied', 'Under Review', 'Interview', 'Selected', 'Rejected'],
                datasets: [{
                    data: [15, 8, 4, 1, 3],
                    backgroundColor: [
                        '#94A3B8', // Applied - Gray
                        '#6366F1', // Under Review - Indigo
                        '#F59E0B', // Interview - Amber
                        '#10B981', // Selected - Emerald
                        '#EF4444'  // Rejected - Red
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#94A3B8',
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: {
                                size: 12,
                                family: "'Inter', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        padding: 12,
                    }
                }
            }
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Optional: only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.zoom-in, .fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });
});
