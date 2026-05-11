document.addEventListener('DOMContentLoaded', () => {
    // 1. Profile Completion Tracker Logic
    const calculateCompletion = () => {
        const checkboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
        let completed = 0;
        checkboxes.forEach(cb => {
            if(cb.checked) completed++;
        });
        
        const percentage = Math.round((completed / checkboxes.length) * 100);
        
        const circularProgress = document.querySelector('.circular-progress');
        const innerCircle = document.querySelector('.inner-circle');
        
        if (circularProgress && innerCircle) {
            circularProgress.style.setProperty('--progress', percentage);
            innerCircle.textContent = `${percentage}%`;
            
            // Adjust color based on percentage
            if (percentage === 100) {
                circularProgress.style.background = `conic-gradient(#10B981 calc(var(--progress) * 1%), rgba(255,255,255,0.1) 0)`;
            } else {
                circularProgress.style.background = `conic-gradient(var(--primary) calc(var(--progress) * 1%), rgba(255,255,255,0.1) 0)`;
            }
        }
    };

    // Listen to manual checkbox toggles for the demo
    const taskCheckboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
    taskCheckboxes.forEach(cb => {
        cb.addEventListener('change', calculateCompletion);
    });
    
    // Initial calculation
    calculateCompletion();

    // 2. Resume Upload Simulation
    const resumeWidget = document.querySelector('.dash-card .bxs-file-pdf').parentElement;
    if (resumeWidget) {
        resumeWidget.addEventListener('click', (e) => {
            // Prevent if they clicked the download/replace buttons explicitly
            if (e.target.closest('.btn')) return;
            
            const btn = resumeWidget.querySelector('.btn-outline');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Uploading...';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="bx bx-check"></i> Uploaded';
                btn.classList.add('btn-primary');
                btn.classList.remove('btn-outline');
                
                // Update tracker
                const uploadTask = taskCheckboxes[3]; // The 4th checkbox
                if (uploadTask && !uploadTask.checked) {
                    uploadTask.checked = true;
                    uploadTask.nextElementSibling.nextElementSibling.style.textDecoration = 'line-through';
                    uploadTask.nextElementSibling.nextElementSibling.style.color = 'rgba(255,255,255,0.5)';
                    calculateCompletion();
                }
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-outline');
                }, 2000);
            }, 1500);
        });
    }

    // 3. Hover effects for skill bars
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const fill = item.querySelector('.progress-fill');
            if (fill) {
                fill.style.filter = 'brightness(1.2)';
                fill.style.boxShadow = '0 0 10px var(--primary)';
            }
        });
        item.addEventListener('mouseleave', () => {
            const fill = item.querySelector('.progress-fill');
            if (fill) {
                fill.style.filter = 'none';
                fill.style.boxShadow = 'none';
            }
        });
    });
    
    // 4. Load & Save Detailed Profile Info
    const profFields = {
        name: document.getElementById('profName'),
        headline: document.getElementById('profHeadline'),
        email: document.getElementById('profEmail'),
        phone: document.getElementById('profPhone'),
        dob: document.getElementById('profDOB'),
        gender: document.getElementById('profGender'),
        address: document.getElementById('profAddress'),
        city: document.getElementById('profCity'),
        state: document.getElementById('profState')
    };

    const loadProfileData = () => {
        const savedData = JSON.parse(localStorage.getItem('careerBridgeProfileDetails')) || {};
        Object.keys(profFields).forEach(key => {
            if (profFields[key] && savedData[key]) {
                profFields[key].value = savedData[key];
            }
        });
    };

    const saveProfileBtn = document.getElementById('saveProfileBtn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', () => {
            const profileData = {};
            Object.keys(profFields).forEach(key => {
                if (profFields[key]) {
                    profileData[key] = profFields[key].value;
                }
            });
            localStorage.setItem('careerBridgeProfileDetails', JSON.stringify(profileData));
            
            // The name/headline updates are also handled by dashboard.js, 
            // but we ensure the detailed info is persisted here.
            console.log('Profile details saved to localStorage');
        });
    }

    // Initial Load
    loadProfileData();

    // 5. Smooth Scroll for Dropdown Links
    document.querySelectorAll('.scroll-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Visual Feedback: Highlight the section
                targetSection.style.transition = 'all 0.5s ease';
                targetSection.style.borderColor = 'var(--primary)';
                targetSection.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.3)';
                
                setTimeout(() => {
                    targetSection.style.borderColor = '';
                    targetSection.style.boxShadow = '';
                }, 2000);
            }
        });
    });

    // 6. Avatar Upload Logic
    const editAvatarBtns = document.querySelectorAll('.edit-avatar-btn');
    const avatarTrigger = document.getElementById('avatarTrigger');
    const avatarUploadInput = document.getElementById('avatarUploadInput'); // Local input on profile page
    
    if ((editAvatarBtns.length > 0 || avatarTrigger) && avatarUploadInput) {
        const triggerUpload = (e) => {
            e.preventDefault();
            avatarUploadInput.click();
        };

        editAvatarBtns.forEach(btn => btn.addEventListener('click', triggerUpload));
        if (avatarTrigger) avatarTrigger.addEventListener('click', triggerUpload);

        // Add hover effect for the overlay
        if (avatarTrigger) {
            avatarTrigger.addEventListener('mouseenter', () => {
                const overlay = avatarTrigger.querySelector('.avatar-edit-overlay');
                const img = avatarTrigger.querySelector('img');
                if (overlay) overlay.style.transform = 'scale(1.1)';
                if (img) img.style.filter = 'brightness(0.8)';
            });
            avatarTrigger.addEventListener('mouseleave', () => {
                const overlay = avatarTrigger.querySelector('.avatar-edit-overlay');
                const img = avatarTrigger.querySelector('img');
                if (overlay) overlay.style.transform = 'scale(1)';
                if (img) img.style.filter = 'brightness(1)';
            });
        }

        avatarUploadInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target.result;
                    localStorage.setItem('careerBridgeAvatar', dataUrl);
                    
                    // Sync all avatars on the page
                    document.querySelectorAll('#userAvatar, #profilePageAvatar, #welcomeAvatar').forEach(img => {
                        img.src = dataUrl;
                    });
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 7. Remove Avatar Logic
    const removeAvatarBtn = document.querySelector('.remove-avatar-btn');
    if (removeAvatarBtn) {
        removeAvatarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('careerBridgeAvatar');
            
            // Re-fetch default name from localStorage or UI
            let storedName = localStorage.getItem('careerBridgeUser') || 'Student User';
            storedName = storedName.replace(/[0-9]/g, '').trim() || 'Student User';
            
            const defaultAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(storedName)}&background=6366F1&color=fff`;
            
            const profilePageAvatar = document.getElementById('profilePageAvatar');
            const userAvatar = document.getElementById('userAvatar');
            const welcomeAvatar = document.getElementById('welcomeAvatar');
            
            if (profilePageAvatar) profilePageAvatar.src = `${defaultAvatarUrl}&size=120`;
            if (userAvatar) userAvatar.src = defaultAvatarUrl;
            if (welcomeAvatar) welcomeAvatar.src = `${defaultAvatarUrl}&size=80`;
            
            // Clear input so same file can be uploaded again if needed
            if (avatarUploadInput) avatarUploadInput.value = '';
        });
    }
});
