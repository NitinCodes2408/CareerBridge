const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'dashboard-home.html');
let content = fs.readFileSync(filePath, 'utf8');

const newBody = `
        <!-- Welcome Hero Section -->
        <div class="welcome-card fade-in-up" id="home" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(30, 41, 59, 0.8) 100%); border: 1px solid rgba(99, 102, 241, 0.3); display: flex; justify-content: space-between; align-items: center; padding: 2.5rem 3rem; border-radius: var(--radius-lg); margin-bottom: 2.5rem; flex-wrap: wrap; gap: 2rem;">
          <div class="welcome-text" style="display: flex; gap: 1.5rem; align-items: center;">
            <img id="welcomeAvatar" src="https://ui-avatars.com/api/?name=Sharayu&background=6366F1&color=fff&size=80" style="border-radius: 50%; border: 3px solid var(--primary); box-shadow: 0 0 15px rgba(99,102,241,0.5);" alt="Student Avatar">
            <div>
              <h2 style="font-size: 1.8rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">Welcome back, <span id="welcomeName">Sharayu</span> 👋</h2>
              <p style="color: var(--text-muted); font-size: 1rem; max-width: 500px;">Let's get you placement-ready. Every step you take brings you closer to your dream job!</p>
            </div>
          </div>
          <div class="welcome-status" style="text-align: right; background: rgba(16, 185, 129, 0.1); padding: 1rem 1.5rem; border-radius: var(--radius-md); border: 1px solid rgba(16, 185, 129, 0.2);">
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 1px;">Placement Status</p>
            <div style="color: #10B981; font-weight: 600; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem; justify-content: flex-end;"><i class='bx bxs-flame'></i> On Track</div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions-grid zoom-in" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
          <a href="resume-builder.html" class="dash-card action-card" style="display: flex; align-items: center; gap: 1rem; padding: 1.2rem; text-decoration: none; color: var(--text-dark); transition: all 0.3s ease; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-card);">
            <div style="background: rgba(99,102,241,0.1); color: var(--primary); padding: 0.8rem; border-radius: 12px; font-size: 1.5rem;"><i class='bx bxs-file-doc'></i></div>
            <div style="font-weight: 600;">Build Resume</div>
          </a>
          <a href="aptitude.html" class="dash-card action-card" style="display: flex; align-items: center; gap: 1rem; padding: 1.2rem; text-decoration: none; color: var(--text-dark); transition: all 0.3s ease; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-card);">
            <div style="background: rgba(16,185,129,0.1); color: #10B981; padding: 0.8rem; border-radius: 12px; font-size: 1.5rem;"><i class='bx bx-brain'></i></div>
            <div style="font-weight: 600;">Start Test</div>
          </a>
          <a href="jobs.html" class="dash-card action-card" style="display: flex; align-items: center; gap: 1rem; padding: 1.2rem; text-decoration: none; color: var(--text-dark); transition: all 0.3s ease; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-card);">
            <div style="background: rgba(245,158,11,0.1); color: #F59E0B; padding: 0.8rem; border-radius: 12px; font-size: 1.5rem;"><i class='bx bxs-briefcase'></i></div>
            <div style="font-weight: 600;">Apply Jobs</div>
          </a>
          <a href="learning.html" class="dash-card action-card" style="display: flex; align-items: center; gap: 1rem; padding: 1.2rem; text-decoration: none; color: var(--text-dark); transition: all 0.3s ease; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-card);">
            <div style="background: rgba(217,70,239,0.1); color: #D946EF; padding: 0.8rem; border-radius: 12px; font-size: 1.5rem;"><i class='bx bxs-book-open'></i></div>
            <div style="font-weight: 600;">Continue Course</div>
          </a>
        </div>

        <!-- Readiness Tracker -->
        <h3 class="section-title" style="margin-bottom: 1.5rem;">Placement Readiness Tracker</h3>
        <div class="dashboard-grid stats-grid" style="margin-bottom: 3rem;">
          <div class="dash-card zoom-in stat-card">
            <div class="circular-progress" style="--progress: 85;">
              <div class="inner-circle"><span class="animated-counter">85</span>%</div>
            </div>
            <div class="stat-details" style="margin-left: 1rem;">
              <h3>Resume Completion</h3>
              <p>Great progress!</p>
            </div>
          </div>
          <div class="dash-card zoom-in stat-card" style="transition-delay: 100ms;">
            <div class="stat-icon" style="color: #10B981; background: rgba(16, 185, 129, 0.1);"><i class='bx bx-brain'></i></div>
            <div class="stat-details">
              <h3><span class="animated-counter">780</span>/800</h3>
              <p>Aptitude Score</p>
              <div class="progress-bar-mini"><div class="progress-fill bg-success" style="width: 95%;"></div></div>
            </div>
          </div>
          <div class="dash-card zoom-in stat-card" style="transition-delay: 200ms;">
            <div class="stat-icon" style="color: var(--secondary); background: rgba(217, 70, 239, 0.1);"><i class='bx bxs-book-open'></i></div>
            <div class="stat-details">
              <h3 class="animated-counter">12</h3>
              <p>Courses Completed</p>
            </div>
          </div>
          <div class="dash-card zoom-in stat-card" style="transition-delay: 300ms;">
            <div class="stat-icon" style="color: #F59E0B; background: rgba(245, 158, 11, 0.1);"><i class='bx bxs-briefcase'></i></div>
            <div class="stat-details">
              <h3 class="animated-counter">24</h3>
              <p>Applications Submitted</p>
            </div>
          </div>
        </div>

        <!-- Continue Learning & Daily Tasks -->
        <div class="dashboard-grid split-grid" style="margin-bottom: 3rem;">
          
          <!-- Continue Learning Card -->
          <div class="dash-card zoom-in" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div class="card-header" style="margin-bottom: 1.5rem;">
              <h3><i class='bx bxs-graduation text-primary'></i> Continue Learning</h3>
            </div>
            <div style="background: rgba(15, 23, 42, 0.6); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); flex: 1; display: flex; flex-direction: column; justify-content: center;">
               <div style="display: flex; gap: 1.5rem; align-items: center; margin-bottom: 2rem;">
                 <div style="width: 80px; height: 80px; background: url('https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=200&auto=format&fit=crop') center/cover; border-radius: 8px;"></div>
                 <div>
                   <h4 style="color: #fff; font-size: 1.2rem; margin-bottom: 0.3rem;">Mastering DSA in Java</h4>
                   <p style="color: var(--text-muted); font-size: 0.9rem;">Chapter 4: Advanced Graph Algorithms</p>
                 </div>
               </div>
               <div style="margin-bottom: 2rem;">
                 <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.8rem;">
                   <span style="color: var(--text-muted);">Course Progress</span>
                   <span style="color: var(--primary); font-weight: 600;">68%</span>
                 </div>
                 <div class="progress-bar-mini" style="width: 100%; height: 8px;"><div class="progress-fill bg-primary" style="width: 68%;"></div></div>
               </div>
               <a href="learning.html" class="btn btn-primary w-100" style="text-align: center; font-size: 1rem; padding: 0.8rem;"><i class='bx bx-play-circle'></i> Continue Course</a>
            </div>
          </div>

          <!-- Daily Tasks -->
          <div class="dash-card zoom-in task-card" style="transition-delay: 100ms;">
            <div class="card-header">
              <h3><i class='bx bx-list-check text-success'></i> Daily Tasks</h3>
              <span class="badge bg-success-light text-success">3/4 Done</span>
            </div>
            <div class="task-list" style="margin-top: 1rem;">
              <label class="task-item">
                <input type="checkbox" checked>
                <span class="checkmark"></span>
                <span class="task-text" style="text-decoration: line-through; opacity: 0.5;">Complete Java Basics</span>
              </label>
              <label class="task-item">
                <input type="checkbox" checked>
                <span class="checkmark"></span>
                <span class="task-text" style="text-decoration: line-through; opacity: 0.5;">Attempt Aptitude Test</span>
              </label>
              <label class="task-item">
                <input type="checkbox" checked>
                <span class="checkmark"></span>
                <span class="task-text" style="text-decoration: line-through; opacity: 0.5;">Update Resume</span>
              </label>
              <label class="task-item">
                <input type="checkbox">
                <span class="checkmark"></span>
                <span class="task-text">Apply to 2 Companies</span>
              </label>
            </div>
            <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
               <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.8rem;">
                 <span style="color: var(--text-muted);">Daily Goal</span>
                 <span style="color: #10B981; font-weight: 600;">75%</span>
               </div>
               <div class="progress-bar-mini" style="width: 100%; height: 8px;"><div class="progress-fill bg-success" style="width: 75%;"></div></div>
            </div>
          </div>
        </div>

        <!-- Analytics Section -->
        <h3 class="section-title" style="margin-bottom: 1.5rem;">Analytics Overview</h3>
        <div class="dashboard-grid split-grid-large" style="margin-bottom: 3rem;">
           <div class="dash-card zoom-in">
             <h3 style="margin-bottom: 1.5rem;"><i class='bx bx-line-chart text-primary'></i> Learning Progress</h3>
             <div class="chart-container" style="position: relative; height: 250px; width: 100%; display: flex; justify-content: center;">
               <canvas id="learningGrowthChart"></canvas>
             </div>
           </div>
           
           <div class="dash-card zoom-in" style="transition-delay: 100ms;">
             <h3 style="margin-bottom: 1.5rem;"><i class='bx bx-pie-chart-alt-2 text-warning'></i> Application Funnel</h3>
             <div class="chart-container" style="position: relative; height: 250px; width: 100%; display: flex; justify-content: center;">
               <canvas id="applicationProgressChart"></canvas>
             </div>
           </div>
        </div>

        <!-- Jobs and Interviews -->
        <div class="dashboard-grid split-grid-large" style="margin-bottom: 3rem;">
          
          <!-- Upcoming Interviews -->
          <div class="dash-card zoom-in interview-card">
            <div class="card-header">
              <h3><i class='bx bx-calendar text-secondary'></i> Upcoming Interviews</h3>
              <a href="applications.html" style="font-size: 0.85rem; color: var(--primary); text-decoration: none;">View All</a>
            </div>
            <div class="interview-list" style="margin-top: 1.5rem;">
              <div class="interview-item" style="padding: 1.2rem; background: rgba(15,23,42,0.5); border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 1rem; transition: var(--transition);">
                <div class="co-logo" style="background: #1e293b; padding: 0.6rem; border-radius: 8px;"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width="28"></div>
                <div class="int-details" style="flex: 1; margin-left: 0.5rem;">
                  <h4 style="color: #fff; font-size: 1.05rem; margin-bottom: 0.2rem;">Google India</h4>
                  <p style="color: var(--text-muted); font-size: 0.85rem;">SWE Intern • Oct 15, 2026</p>
                </div>
                <div class="int-status">
                  <span class="badge bg-success-light text-success">Scheduled</span>
                </div>
              </div>
              <div class="interview-item" style="padding: 1.2rem; background: rgba(15,23,42,0.5); border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 1rem; transition: var(--transition);">
                <div class="co-logo" style="background: #1e293b; padding: 0.6rem; border-radius: 8px;"><img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" width="28"></div>
                <div class="int-details" style="flex: 1; margin-left: 0.5rem;">
                  <h4 style="color: #fff; font-size: 1.05rem; margin-bottom: 0.2rem;">Microsoft</h4>
                  <p style="color: var(--text-muted); font-size: 0.85rem;">SDE I • Oct 20, 2026</p>
                </div>
                <div class="int-status">
                  <span class="badge bg-warning-light text-warning">Pending</span>
                </div>
              </div>
              <div class="interview-item" style="padding: 1.2rem; background: rgba(15,23,42,0.5); border-radius: var(--radius-md); border: 1px solid var(--border-color); transition: var(--transition);">
                <div class="co-logo" style="background: #1e293b; padding: 0.6rem; border-radius: 8px;"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" width="28" style="filter: invert(1);"></div>
                <div class="int-details" style="flex: 1; margin-left: 0.5rem;">
                  <h4 style="color: #fff; font-size: 1.05rem; margin-bottom: 0.2rem;">Amazon</h4>
                  <p style="color: var(--text-muted); font-size: 0.85rem;">Cloud Engineer • Sep 30, 2026</p>
                </div>
                <div class="int-status">
                  <span class="badge bg-primary-light text-primary">Completed</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recommended Jobs Section -->
          <div class="dash-card zoom-in" style="transition-delay: 100ms;">
             <div class="card-header" style="margin-bottom: 1.5rem;">
               <h3><i class='bx bxs-briefcase text-primary'></i> Recommended Jobs</h3>
               <a href="jobs.html" style="font-size: 0.85rem; color: var(--primary); text-decoration: none;">View All</a>
             </div>
             
             <div class="job-list-compact" style="display: flex; flex-direction: column; gap: 1rem;">
               
               <div class="action-card" style="display: flex; align-items: center; gap: 1rem; padding: 1.2rem; background: rgba(15,23,42,0.5); border-radius: var(--radius-md); border: 1px solid var(--border-color); transition: all 0.3s ease;">
                 <div class="co-logo" style="background: #1e293b; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 8px;"><i class='bx bxl-meta' style="font-size: 2rem; color: #0668E1;"></i></div>
                 <div style="flex: 1;">
                   <h4 style="color: #fff; font-size: 1.05rem; margin-bottom: 0.2rem;">Frontend React Intern</h4>
                   <p style="color: var(--text-muted); font-size: 0.85rem;">Meta • Remote • ₹50k/mo</p>
                 </div>
                 <a href="jobs.html" class="btn btn-primary btn-sm">Apply</a>
               </div>

               <div class="action-card" style="display: flex; align-items: center; gap: 1rem; padding: 1.2rem; background: rgba(15,23,42,0.5); border-radius: var(--radius-md); border: 1px solid var(--border-color); transition: all 0.3s ease;">
                 <div class="co-logo" style="background: #1e293b; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 8px;"><i class='bx bxl-apple' style="font-size: 2rem; color: #fff;"></i></div>
                 <div style="flex: 1;">
                   <h4 style="color: #fff; font-size: 1.05rem; margin-bottom: 0.2rem;">iOS Developer Intern</h4>
                   <p style="color: var(--text-muted); font-size: 0.85rem;">Apple • Hyderabad • ₹60k/mo</p>
                 </div>
                 <a href="jobs.html" class="btn btn-primary btn-sm">Apply</a>
               </div>

             </div>
          </div>
        </div>
`;

const regex = /<div class="dashboard-body">[\s\S]*?<\/div>\s*<\/main>/;

if(regex.test(content)) {
    const newContent = content.replace(regex, '<div class="dashboard-body">\n' + newBody + '\n</div>\n    </main>');
    fs.writeFileSync(filePath, newContent);
    console.log("Updated dashboard-home.html");
} else {
    console.log("Regex did not match.");
}
