---
layout: tutorial
title: "Setting up the Game"
tutorial_name: roll-a-ball
difficulty: Beginner
duration: 20 mins
rating: 5
rating_count: 5361
creator: Unity Technologies
xp_reward: 50
---

## Step 1: Overview
duration: 2 mins

Welcome to the Roll-a-Ball tutorial! In this comprehensive guide, you'll learn how to create your first Unity game from scratch.

## What you'll learn:
- Project setup and scene management
- Physics and player control
- Camera scripting and follow systems

## Prerequisites:
- Unity 2022.3 or later installed
- Basic understanding of C# (helpful but not required)

<div class="info-box">
  <strong>Tip:</strong> Take your time with each step. Understanding the fundamentals is crucial for your Unity journey.
</div>

---

## Step 2: Before you begin
duration: 2 mins

## Setting Up Your Development Environment

Before diving into Unity, let's ensure your development environment is properly configured.

### System Requirements
- **OS:** Windows 10+, macOS 10.15+, or Ubuntu 20.04+
- **RAM:** Minimum 8GB (16GB recommended)

&lt;div class="info-box warning"&gt;
  &lt;strong&gt;Important:&lt;/strong&gt; Make sure you have the latest version of Unity Hub installed before proceeding.
&lt;/div&gt;

---

## Step 3: Create a new Unity project
duration: 3 mins

## Starting Your First Project

Let's create a new Unity project for our Roll-a-Ball game.

### Step-by-Step Guide

1. Open Unity Hub
2. Click "New Project" or "Create"
3. Select "3D" template

&lt;div class="video-container"&gt;
  &lt;div class="video-placeholder"&gt;Video: Creating a New Unity Project&lt;/div&gt;
&lt;/div&gt;

&lt;div class="info-box tip"&gt;
  &lt;strong&gt;Pro Tip:&lt;/strong&gt; Use a dedicated folder for all your Unity projects to keep them organized.
&lt;/div&gt;

---

## Step 4: Create a new Scene
duration: 2 mins

## Understanding Scenes in Unity

Scenes are the fundamental building blocks of your game. Each scene can represent a level, menu, or different part of your game.

### Creating Your First Scene

1. In the Unity Editor, go to **File &gt; New Scene**
2. Select "Basic (Built-in)" as the template
3. Click "Create"

```csharp
using UnityEngine.SceneManagement;

// Load a scene by name
SceneManager.LoadScene("MainGame");
```