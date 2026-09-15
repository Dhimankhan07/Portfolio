// Data Science Student Portfolio Script

document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing Text Effect
    const typingElement = document.getElementById('typingText');
    const roles = [
        "Data Science Student",
        "Machine Learning Enthusiast",
        "Predictive Modeling Specialist",
        "Python & Deep Learning Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // 2. Mobile Nav Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 3. Navbar Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // 4. Portfolio Filter System
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. Initialize Chart.js Data Science Visualizations
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a1a1aa', font: { size: 10 } } },
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a1a1aa', font: { size: 10 } } }
        }
    };

    // Chart 1: Customer Churn (ROC Curve / Accuracy)
    const ctxChurn = document.getElementById('chartChurn')?.getContext('2d');
    if (ctxChurn) {
        new Chart(ctxChurn, {
            type: 'line',
            data: {
                labels: ['Epoch 1', 'Epoch 5', 'Epoch 10', 'Epoch 15', 'Epoch 20', 'Epoch 25'],
                datasets: [{
                    label: 'Model Accuracy',
                    data: [0.65, 0.78, 0.85, 0.89, 0.92, 0.94],
                    borderColor: '#ffbe00',
                    backgroundColor: 'rgba(255, 190, 0, 0.15)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: '#ffbe00'
                }]
            },
            options: chartOptions
        });
    }

    // Chart 2: Financial Forecast (Bar Chart)
    const ctxFinancial = document.getElementById('chartFinancial')?.getContext('2d');
    if (ctxFinancial) {
        new Chart(ctxFinancial, {
            type: 'bar',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1 Est', 'Q2 Est'],
                datasets: [{
                    label: 'Revenue Index',
                    data: [120, 190, 240, 310, 380, 430],
                    backgroundColor: ['#ffbe00', '#ffbe00', '#ffbe00', '#ffbe00', '#e0a600', '#c49100'],
                    borderRadius: 6
                }]
            },
            options: chartOptions
        });
    }

    // Chart 3: Sentiment Classification (Doughnut)
    const ctxSentiment = document.getElementById('chartSentiment')?.getContext('2d');
    if (ctxSentiment) {
        new Chart(ctxSentiment, {
            type: 'doughnut',
            data: {
                labels: ['Positive', 'Neutral', 'Negative'],
                datasets: [{
                    data: [58, 27, 15],
                    backgroundColor: ['#ffbe00', '#3b82f6', '#ef4444'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#a1a1aa', font: { size: 10 } } }
                }
            }
        });
    }

    // Chart 4: Medical Image Segmentation (Radar / Curve)
    const ctxVision = document.getElementById('chartVision')?.getContext('2d');
    if (ctxVision) {
        new Chart(ctxVision, {
            type: 'line',
            data: {
                labels: ['Batch 100', 'Batch 200', 'Batch 300', 'Batch 400', 'Batch 500'],
                datasets: [{
                    label: 'Dice Loss',
                    data: [0.82, 0.45, 0.28, 0.18, 0.12],
                    borderColor: '#ffbe00',
                    borderDash: [5, 5],
                    tension: 0.3,
                    borderWidth: 2
                }]
            },
            options: chartOptions
        });
    }

    // 6. Project Modal Details Popups
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.querySelector('.modal-close');

    const projectData = {
        modalChurn: {
            title: "Customer Churn Predictor (XGBoost & SHAP)",
            tech: "Python, XGBoost, SHAP, Scikit-Learn, Pandas",
            desc: "Constructed an end-to-end customer attrition pipeline using XGBoost gradient boosted decision trees. Applied Synthetic Minority Over-sampling Technique (SMOTE) to handle class imbalance and conducted hyperparameter optimization via Bayesian Grid Search. Utilized SHAP (SHapley Additive exPlanations) values for model interpretability, uncovering key drivers of customer attrition."
        },
        modalFinancial: {
            title: "Global Market Trends EDA & ARIMA Forecasting",
            tech: "Python, Streamlit, Plotly, Statsmodels, Pandas",
            desc: "Engineered a real-time web dashboard ingesting financial stock & commodity market APIs. Conducted time-series stationarity testing (Augmented Dickey-Fuller) and fitted ARIMA / GARCH models for 30-day volatility forecasting with interactive confidence intervals."
        },
        modalSentiment: {
            title: "Financial News Sentiment Classifier (FinBERT)",
            tech: "PyTorch, HuggingFace Transformers, FastAPI, Docker",
            desc: "Fine-tuned a domain-specific BERT transformer (FinBERT) on over 50,000 financial headline annotations. Deployed the model as an asynchronous microservice with FastAPI, delivering real-time sentiment scoring for high-frequency trading signal analysis."
        },
        modalVision: {
            title: "Medical MRI Image Segmentation (U-Net CNN)",
            tech: "PyTorch, OpenCV, CUDA, Torchvision",
            desc: "Implemented a custom 2D U-Net deep convolutional neural network for automated brain MRI lesion segmentation. Achieved a Dice Similarity Coefficient of 0.89 using weighted BCE-Dice hybrid loss functions and extensive spatial data augmentation."
        }
    };

    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const key = btn.getAttribute('data-modal');
            const data = projectData[key];
            if (data) {
                modalBody.innerHTML = `
                    <h2 style="font-family: var(--font-heading); color: var(--accent-yellow); margin-bottom: 0.5rem;">${data.title}</h2>
                    <p style="color: var(--accent-yellow); font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem;">${data.tech}</p>
                    <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">${data.desc}</p>
                    <div style="display: flex; gap: 1rem;">
                        <a href="https://github.com" target="_blank" class="btn btn-primary" style="padding: 0.5rem 1.2rem; font-size: 0.85rem;"><i class="fa-brands fa-github"></i> View Repository</a>
                    </div>
                `;
                modal.style.display = 'flex';
            }
        });
    });

    modalClose?.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 7. Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        formStatus.innerHTML = '<span style="color: #ffbe00;"><i class="fa-solid fa-spinner fa-spin"></i> Sending message...</span>';
        
        setTimeout(() => {
            formStatus.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.</span>';
            contactForm.reset();
        }, 1200);
    });
});
