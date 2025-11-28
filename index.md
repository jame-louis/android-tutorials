---
layout: default
title: "安卓教程"
---

<div class="hero-section" style="text-align: center; padding: 100px 20px; max-width: 800px; margin: 0 auto;">
  <div class="tutorials-list" style="margin-top: 60px;">
    <h2 style="margin-bottom: 30px; font-size: 24px;">全部教程</h2>
    <ul>
      {% assign sorted_tutorials = site.tutorials | sort: 'date' %}
      {% for tutorial in sorted_tutorials %}
        <li>
          <a href="{{ tutorial.url | relative_url }}">{{ tutorial.title }}</a>
          <span style="color: #718096; font-size: 14px; margin-left: 8px;">{{ tutorial.date | date: "%Y-%m-%d" }}</span>
        </li>
      {% endfor %}
    </ul>
  </div>
</div>