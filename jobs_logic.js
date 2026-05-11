/**
 * jobs_logic.js
 * Handles the interactive functionality for the Companies & Jobs section.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. State Management (Local Storage) ---
    let savedJobs = JSON.parse(localStorage.getItem('careerBridgeSavedJobs')) || [];
    let appliedJobs = JSON.parse(localStorage.getItem('careerBridgeAppliedJobs')) || [];
    
    // --- 2. Toast Notification System ---
    const toastContainer = document.getElementById('toastContainer');
    
    function showToast(message, type = 'success') {
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'bx-check-circle' : 'bx-info-circle';
        
        toast.innerHTML = `
            <i class='bx ${icon}'></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                if (toastContainer.contains(toast)) {
                    toastContainer.removeChild(toast);
                }
            }, 300); // Wait for fade-out animation
        }, 3000);
    }

    // --- 3. Search & Filter Logic ---
    const searchInput = document.getElementById('jobSearchInput');
    const filterChips = document.querySelectorAll('#jobFilterChips .chip');
    const allJobCards = document.querySelectorAll('.job-card');
    
    let currentFilter = 'all';
    let searchQuery = '';

    function filterJobs() {
        allJobCards.forEach(card => {
            const role = card.getAttribute('data-role')?.toLowerCase() || '';
            const company = card.getAttribute('data-company')?.toLowerCase() || '';
            const type = card.getAttribute('data-type')?.toLowerCase() || '';
            const location = card.getAttribute('data-location')?.toLowerCase() || '';
            
            // Search text match
            const matchesSearch = role.includes(searchQuery) || 
                                company.includes(searchQuery) || 
                                type.includes(searchQuery) || 
                                location.includes(searchQuery);
                                
            // Chip filter match
            const matchesFilter = currentFilter === 'all' || type === currentFilter || location === currentFilter;
            
            if (matchesSearch && matchesFilter) {
                card.style.display = 'flex';
                // Slight animation reset
                card.style.opacity = '0';
                setTimeout(() => card.style.opacity = '1', 50);
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            filterJobs();
        });
    }

    if (filterChips.length > 0) {
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                currentFilter = chip.getAttribute('data-filter');
                filterJobs();
            });
        });
    }

    // --- 4. Initialize Card States ---
    function initializeCardStates() {
        allJobCards.forEach(card => {
            const role = card.getAttribute('data-role');
            const company = card.getAttribute('data-company');
            const jobId = `${company}-${role}`.replace(/\s+/g, '-').toLowerCase();
            
            // Set ID on card for easy reference
            card.setAttribute('data-id', jobId);
            
            // Check if saved
            const saveBtn = card.querySelector('.save-job-btn');
            if (saveBtn && savedJobs.includes(jobId)) {
                const icon = saveBtn.querySelector('i');
                icon.className = 'bx bxs-bookmark';
                saveBtn.classList.add('saved');
            }
            
            // Check if applied
            const applyBtn = card.querySelector('.apply-btn');
            // Look for this job in appliedJobs (which stores objects)
            const isApplied = appliedJobs.some(job => job.id === jobId);
            
            if (applyBtn && isApplied) {
                applyBtn.innerHTML = '<i class="bx bx-check"></i> Applied';
                applyBtn.classList.add('applied');
                applyBtn.classList.remove('btn-primary', 'btn-outline');
                applyBtn.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
                applyBtn.style.color = '#10B981';
                applyBtn.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                applyBtn.style.pointerEvents = 'none';
            }
        });
    }
    
    initializeCardStates();

    // --- 5. Card Interactions (Save, Details, Apply) ---
    // Use event delegation on the dashboard grid
    const mainGrid = document.querySelector('.dashboard-body');
    
    if (mainGrid) {
        mainGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.job-card');
            if (!card) return;
            
            const jobId = card.getAttribute('data-id');
            const role = card.getAttribute('data-role');
            const company = card.getAttribute('data-company');
            
            // Save Job
            if (e.target.closest('.save-job-btn')) {
                const btn = e.target.closest('.save-job-btn');
                const icon = btn.querySelector('i');
                
                if (savedJobs.includes(jobId)) {
                    // Remove from saved
                    savedJobs = savedJobs.filter(id => id !== jobId);
                    icon.className = 'bx bx-bookmark';
                    btn.classList.remove('saved');
                    showToast('Job removed from saved list', 'info');
                } else {
                    // Add to saved
                    savedJobs.push(jobId);
                    icon.className = 'bx bxs-bookmark';
                    btn.classList.add('saved');
                    showToast('Job saved successfully!', 'success');
                }
                
                localStorage.setItem('careerBridgeSavedJobs', JSON.stringify(savedJobs));
            }
            
            // View Details Modal
            if (e.target.closest('.view-details-btn')) {
                e.preventDefault();
                openJobDetails(card);
            }
            
            // Apply Now (Directly from card, opens apply modal)
            if (e.target.closest('.apply-btn') && !e.target.closest('.apply-btn').classList.contains('applied')) {
                e.preventDefault();
                openApplyModal(card);
            }
        });
    }

    // --- 6. Modals Logic ---
    const jobDetailsModal = document.getElementById('jobDetailsModal');
    const closeJdModalBtn = document.getElementById('closeJdModalBtn');
    const jdApplyBtn = document.getElementById('jdApplyBtn');
    
    const applyJobModal = document.getElementById('applyJobModal');
    const closeApplyModalBtn = document.getElementById('closeApplyModalBtn');
    
    let currentlyViewingJob = null; // Store reference to current job card

    function openJobDetails(card) {
        if (!jobDetailsModal) return;
        currentlyViewingJob = card;
        
        document.getElementById('jdRole').textContent = card.getAttribute('data-role');
        document.getElementById('jdCompany').textContent = card.getAttribute('data-company');
        
        // Copy tags
        const tagsContainer = card.querySelector('.job-tags').cloneNode(true);
        const jdTags = document.getElementById('jdTags');
        jdTags.innerHTML = '';
        jdTags.appendChild(tagsContainer);
        
        // Update Apply Button state in modal
        const jobId = card.getAttribute('data-id');
        const isApplied = appliedJobs.some(job => job.id === jobId);
        
        if (isApplied) {
            jdApplyBtn.innerHTML = '<i class="bx bx-check"></i> Applied';
            jdApplyBtn.style.backgroundColor = '#10B981';
            jdApplyBtn.style.borderColor = '#10B981';
            jdApplyBtn.style.pointerEvents = 'none';
        } else {
            jdApplyBtn.innerHTML = 'Apply for this Job';
            jdApplyBtn.style.backgroundColor = '';
            jdApplyBtn.style.borderColor = '';
            jdApplyBtn.style.pointerEvents = 'auto';
        }
        
        jobDetailsModal.classList.add('active');
    }

    function openApplyModal(card) {
        if (!applyJobModal) return;
        currentlyViewingJob = card;
        
        document.getElementById('applyRole').textContent = card.getAttribute('data-role');
        document.getElementById('applyCompany').textContent = card.getAttribute('data-company');
        
        // Pre-fill name and email if available
        let storedName = localStorage.getItem('careerBridgeUser') || '';
        if (storedName) {
            storedName = storedName.replace(/[0-9]/g, '').trim();
            document.getElementById('applyName').value = storedName;
            document.getElementById('applyEmail').value = storedName.toLowerCase().replace(' ', '.') + '@example.com';
        }
        
        // Reset file upload
        document.getElementById('applyResume').value = '';
        document.getElementById('resumeFileName').textContent = '';
        
        // Hide details modal if it's open
        if (jobDetailsModal) jobDetailsModal.classList.remove('active');
        
        applyJobModal.classList.add('active');
    }

    // Modal Close Events
    if (closeJdModalBtn) closeJdModalBtn.addEventListener('click', () => jobDetailsModal.classList.remove('active'));
    if (closeApplyModalBtn) closeApplyModalBtn.addEventListener('click', () => applyJobModal.classList.remove('active'));
    
    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === jobDetailsModal) jobDetailsModal.classList.remove('active');
        if (e.target === applyJobModal) applyJobModal.classList.remove('active');
    });

    // From Details Modal Apply Button
    if (jdApplyBtn) {
        jdApplyBtn.addEventListener('click', () => {
            if (currentlyViewingJob) {
                openApplyModal(currentlyViewingJob);
            }
        });
    }

    // --- 7. Application Submission ---
    const applyJobForm = document.getElementById('applyJobForm');
    const applyResumeInput = document.getElementById('applyResume');
    const resumeUploadBox = document.getElementById('resumeUploadBox');
    const resumeFileName = document.getElementById('resumeFileName');

    // File upload visual feedback
    if (resumeUploadBox && applyResumeInput) {
        resumeUploadBox.addEventListener('click', () => applyResumeInput.click());
        
        applyResumeInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                resumeFileName.textContent = "Selected file: " + e.target.files[0].name;
                resumeUploadBox.style.borderColor = 'var(--primary)';
                resumeUploadBox.style.background = 'rgba(99, 102, 241, 0.1)';
            }
        });
    }

    const confirmApplyBtn = document.getElementById('confirmApplyBtn');

    if (confirmApplyBtn && applyJobForm) {
        confirmApplyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (!applyJobForm.checkValidity()) {
                applyJobForm.reportValidity();
                return;
            }
            
            if (!currentlyViewingJob) return;
            
            const btn = confirmApplyBtn;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Submitting...';
            btn.style.pointerEvents = 'none';
            
            // Simulate API call
            setTimeout(() => {
                const jobId = currentlyViewingJob.getAttribute('data-id');
                const role = currentlyViewingJob.getAttribute('data-role');
                const company = currentlyViewingJob.getAttribute('data-company');
                
                // Add to applied jobs
                appliedJobs.push({
                    id: jobId,
                    role: role,
                    company: company,
                    dateApplied: new Date().toISOString(),
                    status: 'applied'
                });
                
                localStorage.setItem('careerBridgeAppliedJobs', JSON.stringify(appliedJobs));
                
                // Update UI on the specific card
                const cardApplyBtn = currentlyViewingJob.querySelector('.apply-btn');
                if (cardApplyBtn) {
                    cardApplyBtn.innerHTML = '<i class="bx bx-check"></i> Applied';
                    cardApplyBtn.classList.add('applied');
                    cardApplyBtn.classList.remove('btn-primary', 'btn-outline');
                    cardApplyBtn.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
                    cardApplyBtn.style.color = '#10B981';
                    cardApplyBtn.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                    cardApplyBtn.style.pointerEvents = 'none';
                }
                
                // Close modal and show success
                applyJobModal.classList.remove('active');
                showToast(`Successfully applied to ${company}!`, 'success');
                
                // Reset button
                btn.innerHTML = originalText;
                btn.style.pointerEvents = 'auto';
                applyJobForm.reset();
                resumeFileName.textContent = '';
                resumeUploadBox.style.borderColor = '';
                resumeUploadBox.style.background = '';
                
            }, 1500);
        });
    }

    // --- 8. Load More Simulation ---
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const jobsGrid = document.getElementById('jobsGrid');
    
    if (loadMoreBtn && jobsGrid) {
        loadMoreBtn.addEventListener('click', () => {
            const originalText = loadMoreBtn.innerHTML;
            loadMoreBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Loading...';
            
            setTimeout(() => {
                // Dummy new job cards
                const newJobsHTML = `
                    <div class="dash-card job-card zoom-in job-card-hover" data-company="Microsoft" data-role="Software Engineer" data-type="full-time" data-location="hyderabad" data-id="microsoft-software-engineer">
                        <div class="job-header">
                            <div class="co-logo"><i class='bx bxl-microsoft' style="font-size: 2rem; color: #00A4EF;"></i></div>
                            <div class="job-actions-top">
                                <span class="badge bg-primary-light text-primary">Actively Hiring</span>
                                <button class="icon-btn save-job-btn"><i class='bx bx-bookmark'></i></button>
                            </div>
                        </div>
                        <h3>Software Engineer</h3>
                        <p class="co-name">Microsoft</p>
                        <div class="job-tags">
                            <span><i class='bx bx-map'></i> Hyderabad</span>
                            <span><i class='bx bx-money'></i> 25 LPA</span>
                            <span><i class='bx bx-briefcase'></i> Full-Time</span>
                        </div>
                        <p class="job-eligibility">Eligibility: B.Tech/M.Tech (CS/IT). 8.0+ CGPA.</p>
                        <div class="job-card-actions">
                            <a href="#" class="btn btn-outline view-details-btn">View Details</a>
                            <a href="#" class="btn btn-primary apply-btn">Apply Now</a>
                        </div>
                    </div>
                `;
                
                jobsGrid.insertAdjacentHTML('beforeend', newJobsHTML);
                
                // Refresh node list and observer
                const allCards = document.querySelectorAll('.job-card');
                
                loadMoreBtn.innerHTML = '<i class="bx bx-check"></i> Loaded';
                setTimeout(() => {
                    loadMoreBtn.innerHTML = originalText;
                }, 2000);
                
            }, 1000);
        });
    }
});
