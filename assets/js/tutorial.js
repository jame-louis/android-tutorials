class TutorialManager {
  constructor(tutorialName, totalSteps) {
    this.tutorialName = tutorialName;
    this.totalSteps = totalSteps;
    this.currentStep = 1;
    this.completedSteps = this.loadProgress();
    this.init();
  }

  init() {
    this.updateProgressBar();
    this.updateStepStates();
    this.showStep(this.getLastCompletedStep() + 1);
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem(`tutorial-progress-${this.tutorialName}`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Failed to load tutorial progress:', e);
      return [];
    }
  }

  saveProgress() {
    try {
      localStorage.setItem(`tutorial-progress-${this.tutorialName}`, JSON.stringify(this.completedSteps));
    } catch (e) {
      console.warn('Failed to save tutorial progress:', e);
    }
  }

  getLastCompletedStep() {
    return this.completedSteps.length > 0 ? Math.max(...this.completedSteps) : 0;
  }

  showStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > this.totalSteps + 1) return;
    
    document.querySelectorAll('.tutorial-content').forEach(content => {
      content.classList.remove('active');
    });
    
    const targetStep = stepNumber === this.totalSteps + 1 ? 'complete' : stepNumber;
    const targetContent = document.querySelector(`.tutorial-content[data-step="${targetStep}"]`);
    if (targetContent) {
      targetContent.classList.add('active');
    }
    
    document.querySelectorAll('.step-item').forEach(item => {
      item.classList.remove('active');
    });
    const activeItem = document.querySelector(`.step-item[data-step="${stepNumber}"]`);
    if (activeItem) {
      activeItem.classList.add('active');
    }
    
    this.currentStep = stepNumber;
    this.scrollToTop();
    
    if (window.innerWidth <= 768) {
      document.getElementById('sidebar')?.classList.remove('open');
    }
  }

  completeStep() {
    const stepNumber = this.currentStep;
    
    if (this.completedSteps.includes(stepNumber)) {
      this.showNextStep();
      return;
    }
    
    this.completedSteps.push(stepNumber);
    this.completedSteps.sort((a, b) => a - b);
    this.saveProgress();
    
    this.updateProgressBar();
    this.updateStepStates();
    this.animateCompletion();
    
    setTimeout(() => {
      this.showNextStep();
    }, 1000);
  }

  completeStepAndFinish() {
    for (let i = 1; i <= this.totalSteps; i++) {
      if (!this.completedSteps.includes(i)) {
        this.completedSteps.push(i);
      }
    }
    this.saveProgress();
    this.updateProgressBar();
    this.updateStepStates();
    this.showStep('complete');
  }

  showNextStep() {
    if (this.currentStep < this.totalSteps) {
      this.showStep(this.currentStep + 1);
    } else if (this.currentStep === this.totalSteps) {
      this.showStep('complete');
    }
  }

  updateProgressBar() {
    const completedCount = this.completedSteps.length;
    const progressPercent = (completedCount / this.totalSteps) * 100;
    
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) {
      progressFill.style.width = progressPercent + '%';
    }
    
    if (progressText) {
      progressText.textContent = `${completedCount} of ${this.totalSteps} completed`;
    }
  }

  updateStepStates() {
    document.querySelectorAll('.step-item').forEach(item => {
      const stepId = parseInt(item.dataset.step);
      if (this.completedSteps.includes(stepId)) {
        item.classList.add('completed');
      }
    });
  }

  animateCompletion() {
    const xpBadge = document.querySelector('.xp-badge');
    if (xpBadge) {
      xpBadge.style.transform = 'scale(1.2)';
      setTimeout(() => {
        xpBadge.style.transform = 'scale(1)';
      }, 300);
    }
    
    const button = document.querySelector('.tutorial-content.active .complete-button');
    if (button) {
      button.textContent = '✓ Completed!';
      button.classList.add('completed');
      button.disabled = true;
      
      setTimeout(() => {
        button.classList.remove('completed');
      }, 2000);
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

let tutorialManager;

function showStep(step) {
  tutorialManager.showStep(step);
}

function completeStep() {
  tutorialManager.completeStep();
}

function completeStepAndFinish() {
  tutorialManager.completeStepAndFinish();
}

function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function() {
  const configScript = document.getElementById('tutorial-config');
  const config = configScript ? JSON.parse(configScript.textContent) : window.tutorialConfig;
  tutorialManager = new TutorialManager(config.tutorialName, config.totalSteps);
  
  document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth <= 768 && 
        sidebar?.classList.contains('open') && 
        !sidebar.contains(event.target) && 
        !toggle?.contains(event.target)) {
      sidebar.classList.remove('open');
    }
  });
});