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
            const email = document.getElementById('email').value;
            let users = JSON.parse(localStorage.getItem('careerBridgeUsers')) || {};
            let displayName = users[email];
            
            if (!displayName) {
                const namePart = email.split('@')[0];
                displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
            }
            localStorage.setItem('careerBridgeUser', displayName);
            
            setTimeout(() => {
                if (role === 'student') {
                    window.location.href = 'dashboard.html';
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
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            
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
    if (userNameDisplay) {
        const storedName = localStorage.getItem('careerBridgeUser');
        if (storedName) {
            userNameDisplay.textContent = storedName;
            if (userAvatar) {
                userAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(storedName)}&background=6366F1&color=fff`;
            }
        }
    }

    // Sidebar Toggle (Mobile)
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

    // Resume Builder Preview Toggle
    const resumeForm = document.getElementById('resumeForm');
    const previewArea = document.getElementById('resumePreview');
    if (resumeForm && previewArea) {
        resumeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('resName').value;
            const education = document.getElementById('resEducation').value;
            const skills = document.getElementById('resSkills').value;
            
            document.getElementById('prevName').textContent = name;
            document.getElementById('prevEdu').textContent = education;
            document.getElementById('prevSkills').textContent = skills;
            
            previewArea.classList.add('active');
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
        { q: "Q. What is the next number in the series? 2, 6, 12, 20, ?", options: ["24", "30", "36"], correct: 1 },
        { q: "Q. If A is the brother of B, and B is the sister of C, how is A related to C?", options: ["Brother", "Cousin", "Uncle"], correct: 0 },
        { q: "Q. A train running at 72 km/hr crosses a pole in 15 seconds. What is the length of the train?", options: ["200m", "250m", "300m"], correct: 2 }
    ];
    let currentQuizIndex = 0;
    
    const quizQuestionText = document.getElementById('quizQuestionText');
    const quizOptionsContainer = document.getElementById('quizOptionsContainer');
    const quizSubmitBtn = document.getElementById('quizSubmitBtn');
    
    function loadQuizQuestion(index) {
        if (!quizQuestionText) return;
        const qData = quizQuestions[index];
        quizQuestionText.textContent = qData.q;
        quizOptionsContainer.innerHTML = '';
        
        qData.options.forEach((optText, i) => {
            const optDiv = document.createElement('div');
            optDiv.className = 'quiz-option';
            optDiv.textContent = optText;
            optDiv.dataset.correct = (i === qData.correct).toString();
            
            optDiv.addEventListener('click', function() {
                const siblings = quizOptionsContainer.querySelectorAll('.quiz-option');
                siblings.forEach(s => s.classList.remove('selected'));
                this.classList.add('selected');
            });
            
            quizOptionsContainer.appendChild(optDiv);
        });
    }

    if (quizQuestionText) {
        loadQuizQuestion(currentQuizIndex);
    }

    if (quizForm && quizResult) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // If it's the "Next Question" state
            if (quizSubmitBtn.textContent === "Next Question") {
                currentQuizIndex++;
                if (currentQuizIndex < quizQuestions.length) {
                    loadQuizQuestion(currentQuizIndex);
                    quizResult.classList.remove('show');
                    quizSubmitBtn.textContent = "Submit Answer";
                } else {
                    quizQuestionText.textContent = "Quiz Completed!";
                    quizOptionsContainer.innerHTML = "";
                    quizSubmitBtn.style.display = 'none';
                    quizResult.innerHTML = '<i class="bx bx-trophy text-success"></i> Great job on the Aptitude Test!';
                    quizResult.className = 'quiz-result show text-success';
                }
                return;
            }
            
            const selected = document.querySelector('.quiz-option.selected');
            if (!selected) {
                alert("Please select an answer!");
                return;
            }
            
            const isCorrect = selected.dataset.correct === 'true';
            quizResult.classList.add('show');
            
            if (isCorrect) {
                quizResult.innerHTML = '<i class="bx bx-check-circle text-success"></i> Correct! Well done.';
                quizResult.className = 'quiz-result show text-success';
            } else {
                quizResult.innerHTML = '<i class="bx bx-x-circle text-danger"></i> Incorrect. The correct answer is highlighted.';
                quizResult.className = 'quiz-result show text-danger';
                // highlight correct answer
                const allOpts = document.querySelectorAll('.quiz-option');
                allOpts.forEach(o => {
                    if (o.dataset.correct === 'true') {
                        o.style.borderColor = '#10B981';
                        o.style.background = 'rgba(16, 185, 129, 0.1)';
                    }
                });
            }
            
            if (currentQuizIndex < quizQuestions.length - 1) {
                quizSubmitBtn.textContent = "Next Question";
            } else {
                quizSubmitBtn.style.display = 'none';
                setTimeout(() => {
                    quizQuestionText.textContent = "Quiz Completed!";
                    quizOptionsContainer.innerHTML = "";
                    quizResult.innerHTML = '<i class="bx bx-trophy text-success"></i> Great job on the Aptitude Test!';
                    quizResult.className = 'quiz-result show text-success';
                }, 2000);
            }
        });
    }

    // Query Submission & Recent List
    const recentQueriesList = document.getElementById('recentQueriesList');
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
});
