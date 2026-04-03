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
      从零基础开始，一步步学习 Android 编程<br>
      简洁易懂，适合新手
    </p>
    <div class="hero-meta">
      <span class="meta-item">📚 {{ site.tutorials | size }} 个教程</span>
      <span class="meta-item">💡 零基础友好</span>
      <span class="meta-item">🚀 清晰易懂</span>
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
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 20px;
  color: #1e293b;
}

.gradient-text {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #475569;
  margin-bottom: 30px;
  line-height: 1.7;
}

.hero-meta {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: #475569;
}

.meta-item {
  padding: 8px 16px;
  background: #f1f5f9;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}

.meta-item:hover {
  background: #e0e7ff;
  border-color: #2563eb;
  transform: translateY(-2px);
  color: #1e293b;
}

.tutorials-list {
  margin-top: 60px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

.tutorials-list ul {
  list-style: none;
  padding: 0;
}

.tutorials-list li {
  margin-bottom: 15px;
  list-style-type: none;
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
  color: #1e293b;
  transition: color 0.2s;
}

.tutorial-meta-info {
  display: flex;
  gap: 12px;
  font-size: 0.85rem;
  color: #475569;
  flex-wrap: wrap;
}

.tutorial-meta-info span {
  padding: 4px 12px;
  border-radius: 12px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
}

.difficulty {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
  color: white !important;
  font-weight: 600;
  border: none !important;
}

.duration {
  background: #e0e7ff !important;
  border-color: #2563eb !important;
  color: #2563eb !important;
}

.date {
  background: #f1f5f9 !important;
  border-color: #cbd5e1 !important;
  color: #475569 !important;
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
