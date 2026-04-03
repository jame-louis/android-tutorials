---
layout: default
title: "安卓教程"
---

<div class="hero-section" style="text-align: center; padding: 80px 20px; max-width: 800px; margin: 0 auto;">
  <div class="hero-content">
    <h1 class="hero-title">
      <span class="gradient-text">Android 开发教程</span>
    </h1>
    <p class="hero-subtitle">
      从零基础到高级应用开发，一步步学习 Android 编程
    </p>
    <div class="hero-meta">
      <span class="meta-item">📚 {{ site.tutorials | size }} 个教程</span>
      <span class="meta-item">💡 适合初学者</span>
      <span class="meta-item">🚀 实践导向</span>
    </div>
  </div>
  <div class="tutorials-list" style="margin-top: 60px;">
    <h2 style="margin-bottom: 30px; font-size: 24px;">全部教程</h2>
    <ul>
      {% assign sorted_tutorials = site.tutorials | sort: 'date' %}
      {% for tutorial in sorted_tutorials %}
        <li>
          <a href="{{ tutorial.url | relative_url }}">
            <div class="tutorial-link-content">
              <span class="tutorial-title">{{ tutorial.title }}</span>
              <span class="tutorial-meta-info">
                <span class="difficulty">{{ tutorial.difficulty }}</span>
                <span class="duration">{{ tutorial.duration }}</span>
                <span class="date">{{ tutorial.date | date: "%Y-%m-%d" }}</span>
              </span>
            </div>
          </a>
        </li>
      {% endfor %}
    </ul>
  </div>
</div>

<style>
.hero-section {
  position: relative;
}

.hero-content {
  margin-bottom: 60px;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 20px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #cbd5e1;
  margin-bottom: 30px;
  line-height: 1.6;
}

.hero-meta {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: #94a3b8;
}

.meta-item {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
}

.meta-item:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
  color: #fff;
}

.tutorials-list {
  margin-top: 60px;
}

.tutorials-list ul {
  list-style: none;
  padding: 0;
}

.tutorials-list li {
  margin-bottom: 15px;
}

.tutorial-link-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.tutorial-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #f8fafc;
  transition: color 0.3s;
}

.tutorial-meta-info {
  display: flex;
  gap: 12px;
  font-size: 0.85rem;
  color: #94a3b8;
  flex-wrap: wrap;
}

.tutorial-meta-info span {
  padding: 4px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.difficulty {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%) !important;
  color: white !important;
  font-weight: 600;
}

.duration {
  background: rgba(102, 126, 234, 0.1) !important;
  border-color: rgba(102, 126, 234, 0.2) !important;
  color: #a78bfa !important;
}

.date {
  background: rgba(79, 172, 254, 0.1) !important;
  border-color: rgba(79, 172, 254, 0.2) !important;
  color: #60a5fa !important;
}

.tutorials-list li a:hover {
  .tutorial-title {
    color: #667eea;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-meta {
    gap: 12px;
  }

  .meta-item {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}
</style>
